import { supabase } from './supabase'

export async function getProfileById(userId) {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
}