import { useAlert } from '../../contexts/AlertContext';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useParams, usePathname as useLocation } from 'next/navigation';
import { ref, get, onValue, off } from 'firebase/database';
import { db } from '../../lib/firebase';
const useAuth = () => ({ currentUser: null });
const useDonor = () => ({ donorData: null });
import { hapticFeedback } from '../../utils/haptics';
import {
  PAYMENT_PLANS,
  DEFAULT_PAYMENT_METHODS,
  DEFAULT_BANK_ACCOUNTS,
  paymentService
} from '../../services/paymentService';
import type { FullPaymentSettings } from '../../services/paymentService';
import type { PaymentPlan, BankId } from '../../types';

export const DEFAULT_BRAND_THEMES: Record<string, { bg: string; btn: string; helpline: string }> = {
  bkash: { bg: 'bg-[#D81A60]', btn: '!bg-[#D81A60] hover:!bg-[#C2185B]', helpline: '16247' },
  nagad: { bg: 'bg-[#EA580C]', btn: '!bg-[#EA580C] hover:!bg-[#C2410C]', helpline: '16167' },
  rocket: { bg: 'bg-[#7E22CE]', btn: '!bg-[#7E22CE] hover:!bg-[#6B21A8]', helpline: '16216' },
  upay: { bg: 'bg-[#005CA9]', btn: '!bg-[#005CA9] hover:!bg-[#004A87]', helpline: '16268' },
  cellfin: { bg: 'bg-[#008542]', btn: '!bg-[#008542] hover:!bg-[#006E37]', helpline: '16259' },
  mcash: { bg: 'bg-[#0A7339]', btn: '!bg-[#0A7339] hover:!bg-[#085C2E]', helpline: '16259' },
  nexus_pay: { bg: 'bg-[#006241]', btn: '!bg-[#006241] hover:!bg-[#004D33]', helpline: '16216' },
  dbbl: { bg: 'bg-[#006241]', btn: '!bg-[#006241] hover:!bg-[#004D33]', helpline: '16216' },
  ibbl: { bg: 'bg-[#008542]', btn: '!bg-[#008542] hover:!bg-[#006E37]', helpline: '16259' },
  agrani: { bg: 'bg-[#005A36]', btn: '!bg-[#005A36] hover:!bg-[#00472B]', helpline: '16922' },
  bangla_qr: { bg: 'bg-[#008542]', btn: '!bg-[#008542] hover:!bg-[#006E37]', helpline: '16216' }
};

export interface UsePaymentGatewayOptions {
  service?: string;
  refId?: string;
  serviceTitle?: string;
  targetPath?: string;
  amount?: number;
  plans?: PaymentPlan[];
  defaultPlanId?: string;
  userPhone?: string;
  userId?: string;
  mode?: 'routed' | 'stepper';
  baseRoute?: string;
  brandThemes?: Record<string, { bg: string; btn: string; helpline: string }>;
  customSettings?: FullPaymentSettings;
  onSubmitPayment?: (paymentData: any) => Promise<string>;
  onSuccess?: (paymentId: string) => void;
  onCancel?: () => void;
}

