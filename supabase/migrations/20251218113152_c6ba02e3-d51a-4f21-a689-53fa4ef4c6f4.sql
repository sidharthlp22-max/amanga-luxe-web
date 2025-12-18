-- 1. Add INSERT policy for profiles table
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 2. Update has_role function to validate user_id matches auth.uid()
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Ensure only checking current user's role to prevent information disclosure
  IF _user_id IS DISTINCT FROM auth.uid() THEN
    RETURN false;
  END IF;
  
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$;

-- 3. Add validation constraints for products table
ALTER TABLE products ADD CONSTRAINT valid_price CHECK (price >= 0);
ALTER TABLE products ADD CONSTRAINT valid_category CHECK (category IN ('Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Sets'));
ALTER TABLE products ADD CONSTRAINT name_length CHECK (length(name) <= 200);
ALTER TABLE products ADD CONSTRAINT description_length CHECK (length(description) <= 5000);