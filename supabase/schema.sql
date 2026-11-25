-- Clean, idempotent schema for Zain Weds Hanna Guestbook
-- Safe to run in an existing Supabase project or a brand-new project.

create table if not exists public.zain_hanna_wishes (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 1 and 60),
  message text not null check (char_length(btrim(message)) between 1 and 300),
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists zain_hanna_wishes_created_idx
  on public.zain_hanna_wishes (created_at desc);

alter table public.zain_hanna_wishes enable row level security;

drop policy if exists "anyone can read visible zain_hanna_wishes" on public.zain_hanna_wishes;
create policy "anyone can read visible zain_hanna_wishes"
  on public.zain_hanna_wishes
  for select
  to anon
  using (visible = true);

drop policy if exists "anyone can send a wish to zain_hanna_wishes" on public.zain_hanna_wishes;
create policy "anyone can send a wish to zain_hanna_wishes"
  on public.zain_hanna_wishes
  for insert
  to anon
  with check (
    visible = true
    and char_length(btrim(name)) between 1 and 60
    and char_length(btrim(message)) between 1 and 300
  );

revoke all on public.zain_hanna_wishes from anon;
grant select, insert on public.zain_hanna_wishes to anon;

-- Moderation: in Supabase Table Editor set visible = false to hide a wish.
