import { supabase } from './client';

export async function saveProjectToDB(project: any) {
  const { data, error } = await supabase.from('mta_projects').insert([project]);
  return { data, error };
}

export async function getProjectsFromDB() {
  const { data, error } = await supabase.from('mta_projects').select('*').order('created_at', { ascending: false });
  return { data, error };
}
