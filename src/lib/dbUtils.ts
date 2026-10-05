import { ref, runTransaction } from 'firebase/database';
import { db } from './firebase';

export const SERVICE_PREFIXES: Record<string, string> = {
  ambulance: 'amb',
  police: 'police',
  hospital: 'hosp',
  fire_service: 'fire',
  palli_bidyut: 'bidyut',
  bus_ticket: 'bus',
  train_ticket: 'train',
  courier: 'courier',
  education: 'edu',
  jobs: 'job',
  helpline: 'helpline',
  lost_and_found: 'lost',
  house_rent: 'rent',
  payment: 'pay'
};

export type CounterType =
  | 'user'
  | 'donor'
  | 'volunteer'
  | 'complaint'
  | 'feedback'
  | 'notice'
  | 'news'
  | 'banner'
  | 'foundation'
  | 'service'
  | 'contact'
  | 'record'
  | 'ambulance'
  | 'police'
  | 'hospital'
  | 'fire_service'
  | 'palli_bidyut'
  | 'bus_ticket'
  | 'train_ticket'
  | 'courier'
  | 'education'
  | 'jobs'
  | 'helpline'
  | 'lost_and_found'
  | 'house_rent'
  | 'payment'
  | (string & {});

export async function generateSequentialId(type: CounterType, prefix?: string): Promise<string> {
  const p = prefix || SERVICE_PREFIXES[type] || type;
  const counterRef = ref(db, `counters/${type}`);
  let newId = '';
  const res = await runTransaction(counterRef, (current) => {
    const next = (current || 0) + 1;
    newId = `${p}_${next}`;
    return next;
  });
  if (!newId || !res.committed) {
    const fallbackNum = res.snapshot?.val() || Date.now();
    newId = `${p}_${fallbackNum}`;
  }
  return newId;
}

export function cleanData<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: any = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val !== undefined && val !== null && (typeof val === 'boolean' || val !== '')) {
      if (typeof val === 'object' && !Array.isArray(val)) {
        const nested = cleanData(val);
        if (Object.keys(nested).length > 0) {
          cleaned[key] = nested;
        }
      } else {
        cleaned[key] = val;
      }
    }
  }
  return cleaned;
}

