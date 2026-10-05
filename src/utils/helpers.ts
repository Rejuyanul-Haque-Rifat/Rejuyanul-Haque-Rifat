import type { Donor } from '../types';

export function toBn(str: string | number | null | undefined): string {
  if (str === null || str === undefined) return '';
  const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return str.toString().replace(/[0-9]/g, w => bn[parseInt(w, 10)]);
}

export function generateDonorCopyText(donor: Donor, isAdmin: boolean = false, originUrl: string = window.location.origin): string {
  const lastDonationText = donor.lastDonation && donor.lastDonation !== 'first_timer' 
    ? formatBengaliDate(donor.lastDonation) 
    : (donor.lastDonation === 'first_timer' ? 'প্রথমবার' : 'এখনো দেননি');
    
  const contactText = donor.hideContact && !isAdmin ? 'হাইড করা' : (donor.contact || 'নেই');
  const slug = (donor.name || '').trim().toLowerCase().replace(/\s+/g, '.');
  const profileLink = `${originUrl}/donor/${slug}`;
  
  return `${donor.name} (${donor.bloodGroup} রক্তদাতা)\nফোন: ${contactText}\nশেষ রক্তদান: ${lastDonationText}\nমোট রক্তদান: ${toBn(donor.donationCount || 0)} বার\nঠিকানা: ${donor.address || 'ক্ষেতলাল'}\nরক্তদাতার প্রোফাইল লিংক: ${profileLink}`;
}

export function formatBnCompact(num: number | string): string {
  const n = typeof num === 'number' ? num : parseFloat(String(num).replace(/[^0-9.]/g, '')) || 0;
  if (n < 1000) {
    return toBn(Math.round(n));
  } else if (n < 100000) {
    const k = n / 1000;
    const formatted = (k % 1 === 0) ? k.toString() : k.toFixed(1).replace(/\.0$/, '');
    return toBn(formatted) + ' হাজার';
  } else if (n < 10000000) {
    const l = n / 100000;
    const formatted = (l % 1 === 0) ? l.toString() : l.toFixed(1).replace(/\.0$/, '');
    return toBn(formatted) + ' লাখ';
  } else {
    const cr = n / 10000000;
    const formatted = (cr % 1 === 0) ? cr.toString() : cr.toFixed(1).replace(/\.0$/, '');
    return toBn(formatted) + ' কোটি';
  }
}

