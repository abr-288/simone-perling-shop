DROP POLICY IF EXISTS "Public can delete bags" ON public.bags;
DROP POLICY IF EXISTS "Public can insert bags" ON public.bags;
DROP POLICY IF EXISTS "Public can update bags" ON public.bags;
REVOKE INSERT, UPDATE, DELETE ON public.bags FROM anon, authenticated;
GRANT SELECT ON public.bags TO anon, authenticated;
GRANT ALL ON public.bags TO service_role;