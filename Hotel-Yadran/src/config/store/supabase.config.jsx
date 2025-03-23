import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wwkzczbxaterpvsfnxwz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3a3pjemJ4YXRlcnB2c2ZueHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MTQzNTUsImV4cCI6MjA1ODE5MDM1NX0.SGViCmdtedm5ZW8nqE-1OswOyD3HTmhS2yzSKyPJuNY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)