export function formatBengaliDate(d: string | Date | undefined, lang: string = 'bn'): string {
  if (!d) return '';
  if (d === 'first_timer') return lang === 'bn' ? 'প্রথমবার রক্তদাতা' : 'First-time Donor';
  if (lang === 'en') {
    return new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  return new Date(d).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatBengaliDateTime(d: string | number | Date | null | undefined): string {
  if (!d) return '';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '';
  const weekdays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const bnMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const weekday = weekdays[date.getDay()];
  const day = toBn(date.getDate());
  const month = bnMonths[date.getMonth()];
  const year = toBn(date.getFullYear());
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; 
  
  const bnHours = toBn(hours.toString());
  const bnMinutes = toBn(minutes.toString().padStart(2, '0'));
  
  return `${weekday}, ${day} ${month} ${year}, সময়: ${bnHours}:${bnMinutes} ${ampm}`;
}

export function formatMunDateTime(dateStr?: string, reportedAt?: string): string {
  if (dateStr && dateStr.includes('এ') && /[\u0980-\u09FF]/.test(dateStr)) {
    return dateStr;
  }
  const raw = dateStr || reportedAt;
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return dateStr || '';

  const bnMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const day = toBn(d.getDate());
  const month = bnMonths[d.getMonth()];
  const year = toBn(d.getFullYear());

  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = toBn(hours.toString().padStart(2, '0'));
  const minutesStr = toBn(d.getMinutes().toString().padStart(2, '0'));

  return `${day} ${month}, ${year} এ ${hoursStr}:${minutesStr} ${ampm}`;
}

export function calculateEligibility(lastDonation?: string): boolean {
  if (!lastDonation || lastDonation === 'first_timer') return true;
  
  const lastDate = new Date(lastDonation);
  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
  
  return lastDate <= fourMonthsAgo;
}

export function handleInvalidInput(
  elementId: string, 
  message?: string, 
  showCustomAlert?: (msg: string, type: string) => void
): void {
  if (showCustomAlert && message) showCustomAlert(message, 'error');
  const el = document.getElementById(elementId);
  if (el) {
    if (!elementId.toLowerCase().includes('pincontainer')) {
      el.classList.add('error-shake', 'input-error');
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    const removeError = () => {
      el.classList.remove('error-shake', 'input-error');
      el.removeEventListener('input', removeError);
      el.removeEventListener('change', removeError);
    };
    el.addEventListener('input', removeError);
    el.addEventListener('change', removeError);
    
    setTimeout(() => {
      el.classList.remove('error-shake');
    }, 500);
  }
}

export function sortDonors(donors: Donor[]): Donor[] {
  return [...donors].sort((a, b) => {
    const bgOrder = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const groupA = a.bloodGroup ? bgOrder.indexOf(a.bloodGroup) : -1;
    const groupB = b.bloodGroup ? bgOrder.indexOf(b.bloodGroup) : -1;
    if (groupA !== groupB) return groupA - groupB;
    
    const getTier = (d: any) => {
      const timeEligible = d.isTimeEligible !== undefined ? d.isTimeEligible : calculateEligibility(d.lastDonation);
      if (timeEligible === false) return 3;
      if (d.manualUnavailable || d.isAvailable === false) return 2;
      return 1;
    };
    
    const tierA = getTier(a);
    const tierB = getTier(b);
    if (tierA !== tierB) return tierA - tierB;
    
    const verifiedA = (a as any).isVerified ? 1 : 0;
    const verifiedB = (b as any).isVerified ? 1 : 0;
    if (verifiedA !== verifiedB) return verifiedB - verifiedA;
    
    const getTime = (d: Donor) => {
      if (d.lastDonation === 'first_timer') return 0;
      if (!d.lastDonation) return 0;
      return new Date(d.lastDonation).getTime();
    };
    
    return getTime(a) - getTime(b);
  });
}


export const DONOR_TITLES: Record<number, string> = {
  1: 'জীবন রক্ষক', 2: 'উদার মন', 3: 'রক্তযোদ্ধা', 4: 'সাহসী দাতা', 5: 'সুবর্ণ হৃদয়',
  6: 'আশা জাগানিয়া', 7: 'মানবিক যোদ্ধা', 8: 'প্রাণদাতা', 9: 'নিঃস্বার্থ দাতা', 10: 'মানবতার দূত',
  11: 'নীরব বীর', 12: 'জীবন রক্ষাকারী', 13: 'কল্যাণকামী', 14: 'রক্তদাতা রত্ন', 15: 'জীবনবন্ধু',
  16: 'মহামানব', 17: 'আস্থার প্রতীক', 18: 'আশার আলো', 19: 'সঞ্জীবনী', 20: 'রক্তবীর',
  21: 'নিবেদিত প্রাণ', 22: 'মানবতার সেবক', 23: 'মহৎ হৃদয়', 24: 'পরোপকারী', 25: 'মানবতার নক্ষত্র',
  26: 'অকুতোভয় দাতা', 27: 'কল্যাণ দূত', 28: 'জীবন ত্রাতা', 29: 'প্রেরণার উৎস', 30: 'প্লাটিনাম হৃদয়',
  31: 'অমূল্য দাতা', 32: 'মানবিক রত্ন', 33: 'পরম বন্ধু', 34: 'মহান দাতা', 35: 'জীবনপ্রহরী',
  36: 'আশার প্রদীপ', 37: 'আশীর্বাদ', 38: 'নিঃস্বার্থ বীর', 39: 'রক্ত সৈনিক', 40: 'রক্ত কিংবদন্তি'
};

export function getDonorTitle(count?: number | string): string {
  const num = parseInt(String(count || 0), 10) || 0;
  if (num === 0) return 'নতুন দাতা';
  if (num >= 40) return 'রক্ত কিংবদন্তি';
  return DONOR_TITLES[num] || 'রক্তদাতা';
}

export function toEn(str: string | number | null | undefined): string {
  if (str === null || str === undefined) return '';
  const bnToEnMap: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };
  return String(str).replace(/[০-৯]/g, (d) => bnToEnMap[d] || d);
}

export function formatAutoPhone(phone: string | number | null | undefined, lang: string = 'bn'): string {
  if (phone === null || phone === undefined || phone === '') return '';
  return lang === 'bn' ? toBn(phone) : toEn(phone);
}

export function cleanPhone(phone?: string | number | null): string {
  if (!phone) return '';
  const str = String(phone).trim();
  if (!str) return '';
  const normalized = toEn(str);
  const hasLeadingPlus = normalized.startsWith('+');
  const digitsOnly = normalized.replace(/[^0-9]/g, '');
  if (!digitsOnly) return '';
  return hasLeadingPlus ? `+${digitsOnly}` : digitsOnly;
}

export function cleanWhatsAppNumber(phone?: string | number | null): string {
  const cleaned = cleanPhone(phone);
  if (!cleaned) return '';
  const digits = cleaned.replace(/[^0-9]/g, '');
  if (!digits) return '';
  if (digits.startsWith('880')) return digits;
  if (digits.startsWith('01') && digits.length === 11) return `88${digits}`;
  return digits;
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDurationBn(seconds: number | undefined | null): string {
  const s = Math.max(0, Math.floor(seconds || 0));
  if (s < 60) {
    return `${toBn(s)} সে.`;
  }
  if (s < 3600) {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return secs > 0 ? `${toBn(mins)} মি. ${toBn(secs)} সে.` : `${toBn(mins)} মি.`;
  }
  const hours = Math.floor(s / 3600);
  const remainingMins = Math.floor((s % 3600) / 60);
  return remainingMins > 0 ? `${toBn(hours)} ঘণ্টা ${toBn(remainingMins)} মি.` : `${toBn(hours)} ঘণ্টা`;
}

export function formatRelativeTimeBn(timestamp: number | undefined | null): string {
  if (!timestamp) return 'অজানা';
  const diffMs = Date.now() - timestamp;
  const diffSecs = Math.floor(diffMs / 1000);
  if (diffSecs < 120) return 'লাইভ সক্রিয়';
  if (diffSecs < 3600) return `${toBn(Math.floor(diffSecs / 60))} মিনিট আগে`;
  if (diffSecs < 86400) return `${toBn(Math.floor(diffSecs / 3600))} ঘণ্টা আগে`;
  const diffDays = Math.floor(diffSecs / 86400);
  if (diffDays === 1) return 'গতকাল';
  if (diffDays < 30) return `${toBn(diffDays)} দিন আগে`;
  return formatBengaliDate(new Date(timestamp));
}

