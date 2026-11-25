create table if not exists public.wishes (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 1 and 60),
  message text not null check (char_length(btrim(message)) between 1 and 300),
  visible boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists wishes_created_idx on public.wishes (created_at desc);
alter table public.wishes enable row level security;
create policy "anyone can read visible wishes" on public.wishes for select to anon using (visible = true);
create policy "anyone can send a wish" on public.wishes for insert to anon
  with check (visible = true and char_length(btrim(name)) between 1 and 60 and char_length(btrim(message)) between 1 and 300);
revoke all on public.wishes from anon;
grant select, insert on public.wishes to anon;
-- Moderation: in Table Editor set visible = false to hide a wish.
