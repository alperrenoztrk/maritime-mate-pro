-- Create enum for component types
CREATE TYPE public.component_type AS ENUM ('calculation', 'chart', 'topic', 'table', 'animation', 'form');

-- Create enum for categories
CREATE TYPE public.component_category AS ENUM ('navigation', 'stability', 'safety', 'cargo', 'engine', 'weather', 'general');

-- Create user_generated_components table
CREATE TABLE public.user_generated_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  component_type public.component_type NOT NULL,
  category public.component_category DEFAULT 'general',
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_generated_components ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own components"
ON public.user_generated_components
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view public components"
ON public.user_generated_components
FOR SELECT
USING (is_public = true);

CREATE POLICY "Users can create their own components"
ON public.user_generated_components
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own components"
ON public.user_generated_components
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own components"
ON public.user_generated_components
FOR DELETE
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_user_generated_components_user_id ON public.user_generated_components(user_id);
CREATE INDEX idx_user_generated_components_type ON public.user_generated_components(component_type);
CREATE INDEX idx_user_generated_components_category ON public.user_generated_components(category);
CREATE INDEX idx_user_generated_components_public ON public.user_generated_components(is_public) WHERE is_public = true;

-- Updated at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_generated_components_updated_at
BEFORE UPDATE ON public.user_generated_components
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();