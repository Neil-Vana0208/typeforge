-- TYPEFORGE ONLINE BACKEND
-- Run this in Supabase SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'PLAYER',
  avatar_url text,
  design text not null default 'forge',
  font text not null default 'system',
  rpg_best_score integer not null default 0,
  rpg_highest_wave integer not null default 1,
  rpg_level integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can create/read/update only their own private profile row.
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated
  with check (auth.uid() = id);

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Public leaderboard exposes only deliberately public fields.
create or replace view public.leaderboard_public as
select
  display_name,
  avatar_url,
  design,
  font,
  rpg_best_score,
  rpg_highest_wave
from public.profiles
order by rpg_best_score desc, rpg_highest_wave desc, display_name asc;

grant select on public.leaderboard_public to anon, authenticated;

-- Storage bucket for profile pictures.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- A user may upload/update/delete only files inside their own UUID folder.
drop policy if exists "avatar_upload_own" on storage.objects;
create policy "avatar_upload_own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatar_update_own" on storage.objects;
create policy "avatar_update_own" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatar_delete_own" on storage.objects;
create policy "avatar_delete_own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Public profile images can be viewed by the browser.
drop policy if exists "avatar_public_read" on storage.objects;
create policy "avatar_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'avatars');


-- Required table privileges for anonymous-authenticated Typeforge players.
grant select, insert, update on public.profiles to authenticated;
