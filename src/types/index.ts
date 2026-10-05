export interface User {
  id: string;
  uid: string;
  name: string;
  contact: string;
  email: string;
  bloodGroup?: string;
  address?: string;
  location?: string;
  lastDonation?: string;
  hideContact?: boolean;
  hidePhoto?: boolean;
  donationCount?: number;
  photoUrl?: string;
  facebookLink?: string;
  isAvailable?: boolean;
  isDonor?: boolean;
  role?: string;
  joinedAt: string;
  updatedAt: number;
  googleLinked?: boolean;
  passkeys?: Record<string, any>;
  deleted?: boolean;
  searchKey?: string;
  manualUnavailable?: boolean;
  isVerified?: boolean;
  lastCardGeneratedAt?: string;
  lastDonationPhotoUrl?: string;
}

export type Donor = User;

export interface Volunteer {
  id: string;
  name: string;
  phone: string;
  contact?: string;
  department: string;
  batch: string;
  photoUrl?: string;
  hidePhoto?: boolean;
  facebookLink?: string;
  isAvailable: boolean;
  isVerified?: boolean;
  bloodManagedCount?: number;
  address?: string;
  location?: string;
  role?: string;
  updatedAt: number;
  joinedAt?: string;
}

export interface BloodFoundation {
  id: string;
  name: string;
  image?: string;
  phone: string;
  facebookUrl?: string;
  address?: string;
  updatedAt: number;
  createdAt?: string | number;
}

export interface AuthUser {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerData?: any[];
  isPasskeyOnly?: boolean;
  getIdTokenResult?: () => Promise<{ claims: { admin?: boolean } }>;
}

export interface DirectoryItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  phone?: string;
  secondaryPhone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  location?: string;
  mapsUrl?: string;
  websiteUrl?: string;
  linkUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
  description?: string;
  badge?: string;
  updatedAt?: number;
}

export interface MunAlertItem {
  id: string;
  title: string;
  text: string;
  category?: string;
  level?: 'emergency' | 'warning' | 'info';
  date?: string | number;
  timestamp?: number;
  imageUrl?: string;
  pdfUrl?: string;
  linkUrl?: string;
}

export interface MunLiveCase {
  id: string;
  type: 'missing' | 'found';
  name: string;
  age: number | string;
  gender: string;
  lastSeen: string;
  date: string;
  status: string;
  district: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  contactPhone?: string;
  contactName?: string;
  reportedBy?: string;
  reportedAt?: string;
  updatedAt?: string;
  additionalDetails?: string;
  approved?: boolean;
}

export interface NewsItem {
  id?: string;
  title: string;
  link: string;
  description: string;
  details?: string;
  pubDate: string;
  thumbnail?: string;
  enclosure?: { link?: string; type?: string };
  image?: string;
  source?: string;
  author?: string;
  guid?: string;
  isAdmin?: boolean;
}

export interface AdminNewsItem {
  id: string;
  title: string;
  details: string;
  image?: string;
  createdAt: string;
  source?: string;
  pinned?: boolean;
}

export interface LostAndFoundItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface LostAndFoundReport {
  id: string;
  type: 'lost' | 'found';
  reporterName: string;
  reporterPhone: string;
  reporterAddress?: string;
  isRegisteredUser?: boolean;
  userId?: string;
  location?: string;
  date?: string;
  items: LostAndFoundItem[];
  status: 'pending' | 'approved';
  isUrgent?: boolean;
  paymentStatus?: 'unpaid' | 'pending_verification' | 'verified';
  paymentId?: string;
  planId?: string;
  paidAmount?: string;
  trxId?: string;
  paymentMethod?: string;
  approvedAt?: number;
  expiresAt?: number;
  imageUrl?: string;
  images?: string[];
  createdAt: number;
  updatedAt?: number;
  editRequested?: boolean;
  editRequestedAt?: number;
  deleteRequested?: boolean;
  deleteRequestedAt?: number;
  deleteReason?: string;
}

export type HouseRentType = 'family' | 'bachelor' | 'commercial';

export interface HouseRentItem {
  id: string;
  title: string;
  rentType: HouseRentType;
  rentAmount: string;
  bedrooms?: string;
  bathrooms?: string;
  availableFrom?: string;
  location: string;
  mapsUrl?: string;
  description?: string;
  contactName: string;
  contactPhone: string;
  whatsappPhone?: string;
  imageUrl?: string;
  images?: string[];
  status: 'pending' | 'approved';
  paymentStatus?: 'unpaid' | 'pending_verification' | 'verified';
  paymentId?: string;
  planId?: string;
  paidAmount?: string;
  trxId?: string;
  paymentMethod?: string;
  userId?: string;
  isRegisteredUser?: boolean;
  approvedAt?: number;
  expiresAt?: number;
  renewalCount?: number;
  lastRenewedAt?: number;
  isExpired?: boolean;
  createdAt: number;
  updatedAt?: number;
  editRequested?: boolean;
  editRequestedAt?: number;
  deleteRequested?: boolean;
  deleteRequestedAt?: number;
  deleteReason?: string;
}

export type PaymentMethodId =
  | 'bkash'
  | 'nagad'
  | 'rocket'
  | 'upay'
  | 'cellfin'
  | 'mcash'
  | 'nexus_pay'
  | 'dbbl'
  | 'ibbl'
  | 'agrani'
  | 'bangla_qr';

export type BankId = 'dbbl' | 'ibbl' | 'agrani';

export interface BankAccountConfig {
  id: BankId;
  name: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  routingNumber: string;
  instruction?: string;
  isActive: boolean;
}

export interface PaymentPlan {
  id: string;
  durationMonths: number;
  price: number;
  originalPrice?: number;
  label: string;
  durationLabel: string;
  badge?: string;
  popular?: boolean;
  isActive?: boolean;
}

export interface PaymentMethodConfig {
  id: PaymentMethodId;
  name: string;
  number: string;
  type: 'Personal' | 'Merchant' | 'Agent' | 'Wallet';
  instruction: string;
  color: string;
  bgLight: string;
  isActive: boolean;
}

export interface PaymentRecord {
  id: string;
  service: string;
  refId: string;
  serviceTitle?: string;
  planId?: string;
  planLabel?: string;
  durationMonths?: number;
  amount: number;
  method: string;
  senderNumber?: string;
  trxId: string;
  status: 'pending' | 'verified' | 'rejected';
  userId?: string;
  userPhone?: string;
  fcmToken?: string;
  targetPath?: string;
  createdAt: number;
  verifiedAt?: number;
  rejectedAt?: number;
  rejectionReason?: string;
}

export interface VisitorDevice {
  os: string;
  browser: string;
  isPWA: boolean;
  screen: string;
}

export interface VisitorRecord {
  id: string;
  firstVisit: number;
  lastActive: number;
  visitCount: number;
  totalDuration: number;
  lastDuration: number;
  device: VisitorDevice;
  lastPath: string;
  updatedAt: number;
}

export interface VisitorSummary {
  totalVisitors: number;
  totalVisits: number;
  totalDurationSeconds: number;
  lastUpdated: number;
}

export interface DailyAnalyticsRecord {
  date: string;
  totalVisitors: number;
  totalVisits: number;
  returningVisitors: number;
  newVisitors: number;
  totalDuration: number;
  devices?: Record<string, number>;
  browsers?: Record<string, number>;
  pwaVisits?: number;
  lastSyncedAt: number;
}

