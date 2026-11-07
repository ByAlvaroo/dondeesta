-- =====================================================================
--  ¿DÓNDE ESTÁ?  ·  Base de datos para Supabase
--  Pega TODO este archivo en Supabase → SQL Editor → New query → Run.
--  Se puede ejecutar varias veces sin romper nada.
--  HECHO POR @BYALVARO__
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- Perfiles de usuario ----------
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  username    text unique not null,
  role        text not null default 'pendiente' check (role in ('admin','usuario','pendiente')),
  created_at  timestamptz not null default now()
);

-- ---------- Estanterías ----------
create table if not exists public.shelves (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  color       text not null default '#8b5cf6',
  x           real not null default 40,
  y           real not null default 40,
  w           real not null default 180,
  h           real not null default 50,
  position    int  not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------- Cajas ----------
create table if not exists public.boxes (
  id          uuid primary key default gen_random_uuid(),
  shelf_id    uuid references public.shelves on delete set null,
  label       text not null,
  code        text unique not null,
  color       text,
  notes       text,
  position    int not null default 0,
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

-- ---------- Objetos ----------
create table if not exists public.items (
  id           uuid primary key default gen_random_uuid(),
  box_id       uuid references public.boxes on delete cascade,
  name         text not null,
  qty          int  not null default 1,
  description  text,
  photo_url    text,
  updated_at   timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

-- ---------- Notas / lista para sacar ----------
create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  text        text not null,
  item_id     uuid references public.items on delete set null,
  done        boolean not null default false,
  created_by  text,
  created_at  timestamptz not null default now()
);

-- ---------- Configuración común (IA y plano) — una sola fila ----------
create table if not exists public.settings (
  id           int primary key default 1 check (id = 1),
  ai_provider  text not null default 'gemini',
  ai_model     text,
  ai_key       text,
  ai_base_url  text,
  map_w        real not null default 800,
  map_h        real not null default 500,
  map_name     text default 'Mi bajo'
);
insert into public.settings (id) values (1) on conflict (id) do nothing;

create index if not exists boxes_shelf_idx on public.boxes(shelf_id);
create index if not exists items_box_idx   on public.items(box_id);

-- ---------- Funciones de permisos ----------
create or replace function public.is_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','usuario'));
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Al registrarse: el PRIMER usuario es admin; los demás quedan "pendientes" hasta que el admin los apruebe.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare primero boolean;
begin
  select not exists (select 1 from public.profiles) into primero;
  insert into public.profiles (id, username, role)
  values (new.id,
          coalesce(new.raw_user_meta_data->>'username', split_part(new.email,'@',1)),
          case when primero then 'admin' else 'pendiente' end);
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Evita que alguien se cambie el rol a sí mismo (solo el admin cambia roles)
create or replace function public.protect_role() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Solo un administrador puede cambiar roles';
  end if;
  return new;
end; $$;
drop trigger if exists protect_role_trg on public.profiles;
create trigger protect_role_trg before update on public.profiles
  for each row execute function public.protect_role();

-- ---------- Seguridad (RLS): solo usuarios aprobados ven y tocan datos ----------
alter table public.profiles enable row level security;
alter table public.shelves  enable row level security;
alter table public.boxes    enable row level security;
alter table public.items    enable row level security;
alter table public.notes    enable row level security;
alter table public.settings enable row level security;

drop policy if exists p_profiles_sel on public.profiles;
create policy p_profiles_sel on public.profiles for select using (id = auth.uid() or public.is_member());
drop policy if exists p_profiles_upd on public.profiles;
create policy p_profiles_upd on public.profiles for update using (public.is_admin());
drop policy if exists p_profiles_del on public.profiles;
create policy p_profiles_del on public.profiles for delete using (public.is_admin() and id <> auth.uid());

do $$
declare t text;
begin
  foreach t in array array['shelves','boxes','items','notes'] loop
    execute format('drop policy if exists p_%1$s_all on public.%1$s', t);
    execute format('create policy p_%1$s_all on public.%1$s for all using (public.is_member()) with check (public.is_member())', t);
  end loop;
end $$;

drop policy if exists p_settings_sel on public.settings;
create policy p_settings_sel on public.settings for select using (public.is_member());
drop policy if exists p_settings_upd on public.settings;
create policy p_settings_upd on public.settings for update using (public.is_admin());

-- ---------- Fotos (Storage) ----------
insert into storage.buckets (id, name, public) values ('fotos','fotos', true)
  on conflict (id) do nothing;

drop policy if exists p_fotos_ins on storage.objects;
create policy p_fotos_ins on storage.objects for insert with check (bucket_id = 'fotos' and public.is_member());
drop policy if exists p_fotos_upd on storage.objects;
create policy p_fotos_upd on storage.objects for update using (bucket_id = 'fotos' and public.is_member());
drop policy if exists p_fotos_del on storage.objects;
create policy p_fotos_del on storage.objects for delete using (bucket_id = 'fotos' and public.is_member());

-- ---------- Tiempo real: los cambios aparecen al momento en todos los dispositivos ----------
do $$
declare t text;
begin
  foreach t in array array['shelves','boxes','items','notes'] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;
