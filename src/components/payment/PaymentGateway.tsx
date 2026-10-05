import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Copy,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Building2,
  QrCode,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Phone,
  AlertCircle
} from 'lucide-react';
import { hapticFeedback } from '../../utils/haptics';
import { toBn } from '../../utils/helpers';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SegmentedControl from '../ui/SegmentedControl';
import PaymentChannelCard from '../ui/PaymentChannelCard';
import PageHeader from '../layout/PageHeader';
import Skeleton from '../ui/Skeleton';
import { usePaymentGateway } from './usePaymentGateway';
import type { UsePaymentGatewayOptions } from './usePaymentGateway';
import type { PaymentPlan, BankId } from '../../types';
import {
  BKashLogo,
  NagadLogo,
  RocketLogo,
  UpayLogo,
  CellfinLogo,
  MCashLogo,
  NexusPayLogo,
  DBBLLogo,
  IBBLLogo,
  AgraniBankLogo,
  BanglaQRLogo
} from './PaymentLogos';

export interface PaymentGatewayProps extends UsePaymentGatewayOptions {
  appName?: string;
  appLogo?: string;
  verifiedBadge?: boolean;
  className?: string;
  showHeader?: boolean;
}

export default function PaymentGateway(props: PaymentGatewayProps) {
  const {
    appName = 'HELLO KHETLAL',
    appLogo = '/logo.png',
    verifiedBadge = true,
    className = '',
    service = 'house_rent',
    showHeader = true,
    onCancel,
    onSuccess
  } = props;

  let navigate: any = () => {};
  try {
    navigate = useRouter().push;
  } catch {
    navigate = () => {};
  }
  const fallbackPath = service === 'house_rent' ? '/rent-house' : '/';

  const {
    isPayStep,
    isTrxnStep,
    settings,
    isSettingsLoaded,
    isOrderValidating,
    orderValidity,
    isSubmitted,
    submittedPaymentId,
    livePaymentStatus,
    liveRejectReason,
    activeTab,
    setActiveTab,
    selectedChannelId,
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
    formattedTimer,
    trxId,
    setTrxId,
    trxError,
    setTrxError,
    channelError,
    isChannelShaking,
    isSubmitting,
    isPayingDetailsOpen,
    setIsPayingDetailsOpen,
    handleSelectChannel,
    handleProceedToPayStep,
    handleConfirmPay,
    handleCancelToGateway,
    handleBackToPayStep,
    handleSubmitPayment
  } = usePaymentGateway(props);

  const availablePlans: PaymentPlan[] = props.plans || [selectedPlan];
  const hasPlanSelector = props.amount === undefined && availablePlans.length > 1;

  const renderChannelLogo = (id: string, logoClass = 'max-h-full max-w-full object-contain') => {
    switch (id) {
      case 'bkash':
        return <BKashLogo className={logoClass} />;
      case 'nagad':
        return <NagadLogo className={logoClass} />;
      case 'rocket':
        return <RocketLogo className={logoClass} />;
      case 'upay':
        return <UpayLogo className={logoClass} />;
      case 'cellfin':
        return <CellfinLogo className={logoClass} />;
      case 'mcash':
        return <MCashLogo className={logoClass} />;
      case 'nexus_pay':
        return <NexusPayLogo className={`${logoClass} rounded-xl`} />;
      case 'dbbl':
        return <DBBLLogo className={logoClass} />;
      case 'ibbl':
        return <IBBLLogo className={logoClass} />;
      case 'agrani':
        return <AgraniBankLogo className={logoClass} />;
      case 'bangla_qr':
      case 'bangla-qr':
        return <BanglaQRLogo className={logoClass} />;
      default:
        return <span className="font-black text-sm uppercase">{id}</span>;
    }
  };

  const timerBadge = (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-50 to-red-50   text-rose-600  border border-rose-200/80  font-anek shadow-2xs shrink-0 select-none">
      <Clock className="w-3.5 h-3.5 text-rose-500  animate-pulse shrink-0" />
      <span className="font-extrabold text-xs tracking-wider tabular-nums min-w-[36px] text-center inline-block text-rose-600 ">
        {toBn(formattedTimer)}
      </span>
    </div>
  );

  if (isOrderValidating) {
    return (
      <div className="w-full">
        {showHeader && (
          <PageHeader
            title="পেমেন্ট গেটওয়ে"
            showBack={true}
            onBack={onCancel || handleCancelToGateway}
          />
        )}
        <div className={showHeader ? "px-3 pt-3" : ""}>
          <div className={`max-w-md mx-auto w-full ${className}`}>
            <Skeleton type="paymentCard" />
          </div>
        </div>
      </div>
    );
  }

  if (orderValidity === 'invalid') {
    return (
      <div className="w-full">
        {showHeader && (
          <PageHeader
            title="পেমেন্ট গেটওয়ে"
            showBack={true}
            onBack={onCancel || handleCancelToGateway}
          />
        )}
        <div className={showHeader ? "px-3 pt-3" : ""}>
          <div className={`max-w-md mx-auto w-full bg-white  rounded-3xl border border-rose-100  shadow-sm overflow-hidden font-anek p-6 text-center space-y-4 ${className}`}>
            <div className="w-16 h-16 rounded-2xl bg-rose-50  text-rose-600  flex items-center justify-center mx-auto border border-rose-200/80  shadow-2xs">
              <ShieldAlert className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-black text-gray-900 ">
                অকার্যকর পেমেন্ট লিংক
              </h2>
              <p className="text-xs text-gray-500  max-w-xs mx-auto leading-relaxed">
                এই পেমেন্ট লিংকের জন্য কোনো বৈধ অর্ডার ডাটাবেজে পাওয়া যায়নি অথবা লিংকটিতে পরিবর্তন করা হয়েছে। নিরাপত্তার স্বার্থে পেমেন্ট গ্রহণ করা সম্ভব নয়।
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onCancel || handleCancelToGateway}
                className="w-full py-3 px-4 rounded-xl bg-gray-100  text-gray-700  font-bold text-sm hover:bg-gray-200 :bg-gray-700 active:scale-[0.98] transition-all cursor-pointer"
              >
                ফিরে যান
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderValidity === 'expired') {
    return (
      <div className="w-full">
        {showHeader && (
          <PageHeader
            title="পেমেন্ট গেটওয়ে"
            showBack={true}
            onBack={onCancel || handleCancelToGateway}
          />
        )}
        <div className={showHeader ? "px-3 pt-3" : ""}>
          <div className={`max-w-md mx-auto w-full bg-white  rounded-3xl border border-amber-100  shadow-sm overflow-hidden font-anek p-6 text-center space-y-4 ${className}`}>
            <div className="w-16 h-16 rounded-2xl bg-amber-50  text-amber-600  flex items-center justify-center mx-auto border border-amber-200/80  shadow-2xs">
              <Clock className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-black text-gray-900 ">
                পেমেন্টের সময়সীমা উত্তীর্ণ হয়েছে
              </h2>
              <p className="text-xs text-gray-500  max-w-xs mx-auto leading-relaxed">
                নিরাপত্তার স্বার্থে পেমেন্ট সেশনের নির্দিষ্ট সময় (১০ মিনিট) অতিবাহিত হয়ে গেছে। অনুগ্রহ করে পুনরায় নতুন করে অর্ডার করুন।
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onCancel || handleCancelToGateway}
                className="w-full py-3 px-4 rounded-xl bg-[#0070E0] text-white font-bold text-sm hover:bg-[#005bb5] active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-blue-500/20"
              >
                পুনরায় চেষ্টা করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="w-full">
        {showHeader && (
          <PageHeader
            title="পেমেন্ট ভাউচার"
            showBack={false}
          />
        )}
        <div className={showHeader ? "px-3 pt-3" : ""}>
          <div className={`max-w-md mx-auto w-full bg-white  rounded-3xl border border-black/[0.04]  shadow-sm overflow-hidden font-anek ${className}`}>
            <div className={`${
              livePaymentStatus === 'verified'
                ? 'bg-emerald-600'
                : livePaymentStatus === 'rejected'
                ? 'bg-rose-600'
                : 'bg-[#0070E0]'
            } px-5 py-4 text-white flex items-center justify-between transition-colors`}>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight">{appName}</span>
                <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded">
                  Payment Voucher
                </span>
              </div>
              <span className={`text-xs font-bold text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs ${
                livePaymentStatus === 'verified'
                  ? 'bg-white/25'
                  : livePaymentStatus === 'rejected'
                  ? 'bg-black/25'
                  : 'bg-emerald-500'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>
                  {livePaymentStatus === 'verified'
                    ? 'অনুমোদিত'
                    : livePaymentStatus === 'rejected'
                    ? 'যাচাই হয়নি'
                    : 'গৃহীত'}
                </span>
              </span>
            </div>

            <div className="p-6 space-y-5 text-center">
              {livePaymentStatus === 'verified' ? (
                <div className="w-16 h-16 rounded-full bg-emerald-50  text-emerald-600  flex items-center justify-center mx-auto shadow-inner border border-emerald-200  animate-scale-up">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </div>
              ) : livePaymentStatus === 'rejected' ? (
                <div className="w-16 h-16 rounded-full bg-rose-50  text-rose-600  flex items-center justify-center mx-auto shadow-inner border border-rose-200  animate-scale-up">
                  <AlertCircle className="w-9 h-9 stroke-[2.5]" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-50  text-[#0070E0] flex items-center justify-center mx-auto shadow-inner border border-blue-200  animate-pulse">
                  <Clock className="w-9 h-9 stroke-[2.5]" />
                </div>
              )}

              <div>
                <h2 className="text-xl font-black text-gray-900 ">
                  {livePaymentStatus === 'verified'
                    ? 'পেমেন্ট সফলভাবে অনুমোদিত হয়েছে!'
                    : livePaymentStatus === 'rejected'
                    ? 'পেমেন্টটি অনুমোদিত হয়নি'
                    : 'পেমেন্ট যাচাইয়ের জন্য জমা হয়েছে'}
                </h2>
                <p className="text-xs text-gray-600  mt-1 max-w-xs mx-auto">
                  {livePaymentStatus === 'verified'
                    ? 'আপনার পেমেন্ট অ্যাডমিন প্যানেল থেকে সফলভাবে যাচাই করা হয়েছে এবং সেবাটি সক্রিয় হয়েছে।'
                    : livePaymentStatus === 'rejected'
                    ? (liveRejectReason || 'প্রদত্ত TrxID অনুযায়ী সঠিক লেনদেন পাওয়া যায়নি। অনুগ্রহ করে সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।')
                    : 'আপনার প্রদত্ত TRXN ID অ্যাডমিন প্যানেলে পাঠানো হয়েছে। যাচাই সম্পন্ন হলে সেবাটি সরাসরি সক্রিয় হবে এবং পুশ নোটিফিকেশন পাবেন।'}
                </p>
              </div>

              <div className="bg-gray-50  rounded-2xl p-4 border border-gray-200/80  text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 ">
                  <span className="text-gray-500">ভাউচার আইডি:</span>
                  <span className="font-anek font-bold text-gray-800 ">{submittedPaymentId || invoiceRef}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 ">
                  <span className="text-gray-500">রেফারেন্স নং:</span>
                  <span className="font-anek font-bold text-blue-600">{invoiceRef}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 ">
                  <span className="text-gray-500">TrxID / TRXN:</span>
                  <span className="font-anek font-bold text-emerald-600 uppercase">{trxId}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 ">
                  <span className="text-gray-500">পেমেন্ট মাধ্যম:</span>
                  <span className="font-bold text-gray-800 ">{currentMethodConfig?.name || currentBankConfig?.name || activeTab}</span>
                </div>
                <div className="flex justify-between items-center pt-1 text-sm font-black">
                  <span className="text-gray-900 ">পরিশোধিত অর্থ:</span>
                  <span className="text-emerald-600 ">৳{toBn(planPrice)}.০০</span>
                </div>
                <div className="flex justify-between items-center pt-1 text-xs">
                  <span className="text-gray-500">বর্তমান স্ট্যাটাস:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-md ${
                    livePaymentStatus === 'verified'
                      ? 'bg-emerald-100 text-emerald-700  '
                      : livePaymentStatus === 'rejected'
                      ? 'bg-rose-100 text-rose-700  '
                      : 'bg-amber-100 text-amber-700  '
                  }`}>
                    {livePaymentStatus === 'verified'
                      ? 'অনুমোদিত ও সক্রিয়'
                      : livePaymentStatus === 'rejected'
                      ? 'প্রত্যাখ্যাত'
                      : 'যাচাই অপেক্ষমাণ'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => {
                    hapticFeedback.light();
                    if (onCancel) {
                      onCancel();
                    } else {
                      navigate(fallbackPath, { replace: true });
                    }
                  }}
                  className="flex-1 font-bold text-xs"
                >
                  তালিকায় যান
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => {
                    hapticFeedback.medium();
                    if (onSuccess && submittedPaymentId) {
                      onSuccess(submittedPaymentId);
                    } else {
                      navigate(fallbackPath || '/', { replace: true });
                    }
                  }}
                  className={`flex-1 font-bold text-xs text-white ${
                    livePaymentStatus === 'verified'
                      ? '!bg-emerald-600 hover:!bg-emerald-700'
                      : livePaymentStatus === 'rejected'
                      ? '!bg-rose-600 hover:!bg-rose-700'
                      : '!bg-[#0070E0] hover:!bg-[#005CA9]'
                  }`}
                >
                  {livePaymentStatus === 'verified' ? 'বিজ্ঞাপনটি দেখুন' : 'ঠিক আছে'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isTrxnStep) {
    return (
      <div className="w-full">
        {showHeader ? (
          <PageHeader
            title="ট্রানজেকশন যাচাই"
            onBack={handleBackToPayStep}
            fallbackPath={fallbackPath}
          />
        ) : (
          <div className="sticky top-0 z-20 bg-white  px-4 py-3 border-b border-gray-100  flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBackToPayStep}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700  hover:bg-gray-100 :bg-white/10 active:scale-90 transition border-0 bg-transparent cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-base sm:text-lg font-black text-gray-900  tracking-tight">
                Online Payment
              </h1>
            </div>
          </div>
        )}

        <div className={showHeader ? "px-3 pt-3" : ""}>
          <div className={`max-w-md mx-auto w-full bg-white  rounded-3xl border border-black/[0.04]  shadow-sm overflow-hidden font-anek ${className}`}>
            <div className="px-4 py-3 bg-white  border-b border-gray-100  flex items-center justify-between">
              <div className="h-9 flex items-center">
                {renderChannelLogo(currentChannelId, 'h-9 w-auto')}
              </div>
              {timerBadge}
            </div>

        <div className="px-4 py-2.5 bg-gray-50  border-b border-gray-100  flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={appLogo} alt={appName} className="w-7 h-7 rounded-lg object-contain shrink-0" />
            <div>
              <span className="font-black text-xs text-gray-900  block">{appName}</span>
              <span className="text-[10px] text-gray-500 font-anek">Inv No: {invoiceRef}</span>
            </div>
          </div>
          <span className="font-black text-base text-gray-900 ">৳{toBn(planPrice)}.০০</span>
        </div>

        <div className="p-5 space-y-4">
          <div className="p-3.5 rounded-2xl bg-blue-50/80  border border-blue-200  text-xs text-blue-900  flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">টাকা পাঠানো সম্পন্ন হয়েছে?</p>
              <p className="text-[11px] text-blue-700  mt-0.5">
                আপনার ফিরতি SMS বা অ্যাপে প্রাপ্ত <strong>Transaction ID (TRXN ID)</strong> নিচে লিখে সাবমিট করুন।
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitPayment} noValidate className="space-y-4">
            <div className="input-group-card">
              <Input
                id="trxIdInput"
                label="TRXN ID (Transaction ID) *"
                icon="fa-receipt"
                type="text"
                value={trxId}
                onChange={(e) => {
                  setTrxId(e.target.value.toUpperCase());
                  if (trxError) setTrxError('');
                }}
                error={trxError}
                placeholder="যেমন: 9J2K5L8A7B"
              />
            </div>

            <div className="flex gap-2.5 pt-2">
              <Button
                variant="secondary"
                size="large"
                type="button"
                onClick={handleBackToPayStep}
                className="w-1/3 font-bold text-xs text-gray-700 "
              >
                আগের ধাপ
              </Button>
              <Button
                variant="primary"
                size="large"
                type="submit"
                isLoading={isSubmitting}
                loadingText="সাবমিট হচ্ছে..."
                className="flex-1 !bg-[#0070E0] hover:!bg-[#005CA9] text-white font-black text-sm shadow-md"
              >
                সাবমিট করুন
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}

  if (isPayStep) {
    return (
      <div className="w-full">
        {showHeader ? (
          <PageHeader
            title={`${currentMethodConfig?.name || currentBankConfig?.name || 'পেমেন্ট'} নির্দেশনা`}
            onBack={handleCancelToGateway}
            fallbackPath={fallbackPath}
          />
        ) : (
          <div className="sticky top-0 z-20 bg-white  px-4 py-3 border-b border-gray-100  flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancelToGateway}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700  hover:bg-gray-100 :bg-white/10 active:scale-90 transition border-0 bg-transparent cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-base sm:text-lg font-black text-gray-900  tracking-tight">
                Online Payment
              </h1>
            </div>
          </div>
        )}

        <div className={showHeader ? "px-3 pt-3" : ""}>
          <div className={`max-w-md mx-auto w-full bg-white  rounded-3xl border border-black/[0.04]  shadow-sm overflow-hidden font-anek ${className}`}>
            <div className="px-4 py-3 bg-white  border-b border-gray-100  flex items-center justify-between">
              <div className="h-10 flex items-center">
                {renderChannelLogo(currentChannelId, 'h-10 w-auto')}
              </div>
              {timerBadge}
            </div>

        <div className="px-4 py-2.5 bg-gray-50  border-b border-gray-100  flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={appLogo} alt={appName} className="w-7 h-7 rounded-lg object-contain shrink-0" />
            <div>
              <span className="font-black text-xs text-gray-900  block">{appName}</span>
              <span className="text-[10px] text-gray-500 font-anek">Inv No: {invoiceRef}</span>
            </div>
          </div>
          <span className="font-black text-base text-gray-900 ">৳{toBn(planPrice)}.০০</span>
        </div>

        <div className={`${currentTheme.bg} p-5 text-white space-y-4`}>
          {activeTab === 'bank' ? (
            <div className="space-y-3">
              <p className="text-xs font-bold text-center text-white/90">
                {currentBankConfig.name}-এ ডিপোজিট বা ফান্ড ট্রান্সফার করুন
              </p>

              <div className="bg-white text-gray-900 rounded-2xl p-3.5 space-y-2 text-xs shadow-md">
                <div className="flex justify-between items-center pb-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Account Name:</span>
                  <span className="font-bold">{currentBankConfig.accountName || appName}</span>
                </div>
                <div className="flex justify-between items-center pb-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Account No:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-anek font-black select-all">{currentBankConfig.accountNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(currentBankConfig.accountNumber, 'bank_acc', 'একাউন্ট নম্বর')}
                      className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-[11px] font-bold text-gray-800"
                    >
                      {copiedKey === 'bank_acc' ? 'কপি হয়েছে' : 'কপি'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Branch:</span>
                  <span className="font-semibold">{currentBankConfig.branch}</span>
                </div>
                {currentBankConfig.routingNumber && (
                  <div className="flex justify-between items-center pt-1 text-[11px] text-gray-500">
                    <span>Routing No:</span>
                    <span className="font-anek">{currentBankConfig.routingNumber}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                <div>
                  <span className="text-[11px] text-white/80 block">পরিশোধের পরিমাণ</span>
                  <span className="font-anek font-black text-xl text-white">৳ {toBn(planPrice)}.০০</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(String(planPrice), 'amount', 'টাকার পরিমাণ')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 ${
                    hasCopiedAmount
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {hasCopiedAmount ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>টাকা কপিড</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>টাকা কপি</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-black/15 rounded-xl p-2.5 text-[11px] text-white/90 space-y-1">
                <p className="font-bold">
                  ব্যাংক নির্দেশাবলী:
                </p>
                <p className="text-[10px] text-white/80 leading-relaxed">
                  {currentBankConfig.instruction || 'ব্যাংক অ্যাপ, ইন্টারনেট ব্যাংকিং বা ব্রাঞ্চ থেকে একাউন্টে অর্থ ট্রান্সফার করে ট্রানজেকশন আইডি দিন।'}
                </p>
              </div>
            </div>
          ) : isBanglaQr ? (
            <div className="space-y-3">
              <p className="text-xs font-bold text-center text-white/90">
                যেকোনো ব্যাংকিং অ্যাপ থেকে কিউআর কোড স্ক্যান করে পেমেন্ট করুন
              </p>

              <div className="bg-white rounded-2xl p-4 text-gray-900 text-center max-w-[220px] mx-auto shadow-lg">
                {settings.banglaQrUrl ? (
                  <img
                    src={settings.banglaQrUrl}
                    alt="Bangla QR"
                    className="w-full h-auto aspect-square object-contain rounded-xl"
                  />
                ) : (
                  <div className="p-8 border border-dashed border-gray-300 rounded-xl">
                    <BanglaQRLogo />
                  </div>
                )}
                <span className="text-[11px] font-bold text-gray-600 mt-2 block">
                  বাংলা কিউআর পেমেন্ট
                </span>
              </div>

              <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                <div>
                  <span className="text-[11px] text-white/80 block">পরিশোধের পরিমাণ</span>
                  <span className="font-anek font-black text-xl text-white">৳ {toBn(planPrice)}.০০</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(String(planPrice), 'amount', 'টাকার পরিমাণ')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 ${
                    hasCopiedAmount
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {hasCopiedAmount ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>টাকা কপিড</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>টাকা কপি</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                  {currentMethodConfig.type || 'Personal'} Account
                </span>
                <h3 className="text-xs text-white/90">
                  নিচের নম্বরে <strong>Send Money</strong> করুন
                </h3>
              </div>

              <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                <div>
                  <span className="text-[11px] text-white/80 block">{currentMethodConfig.name} নম্বর</span>
                  <span className="font-anek font-black text-lg text-white select-all">
                    {currentMethodConfig.number}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(currentMethodConfig.number, 'mfs_num', 'নম্বর')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 ${
                    hasCopiedNumber
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {hasCopiedNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>নম্বর কপি</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                <div>
                  <span className="text-[11px] text-white/80 block">পরিশোধের পরিমাণ</span>
                  <span className="font-anek font-black text-xl text-white">৳ {toBn(planPrice)}.০০</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(String(planPrice), 'amount', 'টাকার পরিমাণ')}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 ${
                    hasCopiedAmount
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {hasCopiedAmount ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>টাকা কপিড</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>টাকা কপি</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-black/15 rounded-xl p-2.5 text-[11px] text-white/90 space-y-1">
                <p className="font-bold">
                  টাকা পাঠানোর নিয়ম:
                </p>
                <p className="text-[10px] text-white/80 leading-relaxed">
                  {currentMethodConfig.instruction || '১. অ্যাপে গিয়ে উপরে দেওয়া নম্বরে Send Money করুন। ২. ট্রানজেকশন সফল হলে ফিরতি মেসেজের TRXN ID নিয়ে পরবর্তী ধাপে দিন।'}
                </p>
              </div>
            </div>
          )}

          <p className="text-[10px] text-center text-white/80">
            Confirm and proceed, terms &amp; conditions
          </p>
        </div>

        <div className="p-4 bg-white  space-y-3">
          {!isPayReady && (
            <p className="text-[11px] font-semibold text-center text-amber-600  animate-fade-in flex items-center justify-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>
                {isBanglaQr
                  ? 'পরবর্তী ধাপে যেতে টাকার পরিমাণ কপি করুন'
                  : !hasCopiedNumber && !hasCopiedAmount
                  ? activeTab === 'bank' ? 'পরবর্তী ধাপে যেতে একাউন্ট নম্বর ও টাকা কপি করুন' : 'পরবর্তী ধাপে যেতে নম্বর ও টাকা উভয়টি কপি করুন'
                  : !hasCopiedNumber
                  ? activeTab === 'bank' ? 'পরবর্তী ধাপে যেতে একাউন্ট নম্বর কপি করুন' : 'পরবর্তী ধাপে যেতে নম্বরটি কপি করুন'
                  : 'পরবর্তী ধাপে যেতে টাকার পরিমাণ কপি করুন'}
              </span>
            </p>
          )}

          <div className="flex gap-2.5">
            <Button
              variant="secondary"
              size="large"
              type="button"
              onClick={handleCancelToGateway}
              className="w-1/2 font-bold text-xs text-gray-700 "
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="large"
              type="button"
              onClick={handleConfirmPay}
              showShimmer={isPayReady}
              className={`w-1/2 font-black text-sm transition-all select-none ${isPayShaking ? 'error-shake' : ''} ${
                isPayReady
                  ? `${currentTheme.btn} text-white shadow-md active:scale-95 cursor-pointer`
                  : '!bg-gray-200 hover:!bg-gray-200 dark:!bg-neutral-800 :!bg-neutral-800 !text-gray-400 dark:!text-gray-500 !shadow-none cursor-pointer active:scale-95 border border-gray-300/70 '
              }`}
            >
              Pay
            </Button>
          </div>

          <div className="pt-2 border-t border-gray-100  text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600  font-bold">
              <Phone className="w-3.5 h-3.5 text-pink-600" />
              <span>{currentTheme.helpline}</span>
            </div>
            <p className="text-[10px] text-gray-400">
              &copy; {new Date().getFullYear()} {currentMethodConfig?.name || appName}, All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

  return (
    <div className="w-full">
      {showHeader ? (
        <PageHeader
          title={props.serviceTitle || 'অনলাইন পেমেন্ট'}
          onBack={() => {
            hapticFeedback.light();
            if (onCancel) onCancel();
            else navigate(fallbackPath);
          }}
          fallbackPath={fallbackPath}
        />
      ) : (
        <div className="sticky top-0 z-20 bg-white  px-4 py-3 border-b border-gray-100  flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                hapticFeedback.light();
                if (onCancel) onCancel();
                else navigate(fallbackPath);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700  hover:bg-gray-100 :bg-white/10 active:scale-90 transition border-0 bg-transparent cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-black text-gray-900  tracking-tight">
              Online Payment
            </h1>
          </div>
        </div>
      )}

      <div className={showHeader ? "px-3 pt-3" : ""}>
        <div className={`max-w-md mx-auto w-full bg-white  rounded-3xl border border-black/[0.04]  shadow-sm overflow-hidden font-anek ${className}`}>
          <div className="px-4 pt-3 pb-2 border-b border-gray-100  flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {!showHeader && (
                <button
                  type="button"
                  onClick={() => {
                    hapticFeedback.light();
                    if (onCancel) onCancel();
                    else navigate(fallbackPath);
                  }}
                  className="text-gray-400 hover:text-gray-600 :text-gray-200 p-1 shrink-0 border-0 bg-transparent cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
          {appLogo && (
            <img
              src={appLogo}
              alt={appName}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
              className="w-8 h-8 rounded-xl object-contain shrink-0 shadow-2xs"
            />
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-black text-sm text-gray-900  truncate">
                {appName}
              </span>
              {verifiedBadge && (
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold shrink-0">
                  ✓
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 ">
              <span className="font-anek truncate">Trx ID: {invoiceRef}</span>
              <button
                type="button"
                onClick={() => handleCopyText(invoiceRef, 'trx_ref', 'রেফারেন্স আইডি')}
                className="text-gray-400 hover:text-gray-600 :text-gray-200 p-0.5 border-0 bg-transparent cursor-pointer"
              >
                {copiedKey === 'trx_ref' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          {timerBadge}
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        <div className="rounded-2xl bg-[#EEF4FF]  border border-blue-100  p-4 flex items-center justify-between gap-3 select-none">
          <div>
            <span className="text-xs text-gray-500  font-medium block">
              You are paying
            </span>
            {hasPlanSelector ? (
              <button
                type="button"
                onClick={() => {
                  hapticFeedback.selection();
                  setIsPayingDetailsOpen(!isPayingDetailsOpen);
                }}
                className="flex items-center gap-1 text-2xl font-black text-[#0F172A]  hover:opacity-80 transition border-0 bg-transparent p-0 cursor-pointer leading-tight mt-0.5"
              >
                <span>৳{toBn(planPrice)}.০০</span>
                {isPayingDetailsOpen ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
            ) : (
              <div className="text-2xl font-black text-[#0F172A]  leading-tight mt-0.5">
                ৳{toBn(planPrice)}.০০
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              hapticFeedback.selection();
              if (activeTab === 'bangla_qr') {
                setActiveTab('mobile');
              } else {
                setActiveTab('bangla_qr');
              }
            }}
            className={`px-3 py-1.5 rounded-xl border-[2px] transition-all flex items-center gap-2 cursor-pointer shadow-2xs active:scale-95 ${
              activeTab === 'bangla_qr'
                ? 'bg-[#EEF4FF]  border-[#0070E0] shadow-xs'
                : 'bg-white  border-gray-200/90  hover:border-gray-300'
            }`}
          >
            <span className="text-xs font-medium text-gray-600  whitespace-nowrap">
              Pay with
            </span>
            <BanglaQRLogo className="h-6 sm:h-7 w-auto object-contain shrink-0" />
          </button>
        </div>

        {hasPlanSelector && isPayingDetailsOpen && (
          <div className="p-4 rounded-2xl bg-gray-50  border border-gray-200/80  space-y-3 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 ">
              <span className="font-bold text-gray-700 ">
                মেয়াদ ভিত্তিক প্যাকেজ নির্বাচন
              </span>
              <span className="text-[11px] text-gray-500">প্যাকেজসমূহ</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {availablePlans.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => {
                      hapticFeedback.selection();
                      setSelectedPlanId(plan.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 '
                        : 'border-gray-200  bg-white '
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-gray-900 ">
                        {plan.label}
                      </span>
                      {plan.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100  text-amber-700 ">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 flex items-baseline justify-between">
                      <span className="font-black text-sm text-emerald-600 ">
                        ৳{toBn(plan.price)}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ৳{toBn(plan.originalPrice)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <SegmentedControl
          options={[
            { id: 'mobile', label: 'Mobile Banking', icon: <Smartphone className="w-3.5 h-3.5" /> },
            { id: 'bank', label: 'Net Banking', icon: <Building2 className="w-3.5 h-3.5" /> },
            { id: 'bangla_qr', label: 'Bangla QR', icon: <QrCode className="w-3.5 h-3.5" /> }
          ]}
          activeId={activeTab}
          onChange={(id) => {
            hapticFeedback.selection();
            const nextTab = id as 'mobile' | 'bank' | 'bangla_qr';
            setActiveTab(nextTab);
            handleSelectChannel('');
          }}
          size="sm"
          color="blue"
        />

        {(() => {
          const allMobileChannels = [
            { id: 'bkash', logo: <BKashLogo className="max-h-[38px] sm:max-h-[42px] max-w-[85%] object-contain" /> },
            { id: 'nagad', logo: <NagadLogo className="max-h-[34px] sm:max-h-[38px] max-w-[82%] object-contain" /> },
            { id: 'rocket', logo: <RocketLogo className="max-h-[38px] sm:max-h-[42px] max-w-[82%] object-contain" /> },
            { id: 'upay', logo: <UpayLogo className="max-h-[42px] sm:max-h-[46px] max-w-[70%] object-contain" /> },
            { id: 'cellfin', logo: <CellfinLogo className="max-h-[32px] sm:max-h-[36px] max-w-[88%] object-contain" /> },
            { id: 'mcash', logo: <MCashLogo className="max-h-[38px] sm:max-h-[42px] max-w-[80%] object-contain" /> },
            { id: 'nexus_pay', logo: <NexusPayLogo className="max-h-[40px] sm:max-h-[44px] max-w-[65%] object-contain rounded-xl" /> }
          ];

          const activeMobileChannels = allMobileChannels.filter(
            (item) => settings?.methods?.[item.id]?.isActive === true
          );

          const allBankChannels = [
            { id: 'dbbl', name: 'Dutch-Bangla', logo: <DBBLLogo className="h-8 w-auto max-w-full object-contain" /> },
            { id: 'ibbl', name: 'Islami Bank', logo: <IBBLLogo className="h-8 w-auto max-w-full object-contain" /> },
            { id: 'agrani', name: 'Agrani Bank', logo: <AgraniBankLogo className="h-8 w-auto max-w-full object-contain" /> }
          ];

          const activeBankChannels = allBankChannels.filter(
            (item) => settings?.banks?.[item.id as BankId]?.isActive === true
          );

          const isChannelSelected =
            (activeTab === 'mobile' && Boolean(selectedChannelId && activeMobileChannels.some((c) => c.id === selectedChannelId))) ||
            (activeTab === 'bank' && Boolean(selectedChannelId && activeBankChannels.some((c) => c.id === selectedChannelId))) ||
            (activeTab === 'bangla_qr' && Boolean(settings?.banglaQrUrl));

          return (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-bold text-gray-600 ">
                  {activeTab === 'mobile' && 'Pay with Mobile Banking'}
                  {activeTab === 'bank' && 'Pay with Bank'}
                  {activeTab === 'bangla_qr' && 'Pay with Bangla QR'}
                </div>
                {channelError && (
                  <span className="text-[11px] font-bold text-rose-500  flex items-center gap-1 animate-fade-in shrink-0">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {channelError}
                  </span>
                )}
              </div>

              {activeTab === 'mobile' && (
                !isSettingsLoaded ? (
                  <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                    {[1, 2, 3, 4].map((n) => (
                      <Skeleton
                        key={n}
                        type="paymentChannel"
                        className="h-[68px] sm:h-[74px]"
                      />
                    ))}
                  </div>
                ) : activeMobileChannels.length > 0 ? (
                  <div className={`grid grid-cols-4 gap-2 sm:gap-2.5 transition-all ${isChannelShaking ? 'error-shake' : ''}`}>
                    {activeMobileChannels.map((item) => (
                      <PaymentChannelCard
                        key={item.id}
                        id={item.id}
                        logo={item.logo}
                        isSelected={selectedChannelId === item.id}
                        onClick={() => handleSelectChannel(item.id)}
                        className="h-[68px] sm:h-[74px] p-2"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-7 px-4 text-center rounded-2xl bg-gray-50  border border-dashed border-gray-200  space-y-1.5">
                    <div className="w-9 h-9 mx-auto rounded-full bg-amber-50  text-amber-600  flex items-center justify-center text-sm">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-gray-700 ">
                      বর্তমানে কোনো মোবাইল ব্যাংকিং চ্যানেল সক্রিয় নেই
                    </p>
                    <p className="text-[11px] text-gray-400">
                      অন্য পেমেন্ট অপশন নির্বাচন করুন
                    </p>
                  </div>
                )
              )}

              {activeTab === 'bank' && (
                !isSettingsLoaded ? (
                  <div className="grid grid-cols-3 gap-2.5">
                    {[1, 2, 3].map((n) => (
                      <Skeleton
                        key={n}
                        type="paymentChannel"
                        className="h-[76px] sm:h-[82px]"
                      />
                    ))}
                  </div>
                ) : activeBankChannels.length > 0 ? (
                  <div className={`grid grid-cols-3 gap-2.5 transition-all ${isChannelShaking ? 'error-shake' : ''}`}>
                    {activeBankChannels.map((item) => (
                      <PaymentChannelCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        logo={item.logo}
                        isSelected={selectedChannelId === item.id}
                        onClick={() => handleSelectChannel(item.id)}
                        className="h-[76px] sm:h-[82px] p-2"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-7 px-4 text-center rounded-2xl bg-gray-50  border border-dashed border-gray-200  space-y-1.5">
                    <div className="w-9 h-9 mx-auto rounded-full bg-amber-50  text-amber-600  flex items-center justify-center text-sm">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-gray-700 ">
                      বর্তমানে কোনো ব্যাংক একাউন্ট সক্রিয় নেই
                    </p>
                    <p className="text-[11px] text-gray-400">
                      অন্য পেমেন্ট অপশন নির্বাচন করুন
                    </p>
                  </div>
                )
              )}

              {activeTab === 'bangla_qr' && (
                !isSettingsLoaded ? (
                  <div className="p-4 rounded-2xl bg-gray-50  border border-gray-200  text-center space-y-3">
                    <Skeleton className="w-[180px] h-[180px] mx-auto rounded-2xl" />
                    <Skeleton className="h-4 w-32 mx-auto rounded-full" />
                  </div>
                ) : settings.banglaQrUrl ? (
                  <div className={`p-4 rounded-2xl bg-gray-50  border border-gray-200  text-center space-y-3 animate-fade-in ${isChannelShaking ? 'error-shake' : ''}`}>
                    <div className="max-w-[200px] mx-auto bg-white p-3 rounded-2xl border border-gray-300 shadow-md">
                      <img
                        src={settings.banglaQrUrl}
                        alt="Bangla QR"
                        className="w-full h-auto aspect-square object-contain rounded-xl"
                      />
                      <div className="mt-2 flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                        <span>বাংলা কিউআর সক্রিয়</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600  font-medium">
                      বিকাশ, নগদ, সেলফিন, রকেট বা যেকোনো ব্যাংক অ্যাপের QR Scanner দিয়ে স্ক্যান করে টাকা পরিশোধ করুন।
                    </p>
                  </div>
                ) : (
                  <div className="py-7 px-4 text-center rounded-2xl bg-gray-50  border border-dashed border-gray-200  space-y-1.5">
                    <div className="w-9 h-9 mx-auto rounded-full bg-amber-50  text-amber-600  flex items-center justify-center text-sm">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold text-gray-700 ">
                      বাংলা কিউআর পেমেন্ট বর্তমানে সক্রিয় নেই
                    </p>
                    <p className="text-[11px] text-gray-400">
                      অন্য পেমেন্ট অপশন নির্বাচন করুন
                    </p>
                  </div>
                )
              )}

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="large"
                  type="button"
                  onClick={handleProceedToPayStep}
                  className={`w-full !bg-[#0070E0] hover:!bg-[#005CA9] text-white font-black text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all select-none ${
                    !isChannelSelected ? 'opacity-50' : ''
                  } ${isPayShaking ? 'error-shake' : ''}`}
                >
                  Pay ৳{toBn(planPrice)}.০০
                </Button>
              </div>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed px-2">
                By clicking the &quot;Pay&quot; button you agree to our Terms of Service which is limited to facilitating your payment to {appName}.
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  </div>
</div>
);
}


