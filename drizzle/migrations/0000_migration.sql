CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  collection_address jsonb NOT NULL,
  delivery_address jsonb NOT NULL,
  distance_miles numeric,
  distance_zone text,
  distance_source text,
  delivery_type text NOT NULL,
  vehicle_category text NOT NULL,
  vehicle_type text NOT NULL,
  cargo_type text NOT NULL,
  collection_date date NOT NULL,
  collection_time text NOT NULL,
  special_requirements text,
  attachments jsonb NOT NULL DEFAULT '[]'::jsonb,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  terms_accepted boolean NOT NULL DEFAULT false,
  ip_hash text
);
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  source text,
  ip_hash text
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX ON public.quote_requests (ip_hash, created_at);
CREATE INDEX ON public.contact_submissions (ip_hash, created_at);