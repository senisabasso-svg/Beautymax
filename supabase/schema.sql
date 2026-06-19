-- Beautymax catalog schema
-- Run this in Supabase SQL Editor (Dashboard > SQL)

-- Sections (Productos, Herramientas, Colecciones, Organic Pro, etc.)
create table if not exists public.sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  nav_label text,
  section_type text not null default 'product_grid'
    check (section_type in ('product_grid', 'collection_cards', 'brand_featured')),
  style_variant text not null default 'default'
    check (style_variant in ('default', 'surface', 'organic')),
  kicker text,
  hero_text text,
  hero_logo text,
  sort_order int not null default 0,
  show_in_nav boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Products / items inside each section
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.sections(id) on delete cascade,
  name text not null,
  image_url text,
  description text,
  show_description boolean not null default false,
  sort_order int not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_section_id_idx on public.products(section_id);
create index if not exists sections_sort_order_idx on public.sections(sort_order);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists sections_updated_at on public.sections;
create trigger sections_updated_at
  before update on public.sections
  for each row execute function public.set_updated_at();

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.sections enable row level security;
alter table public.products enable row level security;

-- Public read (storefront)
drop policy if exists "sections_public_read" on public.sections;
create policy "sections_public_read" on public.sections
  for select using (true);

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (true);

-- Authenticated admin write
drop policy if exists "sections_admin_insert" on public.sections;
create policy "sections_admin_insert" on public.sections
  for insert to authenticated with check (true);

drop policy if exists "sections_admin_update" on public.sections;
create policy "sections_admin_update" on public.sections
  for update to authenticated using (true) with check (true);

drop policy if exists "sections_admin_delete" on public.sections;
create policy "sections_admin_delete" on public.sections
  for delete to authenticated using (true);

drop policy if exists "products_admin_insert" on public.products;
create policy "products_admin_insert" on public.products
  for insert to authenticated with check (true);

drop policy if exists "products_admin_update" on public.products;
create policy "products_admin_update" on public.products
  for update to authenticated using (true) with check (true);

drop policy if exists "products_admin_delete" on public.products;
create policy "products_admin_delete" on public.products
  for delete to authenticated using (true);

-- Storage bucket for product images (run after creating bucket in Storage UI or via API)
-- Bucket name: catalog-images (public read)

drop policy if exists "catalog_images_public_read" on storage.objects;
create policy "catalog_images_public_read" on storage.objects
  for select using (bucket_id = 'catalog-images');

drop policy if exists "catalog_images_admin_upload" on storage.objects;
create policy "catalog_images_admin_upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'catalog-images');

drop policy if exists "catalog_images_admin_update" on storage.objects;
create policy "catalog_images_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'catalog-images');

drop policy if exists "catalog_images_admin_delete" on storage.objects;
create policy "catalog_images_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'catalog-images');
