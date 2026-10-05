import Dexie, { type Table } from 'dexie';
import type { User, Donor, Volunteer, BloodFoundation } from '../types';

interface AppCache {
  key: string;
  data: any;
  updatedAt: number;
}

interface ImageCache {
  url: string;
  blob: Blob;
  updatedAt: number;
}

export interface SyncQueueItem {
  id: string;
  type: string;
  payload: any;
  createdAt: number;
  retries: number;
  status: 'pending' | 'processing' | 'failed';
  lastError?: string;
}

class HelloKhetlalDB extends Dexie {
  users!: Table<User, string>;
  donors!: Table<Donor, string>;
  volunteers!: Table<Volunteer, string>;
  foundations!: Table<BloodFoundation, string>;
  syncQueue!: Table<SyncQueueItem, string>;
  appCache!: Table<AppCache, string>;
  imageCache!: Table<ImageCache, string>;

  constructor() {
    super('HelloKhetlalDB');

    this.version(1).stores({
      donors: 'id',
      volunteers: 'id',
      syncQueue: 'id',
      appCache: 'key',
      imageCache: 'url'
    });

    this.version(2).stores({
      donors: 'id, bloodGroup, contact, isAvailable, manualUnavailable, district, name, searchKey, lastDonation, hideContact',
      volunteers: 'id, contact, district, upazila, isAvailable'
    }).upgrade(tx => {
      return tx.table('donors').toCollection().modify((donor: Donor & { searchKey?: string }) => {
        donor.searchKey = donor.name ? donor.name.trim().toLowerCase().replace(/\s+/g, '.') : '';
      });
    });

    this.version(3).stores({
      donors: 'id, bloodGroup, contact, isAvailable, manualUnavailable, district, name, searchKey, lastDonation, hideContact, updatedAt',
      volunteers: 'id, contact, district, upazila, isAvailable, updatedAt'
    });

    this.version(4).stores({
      syncQueue: 'id, type, status, createdAt'
    });

    this.version(5).stores({
      foundations: 'id, name, phone, address, updatedAt'
    });

    this.version(6).stores({
      users: 'id, bloodGroup, contact, isAvailable, manualUnavailable, district, name, searchKey, lastDonation, hideContact, updatedAt'
    });

    this.version(7).stores({
      imageCache: 'url, updatedAt'
    });

    this.version(8).stores({
      users: 'id, uid, bloodGroup, contact, isAvailable, manualUnavailable, district, name, searchKey, lastDonation, hideContact, updatedAt'
    });
  }
}

export const localDB = new HelloKhetlalDB();

localDB.open().catch(async (err) => {
  if (err?.name === 'UpgradeError' || err?.name === 'VersionError' || err?.name === 'AbortError') {
    try {
      await Dexie.delete('HelloKhetlalDB');
      await localDB.open();
    } catch {}
  }
});
