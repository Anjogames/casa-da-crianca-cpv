import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://imvefexbviihzfioamdc.supabase.co'
const supabaseKey = 'sb_publishable_cVJel72Ca9N-YQRW28HZeA_3X5_talz'

export const supabase = createClient(supabaseUrl, supabaseKey)