export function usePaymentGateway(options: UsePaymentGatewayOptions = {}) {
  const {
    service = 'house_rent',
    refId = '',
    serviceTitle = '',
    targetPath,
    amount,
    plans = PAYMENT_PLANS,
    defaultPlanId = '3_month',
    userPhone = '',
    userId,
    mode = 'routed',
    baseRoute = '/payment',
    brandThemes = DEFAULT_BRAND_THEMES,
    onSuccess,
    onCancel
  } = options;

  let navigate: any = () => {};
  let location: any = '';
  let params: Record<string, string | undefined> = {};
  try {
    navigate = useRouter();
    location = useLocation() || '';
    params = useParams();
  } catch {
    navigate = () => {};
    location = '';
    params = {};
  }

  let showCustomAlert = (msg: string, _type?: string, _duration?: number) => {
    if (typeof window !== 'undefined') alert(msg);
  };
  try {
    const alertCtx = useAlert();
    const { showCustomAlert } = alertCtx;
  } catch {}

  let currentUser: any = null;
  try {
    const authCtx = useAuth();
    currentUser = authCtx?.currentUser || null;
  } catch {}

  let donorData: any = null;
  try {
    const donorCtx = useDonor();
    donorData = donorCtx?.donorData || null;
  } catch {}

  const isRoutedMode = mode === 'routed';

  const routeCategory = isRoutedMode ? params.category : undefined;
  const routeMethodId = isRoutedMode ? params.methodId : undefined;

  const [stepperStep, setStepperStep] = useState<'gateway' | 'pay' | 'trxn' | 'voucher'>('gateway');

  const isPayStep = isRoutedMode
    ? location.endsWith('/pay')
    : stepperStep === 'pay';

  const isTrxnStep = isRoutedMode
    ? location.endsWith('/trxn')
    : stepperStep === 'trxn';

  const cachedSettings = options.customSettings || paymentService.getCachedSettings();
  const [settings, setSettings] = useState<FullPaymentSettings>(
    cachedSettings || {
      plans: PAYMENT_PLANS,
      methods: DEFAULT_PAYMENT_METHODS as any,
      banks: DEFAULT_BANK_ACCOUNTS,
      banglaQrUrl: ''
    }
  );

  const [selectedPlanId, setSelectedPlanId] = useState<string>(defaultPlanId);
  const [activeTab, setActiveTab] = useState<'mobile' | 'bank' | 'bangla_qr'>('mobile');
  const [selectedChannelId, setSelectedChannelId] = useState<string>('');
  const [trxId, setTrxId] = useState<string>('');
  const [trxError, setTrxError] = useState<string>('');
  const [channelError, setChannelError] = useState<string>('');
  const [isChannelShaking, setIsChannelShaking] = useState<boolean>(false);
  const [isPayingDetailsOpen, setIsPayingDetailsOpen] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(600);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [hasCopiedNumber, setHasCopiedNumber] = useState<boolean>(false);
  const [hasCopiedAmount, setHasCopiedAmount] = useState<boolean>(false);
  const [isPayShaking, setIsPayShaking] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedPaymentId, setSubmittedPaymentId] = useState<string>('');
  const [serverOrder, setServerOrder] = useState<any>(null);
  const [livePaymentStatus, setLivePaymentStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');
  const [liveRejectReason, setLiveRejectReason] = useState<string>('');
  const [isOrderValidating, setIsOrderValidating] = useState<boolean>(Boolean(refId || (isRoutedMode && (isPayStep || isTrxnStep))));
  const [orderValidity, setOrderValidity] = useState<'valid' | 'invalid' | 'expired' | 'verified' | 'pending_verification' | null>(null);

  const [isSettingsLoaded, setIsSettingsLoaded] = useState<boolean>(Boolean(cachedSettings));

  useEffect(() => {
    if (options.customSettings) {
      setSettings(options.customSettings);
      setIsSettingsLoaded(true);
      return;
    }
    const unsub = paymentService.subscribeSettings((fetched) => {
      if (fetched) {
        setSettings(fetched);
        setIsSettingsLoaded(true);
      }
    });
    return () => {
      unsub();
    };
  }, [options.customSettings]);

  useEffect(() => {
    if (isRoutedMode) {
      if (routeCategory === 'bank') {
        setActiveTab('bank');
        if (routeMethodId) setSelectedChannelId(routeMethodId);
      } else if (routeCategory === 'bangla-qr') {
        setActiveTab('bangla_qr');
        setSelectedChannelId('bangla_qr');
      } else if (routeCategory === 'mobile-banking') {
        setActiveTab('mobile');
        if (routeMethodId) setSelectedChannelId(routeMethodId);
      }
    }
  }, [isRoutedMode, routeCategory, routeMethodId]);

  useEffect(() => {
    if (!isRoutedMode || !isSettingsLoaded) return;
    if (!isPayStep && !isTrxnStep) return;

    if (routeCategory === 'mobile-banking' && routeMethodId) {
      const methodCfg = settings.methods?.[routeMethodId];
      if (methodCfg && methodCfg.isActive === false) {
        showCustomAlert(`${methodCfg.name || 'পেমেন্ট মাধ্যম'} বর্তমানে সক্রিয় নেই`, 'warning');
        navigate(baseRoute, { replace: true });
      }
    } else if (routeCategory === 'bank' && routeMethodId) {
      const bankCfg = settings.banks?.[routeMethodId as BankId];
      if (bankCfg && bankCfg.isActive === false) {
        showCustomAlert(`${bankCfg.name || 'ব্যাংক একাউন্ট'} বর্তমানে সক্রিয় নেই`, 'warning');
        navigate(baseRoute, { replace: true });
      }
    } else if (routeCategory === 'bangla-qr') {
      if (!settings.banglaQrUrl) {
        showCustomAlert('বাংলা কিউআর বর্তমানে সক্রিয় নেই', 'warning');
        navigate(baseRoute, { replace: true });
      }
    }
  }, [isRoutedMode, isSettingsLoaded, isPayStep, isTrxnStep, routeCategory, routeMethodId, settings, baseRoute, navigate, showCustomAlert]);

  useEffect(() => {
    setChannelError('');
    if (!selectedChannelId) return;
    if (activeTab === 'mobile') {
      if (settings?.methods?.[selectedChannelId]?.isActive === false) {
        setSelectedChannelId('');
      }
    } else if (activeTab === 'bank') {
      if (settings?.banks?.[selectedChannelId as BankId]?.isActive === false) {
        setSelectedChannelId('');
      }
    }
  }, [settings, activeTab, selectedChannelId]);

  useEffect(() => {
    if (!refId) {
      if (isRoutedMode && (isPayStep || isTrxnStep)) {
        setOrderValidity('invalid');
        setIsOrderValidating(false);
      } else {
        setOrderValidity('valid');
        setIsOrderValidating(false);
      }
      return;
    }

    setIsOrderValidating(true);
    const orderRef = ref(db, `payment_links/${refId}`);
    get(orderRef).then((orderSnap) => {
      if (orderSnap.exists()) {
        const val = orderSnap.val();
        setServerOrder(val);
        if (val.planId) setSelectedPlanId(val.planId);

        const maxExpiry = val.createdAt ? val.createdAt + 10 * 60 * 1000 : (val.expiresAt || (Date.now() + 10 * 60 * 1000));
        const effectiveExpiresAt = Math.min(val.expiresAt || maxExpiry, maxExpiry);

        if (Date.now() > effectiveExpiresAt) {
          setOrderValidity('expired');
        } else if (val.status === 'verified') {
          setOrderValidity('verified');
          setLivePaymentStatus('verified');
          setIsSubmitted(true);
        } else if (val.status === 'pending_verification') {
          setOrderValidity('pending_verification');
          setLivePaymentStatus('pending');
          setIsSubmitted(true);
        } else {
          setOrderValidity('valid');
          const remaining = Math.min(600, Math.max(0, Math.floor((effectiveExpiresAt - Date.now()) / 1000)));
          setTimeLeft(remaining);
        }
        setIsOrderValidating(false);
        return;
      }

      const cleanRef = refId.replace(/^HK-/, '');
      const checkServiceItem = async () => {
        try {
          const itemSnap = await get(ref(db, `payment_links/${refId}`));

            if (itemSnap && itemSnap.exists()) {
            const itemVal = itemSnap.val();
            if (itemVal.planId) setSelectedPlanId(itemVal.planId);
            if (itemVal.status === 'verified' || itemVal.status === 'approved') {
              setOrderValidity('verified');
              setLivePaymentStatus('verified');
              setIsSubmitted(true);
            } else if (itemVal.status === 'pending_verification') {
              setOrderValidity('pending_verification');
              setLivePaymentStatus('pending');
              setIsSubmitted(true);
            } else {
              const maxExpiry = itemVal.createdAt ? itemVal.createdAt + 10 * 60 * 1000 : (Date.now() + 10 * 60 * 1000);
              if (Date.now() > maxExpiry) {
                setOrderValidity('expired');
              } else {
                setOrderValidity('valid');
                const remaining = Math.min(600, Math.max(0, Math.floor((maxExpiry - Date.now()) / 1000)));
                setTimeLeft(remaining);
              }
            }
          } else {
            setOrderValidity('invalid');
          }
        } catch {
          setOrderValidity('invalid');
        } finally {
          setIsOrderValidating(false);
        }
      };
      checkServiceItem();
    }).catch(() => {
      setOrderValidity('invalid');
      setIsOrderValidating(false);
    });
  }, [refId, isRoutedMode, isPayStep, isTrxnStep]);

  useEffect(() => {
    const targetId = submittedPaymentId || (refId && refId.startsWith('RF-') ? refId : '');
    if (!targetId) return;

    let unsubRef: any = null;
    if (submittedPaymentId) {
      const pRef = ref(db, `payment_links/${submittedPaymentId}`);
      unsubRef = pRef;
      onValue(pRef, (snap) => {
        if (snap.exists()) {
          const val = snap.val();
          if (val.status) {
            setLivePaymentStatus(val.status);
            if (val.rejectionReason) setLiveRejectReason(val.rejectionReason);
          }
        }
      });
    } else if (refId) {
      const oRef = ref(db, `payment_links/${refId}`);
      unsubRef = oRef;
      onValue(oRef, (snap) => {
        if (snap.exists()) {
          const val = snap.val();
          if (val.status === 'verified') {
            setLivePaymentStatus('verified');
          } else if (val.status === 'rejected') {
            setLivePaymentStatus('rejected');
            if (val.rejectionReason) setLiveRejectReason(val.rejectionReason);
          }
        }
      });
    }

    return () => {
      if (unsubRef) off(unsubRef);
    };
  }, [submittedPaymentId, refId]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (refId && orderValidity === 'valid') {
        setOrderValidity('expired');
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, refId, orderValidity]);

  const timerMinutes = Math.floor(timeLeft / 60);
  const timerSeconds = timeLeft % 60;
  const formattedTimer = `${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`;

  const selectedPlan = useMemo(() => {
    if (amount !== undefined) {
      return {
        id: 'custom',
        durationMonths: 1,
        price: amount,
        label: 'নির্দিষ্ট ফি',
        durationLabel: 'এককালীন'
      };
    }
    return plans.find((p) => p.id === selectedPlanId) || plans[0] || PAYMENT_PLANS[0];
  }, [amount, plans, selectedPlanId]);

  const planPrice = serverOrder?.amount !== undefined
    ? serverOrder.amount
    : (amount !== undefined ? amount : selectedPlan?.price || 50);

  const sessionTrxId = useMemo(() => {
    if (refId) {
      return refId.startsWith('RF-') ? refId : `RF-${refId}`;
    }
    const timestamp = Date.now().toString().slice(-6);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    for (let i = 0; i < 4; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `HK-TXN${timestamp}${rand}`;
  }, [refId]);

  const invoiceRef = sessionTrxId;

  const methodsMap = settings?.methods || DEFAULT_PAYMENT_METHODS;
  const banksMap = settings?.banks || DEFAULT_BANK_ACCOUNTS;

  const currentChannelId = (isRoutedMode ? routeMethodId : selectedChannelId) || selectedChannelId;
  const currentMethodConfig =
    methodsMap[currentChannelId] ||
    DEFAULT_PAYMENT_METHODS[currentChannelId] ||
    DEFAULT_PAYMENT_METHODS.bkash;
  const currentBankConfig =
    banksMap[currentChannelId as BankId] ||
    DEFAULT_BANK_ACCOUNTS[currentChannelId as BankId] ||
    DEFAULT_BANK_ACCOUNTS.dbbl;

  const currentTheme = brandThemes[currentChannelId] || DEFAULT_BRAND_THEMES[currentChannelId] || {
    bg: 'bg-[#0070E0]',
    btn: '!bg-[#0070E0] hover:!bg-[#005CA9]',
    helpline: '16247'
  };

  const isBanglaQr =
    (isRoutedMode && routeCategory === 'bangla-qr') || activeTab === 'bangla_qr';
  const isPayReady = isBanglaQr
    ? hasCopiedAmount
    : hasCopiedNumber && hasCopiedAmount;

  const handleCopyText = useCallback(async (text: string, key: string, label: string) => {
    if (!text) return;
    hapticFeedback.selection();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showCustomAlert(`${label} কপি করা হয়েছে`, 'success');
      setTimeout(() => setCopiedKey(null), 2000);
      if (key === 'mfs_num' || key === 'bank_acc') {
        setHasCopiedNumber(true);
      }
      if (key === 'amount') {
        setHasCopiedAmount(true);
      }
    } catch {
      showCustomAlert('কপি করা সম্ভব হয়নি', 'error');
    }
  }, [showCustomAlert]);

  const handleSelectChannel = useCallback((id: string) => {
    hapticFeedback.selection();
    setSelectedChannelId((prev) => (prev === id ? '' : id));
    setTrxError('');
    setChannelError('');
  }, []);

  const handleProceedToPayStep = useCallback(() => {
    const effectiveChannelId = activeTab === 'bangla_qr' ? 'bangla-qr' : selectedChannelId;
    if (!effectiveChannelId) {
      hapticFeedback.error();
      const msg = 'অনুগ্রহ করে একটি পেমেন্ট মাধ্যম নির্বাচন করুন';
      setChannelError(msg);
      showCustomAlert(msg, 'error');
      setIsPayShaking(true);
      setIsChannelShaking(true);
      setTimeout(() => {
        setIsPayShaking(false);
        setIsChannelShaking(false);
      }, 450);
      return;
    }
    if (activeTab === 'mobile') {
      const isMethodActive = settings?.methods?.[effectiveChannelId]?.isActive === true;
      if (!isMethodActive) {
        hapticFeedback.warning();
        const msg = 'এই পেমেন্ট মাধ্যমটি বর্তমানে সক্রিয় নেই';
        setChannelError(msg);
        showCustomAlert(msg, 'warning');
        setIsPayShaking(true);
        setIsChannelShaking(true);
        setTimeout(() => {
          setIsPayShaking(false);
          setIsChannelShaking(false);
        }, 450);
        return;
      }
    } else if (activeTab === 'bank') {
      const isBankActive = settings?.banks?.[effectiveChannelId as BankId]?.isActive === true;
      if (!isBankActive) {
        hapticFeedback.warning();
        const msg = 'এই ব্যাংক একাউন্টটি বর্তমানে সক্রিয় নেই';
        setChannelError(msg);
        showCustomAlert(msg, 'warning');
        setIsPayShaking(true);
        setIsChannelShaking(true);
        setTimeout(() => {
          setIsPayShaking(false);
          setIsChannelShaking(false);
        }, 450);
        return;
      }
    } else if (activeTab === 'bangla_qr') {
      if (!settings?.banglaQrUrl) {
        hapticFeedback.warning();
        const msg = 'বাংলা কিউআর পেমেন্ট বর্তমানে সক্রিয় নেই';
        setChannelError(msg);
        showCustomAlert(msg, 'warning');
        setIsPayShaking(true);
        setIsChannelShaking(true);
        setTimeout(() => {
          setIsPayShaking(false);
          setIsChannelShaking(false);
        }, 450);
        return;
      }
    }
    setChannelError('');
    hapticFeedback.medium();
    const categorySlug =
      activeTab === 'mobile'
        ? 'mobile-banking'
        : activeTab === 'bank'
        ? 'bank'
        : 'bangla-qr';
    const methodSlug = effectiveChannelId;

    if (isRoutedMode) {
      navigate(`${baseRoute}/${categorySlug}/${methodSlug}/pay?refId=${encodeURIComponent(invoiceRef)}`);
    } else {
      setSelectedChannelId(effectiveChannelId);
      setStepperStep('pay');
    }
  }, [activeTab, selectedChannelId, settings, showCustomAlert, isRoutedMode, navigate, baseRoute, invoiceRef]);

  const handleConfirmPay = useCallback(() => {
    if (!isPayReady) {
      hapticFeedback.warning();
      setIsPayShaking(true);
      setTimeout(() => setIsPayShaking(false), 450);

      if (isBanglaQr) {
        if (!hasCopiedAmount) {
          showCustomAlert('পরবর্তী ধাপে যেতে অনুগ্রহ করে টাকার পরিমাণ কপি করুন', 'warning');
        }
      } else if (!hasCopiedNumber && !hasCopiedAmount) {
        const numLabel = (isRoutedMode ? routeCategory : activeTab) === 'bank' ? 'একাউন্ট নম্বর' : 'নম্বর';
        showCustomAlert(`পরবর্তী ধাপে যেতে অনুগ্রহ করে ${numLabel} ও টাকার পরিমাণ কপি করুন`, 'warning');
      } else if (!hasCopiedNumber) {
        const typeStr = (isRoutedMode ? routeCategory : activeTab) === 'bank' ? 'ব্যাংক একাউন্ট নম্বরটি' : `${currentMethodConfig?.name || ''} নম্বরটি`;
        showCustomAlert(`পরবর্তী ধাপে যেতে অনুগ্রহ করে ${typeStr} কপি করুন`, 'warning');
      } else if (!hasCopiedAmount) {
        showCustomAlert('পরবর্তী ধাপে যেতে অনুগ্রহ করে টাকার পরিমাণ কপি করুন', 'warning');
      }
      return;
    }

    hapticFeedback.medium();
    const categorySlug =
      (isRoutedMode ? routeCategory : undefined) ||
      (activeTab === 'mobile' ? 'mobile-banking' : activeTab === 'bank' ? 'bank' : 'bangla-qr');
    const methodSlug = (isRoutedMode ? routeMethodId : undefined) || selectedChannelId;

    if (isRoutedMode) {
      navigate(`${baseRoute}/${categorySlug}/${methodSlug}/pay/trxn?refId=${encodeURIComponent(invoiceRef)}`);
    } else {
      setStepperStep('trxn');
    }
  }, [
    isPayReady,
    isBanglaQr,
    hasCopiedAmount,
    hasCopiedNumber,
    isRoutedMode,
    routeCategory,
    activeTab,
    routeMethodId,
    selectedChannelId,
    showCustomAlert,
    currentMethodConfig?.name,
    navigate,
    baseRoute,
    invoiceRef
  ]);

  const handleCancelToGateway = useCallback(() => {
    hapticFeedback.light();
    if (isRoutedMode) {
      navigate(`${baseRoute}?refId=${encodeURIComponent(invoiceRef)}`);
    } else {
      setStepperStep('gateway');
    }
  }, [isRoutedMode, navigate, baseRoute, invoiceRef]);

  const handleBackToPayStep = useCallback(() => {
    hapticFeedback.light();
    const categorySlug = (isRoutedMode ? routeCategory : undefined) || (activeTab === 'bank' ? 'bank' : activeTab === 'bangla_qr' ? 'bangla-qr' : 'mobile-banking');
    const methodSlug = (isRoutedMode ? routeMethodId : undefined) || selectedChannelId;
    if (isRoutedMode) {
      navigate(`${baseRoute}/${categorySlug}/${methodSlug}/pay?refId=${encodeURIComponent(invoiceRef)}`);
    } else {
      setStepperStep('pay');
    }
  }, [isRoutedMode, routeCategory, activeTab, routeMethodId, selectedChannelId, navigate, baseRoute, invoiceRef]);

  const handleSubmitPayment = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    hapticFeedback.medium();

    if (orderValidity === 'invalid' || orderValidity === 'expired') {
      showCustomAlert('অকার্যকর বা মেয়াদোত্তীর্ণ পেমেন্ট লিংক!', 'error');
      return;
    }

    const cleanTrx = trxId.trim().toUpperCase();
    if (!cleanTrx) {
      setTrxError('অনুগ্রহ করে TRXN ID প্রদান করুন');
      showCustomAlert('অনুগ্রহ করে TRXN ID প্রদান করুন', 'error');
      hapticFeedback.error();
      const inputEl = document.getElementById('trxIdInput');
      if (inputEl) inputEl.focus();
      return;
    }
    if (cleanTrx.length < 4) {
      setTrxError('সঠিক ও পূর্ণাঙ্গ TRXN ID প্রদান করুন');
      showCustomAlert('সঠিক TRXN ID প্রদান করুন', 'error');
      hapticFeedback.error();
      const inputEl = document.getElementById('trxIdInput');
      if (inputEl) inputEl.focus();
      return;
    }

    setTrxError('');
    setIsSubmitting(true);

    try {
      const channelLabel =
        ((isRoutedMode ? routeCategory : undefined) === 'bangla-qr' || activeTab === 'bangla_qr')
          ? 'Bangla QR'
          : ((isRoutedMode ? routeCategory : undefined) === 'bank' || activeTab === 'bank')
          ? currentBankConfig?.name || currentChannelId
          : currentMethodConfig?.name || currentChannelId;

      const effectiveUserId = userId || currentUser?.uid || donorData?.id || '';
      const effectiveUserPhone =
        userPhone ||
        currentUser?.phoneNumber ||
        (currentUser as any)?.phone ||
        donorData?.contact ||
        (typeof window !== 'undefined'
          ? localStorage.getItem('khetlal_donor_phone') || localStorage.getItem('bpi_donor_phone')
          : null) ||
        '';
      let effectiveFcmToken = '';
      try {
        effectiveFcmToken = localStorage.getItem('fcm_token') || '';
      } catch {}

      const paymentData = {
        service,
        refId: refId || invoiceRef,
        serviceTitle,
        planId: selectedPlan.id,
        planLabel: selectedPlan.label,
        durationMonths: selectedPlan.durationMonths,
        amount: planPrice,
        method: channelLabel,
        trxId: cleanTrx,
        userId: effectiveUserId,
        userPhone: effectiveUserPhone,
        fcmToken: effectiveFcmToken,
        targetPath
      };

      const paymentId = options.onSubmitPayment
        ? await options.onSubmitPayment(paymentData)
        : await paymentService.submitPayment(paymentData);

      hapticFeedback.success();
      setSubmittedPaymentId(paymentId);
      setIsSubmitted(true);
      if (!isRoutedMode) {
        setStepperStep('voucher');
      }
      if (onSuccess) {
        onSuccess(paymentId);
      }
    } catch (err: any) {
      showCustomAlert(`পেমেন্ট সম্পন্ন করতে সমস্যা হয়েছে: ${err?.message || 'অজানা ত্রুটি'}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    trxId,
    orderValidity,
    showCustomAlert,
    isRoutedMode,
    routeCategory,
    activeTab,
    currentBankConfig?.name,
    currentChannelId,
    currentMethodConfig?.name,
    userId,
    currentUser?.uid,
    currentUser?.phoneNumber,
    userPhone,
    service,
    refId,
    invoiceRef,
    serviceTitle,
    selectedPlan.id,
    selectedPlan.label,
    selectedPlan.durationMonths,
    planPrice,
    targetPath,
    onSuccess,
    options.onSubmitPayment
  ]);

  const handleResetPayment = useCallback(() => {
    setIsSubmitted(false);
    setSubmittedPaymentId('');
    setTrxId('');
    setTrxError('');
    setHasCopiedNumber(false);
    setHasCopiedAmount(false);
    setTimeLeft(600);
    setStepperStep('gateway');
  }, []);

  return {
    isRoutedMode,
    isPayStep,
    isTrxnStep,
    isOrderValidating,
    orderValidity,
    isSubmitted,
    submittedPaymentId,
    livePaymentStatus,
    liveRejectReason,
    settings,
    isSettingsLoaded,
    activeTab,
    setActiveTab,
    selectedChannelId,
    setSelectedChannelId,
    selectedPlanId,
    setSelectedPlanId,
    selectedPlan,
    planPrice,
    invoiceRef,
    currentChannelId,
    currentMethodConfig,
    currentBankConfig,
    currentTheme,
    isBanglaQr,
    isPayReady,
    isPayShaking,
    copiedKey,
    hasCopiedNumber,
    hasCopiedAmount,
    handleCopyText,
    timeLeft,
    formattedTimer,
    trxId,
    setTrxId,
    trxError,
    setTrxError,
    isSubmitting,
    isPayingDetailsOpen,
    setIsPayingDetailsOpen,
    handleSelectChannel,
    handleProceedToPayStep,
    handleConfirmPay,
    handleCancelToGateway,
    handleBackToPayStep,
    handleSubmitPayment,
    handleResetPayment,
    channelError,
    setChannelError,
    isChannelShaking,
    onCancel
  };
}












