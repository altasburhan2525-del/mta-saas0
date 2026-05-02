export type SavedProject = {
  id: string;
  offerNo: string;
  customer: string;
  project: string;
  area: number;
  unitPrice: number;
  laborPrice: number;
  shipping: number;
  vatRate: number;
  total: number;
  createdAt: string;
};

const STORAGE_KEY = 'mta_saved_projects_v1';

export function createOfferNo() {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `MTA-${stamp}-${rand}`;
}

export function readProjects(): SavedProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProject(project: SavedProject) {
  if (typeof window === 'undefined') return [];
  const list = readProjects();
  const next = [project, ...list].slice(0, 25);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
