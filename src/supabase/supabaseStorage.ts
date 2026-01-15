import { createClient } from '@supabase/supabase-js'
const { SUPABASE_PROJECT_URL, SUPABASE_SERVICE_ROLE } = process.env

export const supabaseStorage = createClient(
  SUPABASE_PROJECT_URL!,
  SUPABASE_SERVICE_ROLE!
)
