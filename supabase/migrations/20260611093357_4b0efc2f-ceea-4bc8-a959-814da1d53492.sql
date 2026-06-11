CREATE TABLE public.bags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  comment TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.bags TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bags TO authenticated;
GRANT ALL ON public.bags TO service_role;

ALTER TABLE public.bags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read bags" ON public.bags FOR SELECT USING (true);
CREATE POLICY "Public can insert bags" ON public.bags FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update bags" ON public.bags FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public can delete bags" ON public.bags FOR DELETE USING (true);