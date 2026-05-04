import { json } from '@/lib/api';
import { demoDealers } from '@/lib/mockDb';
export async function GET(){ return json(demoDealers); }
