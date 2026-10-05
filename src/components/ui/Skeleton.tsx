import React from 'react';

interface SkeletonBaseProps {
  className?: string;
  style?: React.CSSProperties;
}

const SkeletonBase: React.FC<SkeletonBaseProps> = ({ className = "", style = {} }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200  rounded-xl transition-colors duration-300 ${className}`}
      style={style}
    />
  );
};

const SkeletonCard: React.FC = () => {
  return (
    <div className="donor-card-animated w-full h-full flex flex-col gap-2 p-4 rounded-2xl text-left border-l-[5px] bg-white  shadow-[0_4px_20px_rgba(0,0,0,0.03)]   border-l-gray-300  border border-gray-100 ">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <SkeletonBase className="w-12 h-12 rounded-2xl border-2 border-white  shadow-sm shrink-0" />
          <div className="space-y-2 flex-1">
            <SkeletonBase className="h-5 w-32" />
            <SkeletonBase className="h-3 w-24 mt-1" />
          </div>
        </div>
        <SkeletonBase className="h-6 w-12 rounded-2xl shrink-0 shadow-sm" />
      </div>

      <SkeletonBase className="h-8 w-full rounded-lg shadow-sm" />

      <div className="flex items-center gap-1.5 mt-1">
        <SkeletonBase className="w-4 h-4 rounded shrink-0" />
        <SkeletonBase className="h-4 w-3/4 rounded" />
      </div>
      
      <div className="flex items-center gap-1.5">
        <SkeletonBase className="w-4 h-4 rounded shrink-0" />
        <SkeletonBase className="h-4 w-1/2 rounded" />
      </div>
      
      <div className="flex items-center gap-1.5">
        <SkeletonBase className="w-4 h-4 rounded shrink-0" />
        <SkeletonBase className="h-4 w-5/6 rounded" />
      </div>
      
      <div className="flex items-center gap-1.5">
        <SkeletonBase className="w-4 h-4 rounded shrink-0" />
        <SkeletonBase className="h-4 w-2/3 rounded" />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-gray-100 ">
        <SkeletonBase className="h-9 w-full rounded-xl shadow-sm" />
        <SkeletonBase className="h-9 w-full rounded-xl shadow-sm" />
      </div>
    </div>
  );
};

const SkeletonReview: React.FC = () => {
  return (
    <div className="bg-white  rounded-[1.25rem] p-5 shadow-sm border border-gray-100  mb-3 transition-colors duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <SkeletonBase className="w-12 h-12 rounded-full shrink-0" />
          <div className="space-y-2">
            <SkeletonBase className="h-4 w-24" />
            <SkeletonBase className="h-3 w-16" />
          </div>
        </div>
        <SkeletonBase className="h-5 w-16 rounded-lg" />
      </div>
      <div className="mt-4 bg-gray-50  rounded-2xl rounded-tl-sm p-4 border border-gray-100/80 ">
        <div className="space-y-2">
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-5/6" />
          <SkeletonBase className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
};

const SkeletonProfile: React.FC = () => {
  return (
    <div className="container mx-auto max-w-xl p-2 pb-24 mt-4">
      <div className="relative">
        <div className="glass-panel p-0 rounded-3xl overflow-hidden mb-5 shadow-sm border border-gray-100  bg-white/80 ">
          <div className="relative bg-gray-50/80  p-6 pb-6 border-b border-gray-100 ">
             <div className="flex flex-col items-center mt-4">
                <SkeletonBase className="w-[104px] h-[104px] rounded-full mb-3 shadow-sm" />
                <SkeletonBase className="h-6 w-48 mb-3" />
                <div className="flex flex-col items-center gap-2 mb-5">
                   <div className="flex items-center gap-2">
                     <SkeletonBase className="w-16 h-7 rounded-full" />
                     <SkeletonBase className="w-24 h-7 rounded-full" />
                   </div>
                   <SkeletonBase className="h-5 w-32 mt-2" />
                </div>
             </div>
          </div>
          <div className="px-5 py-2 flex flex-col divide-y divide-gray-100/80 ">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3.5 w-full">
                  <SkeletonBase className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="flex flex-col gap-2 w-full pr-8">
                     <SkeletonBase className="h-3 w-16" />
                     <SkeletonBase className="h-4 w-32" />
                  </div>
                </div>
                <SkeletonBase className="w-8 h-8 rounded-xl shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonNotice: React.FC = () => {
  return (
    <div className="bg-white  rounded-xl p-4 flex gap-4 shadow-sm border border-gray-100 ">
      <SkeletonBase className="w-12 h-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <SkeletonBase className="h-4 rounded w-3/4" />
        <SkeletonBase className="h-3 rounded w-full" />
        <SkeletonBase className="h-3 rounded w-1/4 mt-2" />
      </div>
    </div>
  );
};

const SkeletonNoticeDetail: React.FC = () => {
  return (
    <div className="bg-white  rounded-3xl shadow-sm border border-gray-100  overflow-hidden">
      <SkeletonBase className="w-full h-48 !rounded-none" />
      <div className="p-5 space-y-4">
        <SkeletonBase className="h-6 w-3/4 rounded-lg" />
        <SkeletonBase className="h-4 w-32 rounded-md" />
        <div className="space-y-2 mt-4">
          <SkeletonBase className="h-4 w-full rounded" />
          <SkeletonBase className="h-4 w-full rounded" />
          <SkeletonBase className="h-4 w-2/3 rounded" />
        </div>
      </div>
    </div>
  );
};

const SkeletonGenerateCard: React.FC = () => {
  return (
    <div className="p-4 max-w-md mx-auto w-full">
       <div className="flex flex-col gap-6 mt-2">
          <div className="space-y-3">
            <SkeletonBase className="h-4 w-28 mx-auto" />
            <div className="flex gap-3 justify-center">
              <SkeletonBase className="h-24 w-[30%] rounded-xl shadow-sm" />
              <SkeletonBase className="h-24 w-[30%] rounded-xl shadow-sm" />
              <SkeletonBase className="h-24 w-[30%] rounded-xl shadow-sm" />
            </div>
          </div>
          <div className="space-y-3 mt-2">
             <SkeletonBase className="h-4 w-28 mx-auto" />
             <div className="flex gap-3 justify-center max-w-[200px] mx-auto">
                <SkeletonBase className="h-10 flex-1 rounded-xl" />
                <SkeletonBase className="h-10 flex-1 rounded-xl" />
             </div>
          </div>
          <div className="mt-6">
             <SkeletonBase className="w-full aspect-[9/16] max-h-[500px] rounded-2xl shadow-md mx-auto" />
          </div>
          <SkeletonBase className="h-12 w-full rounded-xl mt-4 max-w-[250px] mx-auto" />
       </div>
    </div>
  );
};

const SkeletonSetting: React.FC = () => {
  return (
    <div className="bg-white  rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100  p-4 transition-colors duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <SkeletonBase className="w-6 h-6 rounded-md shrink-0" />
          <SkeletonBase className="h-5 w-32 rounded-md" />
        </div>
        <SkeletonBase className="w-5 h-5 rounded-full shrink-0" />
      </div>
    </div>
  );
};

const SkeletonNewsCard: React.FC = () => {
  return (
    <div className="bg-white  rounded-2xl overflow-hidden border border-black/[0.05]  shadow-[0_2px_12px_rgba(0,0,0,0.03)] (0,0,0,0.4)] p-3 space-y-3">
      <SkeletonBase className="w-full aspect-video rounded-xl" />
      <div className="flex items-center justify-between">
        <SkeletonBase className="h-5 w-20 rounded-md" />
        <SkeletonBase className="h-4 w-16 rounded" />
      </div>
      <div className="space-y-1.5">
        <SkeletonBase className="h-5 w-full rounded" />
        <SkeletonBase className="h-5 w-3/4 rounded" />
      </div>
      <div className="space-y-1">
        <SkeletonBase className="h-3.5 w-full rounded" />
        <SkeletonBase className="h-3.5 w-4/5 rounded" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] ">
        <SkeletonBase className="h-8 w-24 rounded-lg" />
        <SkeletonBase className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

const SkeletonSlider: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full aspect-[1280/700] sm:aspect-[16/9] md:aspect-[16/9.5] max-h-[320px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.04]  gemini-loader-bg select-none ${className}`}>
      <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-cyan-400/25 via-indigo-500/25 to-purple-500/20 blur-2xl animate-aurora-float pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-gradient-to-bl from-purple-500/25 via-pink-500/20 to-indigo-500/20 blur-2xl animate-aurora-float-reverse pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35  to-transparent animate-gemini-sweep pointer-events-none" />
    </div>
  );
};

const SkeletonServiceCard: React.FC = () => {
  return (
    <div className="donor-card-animated h-full flex flex-col gap-2 p-4 rounded-2xl text-left border-l-[5px] border-l-gray-300  bg-white  shadow-[0_4px_20px_rgba(0,0,0,0.03)] (0,0,0,0.35)] border border-gray-100 ">
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <SkeletonBase className="w-12 h-12 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBase className="h-4 rounded-md w-2/3" />
            <SkeletonBase className="h-3 rounded-md w-1/3" />
          </div>
        </div>
        <SkeletonBase className="w-16 h-6 rounded-2xl shrink-0" />
      </div>
      <div className="space-y-2 mt-2">
        <SkeletonBase className="h-3.5 rounded-md w-3/4" />
        <SkeletonBase className="h-3.5 rounded-md w-1/2" />
      </div>
      <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-gray-100 ">
        <div className="flex gap-2">
          <SkeletonBase className="flex-1 h-[42px] rounded-xl" />
          <SkeletonBase className="flex-1 h-[42px] rounded-xl" />
        </div>
        <div className="flex gap-2">
          <SkeletonBase className="flex-1 h-[38px] rounded-xl" />
          <SkeletonBase className="flex-1 h-[38px] rounded-xl" />
          <SkeletonBase className="w-[42px] h-[38px] rounded-xl shrink-0" />
        </div>
      </div>
    </div>
  );
};

const SkeletonLostFoundCard: React.FC = () => {
  return (
    <div className="donor-card-animated w-full h-full flex flex-col gap-3 p-4 rounded-2xl sm:rounded-3xl text-left border-l-[5px] border-l-gray-300  bg-white  shadow-[0_4px_20px_rgba(0,0,0,0.03)] (0,0,0,0.35)] border border-gray-100 ">
      <div className="flex justify-between items-start gap-2">
        <SkeletonBase className="w-24 h-6 rounded-2xl" />
        <SkeletonBase className="w-20 h-4 rounded-md" />
      </div>
      <div className="flex items-center gap-3">
        <SkeletonBase className="w-8 h-8 rounded-xl shrink-0" />
        <div className="space-y-1.5 flex-1">
          <SkeletonBase className="h-4 rounded w-1/2" />
          <SkeletonBase className="h-3 rounded w-1/3" />
        </div>
      </div>
      <div className="p-3 rounded-2xl bg-gray-50  space-y-2 border border-black/[0.04] ">
        <SkeletonBase className="h-4 rounded w-2/3" />
        <SkeletonBase className="h-3 rounded w-full" />
      </div>
      <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 ">
        <SkeletonBase className="flex-1 h-[42px] rounded-xl" />
        <SkeletonBase className="flex-1 h-[42px] rounded-xl" />
        <SkeletonBase className="w-[42px] h-[42px] rounded-xl shrink-0" />
      </div>
    </div>
  );
};

const SkeletonHouseRentCard: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-white  border border-black/[0.04]  space-y-3">
      <div className="flex gap-3">
        <SkeletonBase className="w-24 h-24 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <SkeletonBase className="h-4 rounded-md w-3/4" />
          <SkeletonBase className="h-3 rounded-md w-1/2" />
          <SkeletonBase className="h-3 rounded-md w-2/3" />
        </div>
      </div>
    </div>
  );
};

const SkeletonMunAlertCard: React.FC = () => {
  return (
    <div className="bg-white  rounded-3xl overflow-hidden border border-gray-100  shadow-xs flex flex-col">
      <SkeletonBase className="w-full h-64 sm:h-60 !rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonBase className="h-5 rounded w-3/4" />
        <SkeletonBase className="h-4 rounded w-1/2" />
        <SkeletonBase className="h-4 rounded w-full" />
        <SkeletonBase className="h-4 rounded w-2/3" />
        <SkeletonBase className="h-10 rounded-xl w-full mt-2" />
      </div>
    </div>
  );
};

const SkeletonMunAlertReport: React.FC = () => {
  return (
    <div className="bg-white  rounded-3xl p-5 border border-gray-100  shadow-xs space-y-4">
      <div className="flex gap-2">
        <SkeletonBase className="h-6 w-16 rounded-full" />
        <SkeletonBase className="h-6 w-20 rounded-full" />
      </div>
      <SkeletonBase className="w-full h-72 sm:h-80 rounded-3xl" />
      <div className="space-y-2">
        <SkeletonBase className="h-7 w-1/2 rounded-lg" />
        <SkeletonBase className="h-4 w-1/3 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50  rounded-2xl border border-black/[0.04] ">
        <SkeletonBase className="h-10 rounded" />
        <SkeletonBase className="h-10 rounded" />
        <SkeletonBase className="h-10 col-span-2 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <SkeletonBase className="h-12 rounded-2xl" />
        <SkeletonBase className="h-12 rounded-2xl" />
      </div>
    </div>
  );
};

const SkeletonContact: React.FC = () => {
  return (
    <div className="h-20 bg-white  rounded-2xl w-full border border-gray-100  shadow-sm flex items-center px-4 gap-4">
      <SkeletonBase className="w-12 h-12 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBase className="h-4 rounded w-1/2" />
        <SkeletonBase className="h-3 rounded w-1/3" />
      </div>
    </div>
  );
};

const SkeletonExport: React.FC = () => {
  return (
    <div className="w-full max-w-[794px] mx-auto bg-white  rounded-2xl shadow-sm border border-gray-100  p-8 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-gray-100  pb-4 mb-2">
        <SkeletonBase className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-2 items-center">
          <SkeletonBase className="w-48 h-6 rounded" />
          <SkeletonBase className="w-32 h-4 rounded" />
        </div>
        <SkeletonBase className="w-12 h-12 rounded-full" />
      </div>
      <SkeletonBase className="w-full h-8 rounded mt-2" />
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex gap-2 w-full h-10">
          <SkeletonBase className="w-10 rounded" />
          <SkeletonBase className="flex-1 rounded" />
          <SkeletonBase className="w-20 rounded" />
          <SkeletonBase className="w-24 rounded" />
        </div>
      ))}
    </div>
  );
};

const SkeletonAyahCard: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 rounded-3xl border bg-white  border-gray-100  shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 ">
        <SkeletonBase className="h-7 w-20 rounded-full" />
        <div className="flex items-center gap-2">
          <SkeletonBase className="w-8 h-8 rounded-full" />
          <SkeletonBase className="w-8 h-8 rounded-full" />
          <SkeletonBase className="w-8 h-8 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2 py-2">
        <SkeletonBase className="h-6 w-full max-w-[90%] rounded-lg" />
        <SkeletonBase className="h-6 w-3/4 rounded-lg" />
      </div>
      <div className="space-y-2 pt-1">
        <SkeletonBase className="h-4 w-4/5 rounded-md" />
        <SkeletonBase className="h-4 w-2/3 rounded-md" />
      </div>
      <div className="space-y-2 pt-1">
        <SkeletonBase className="h-4 w-full rounded-md" />
        <SkeletonBase className="h-4 w-5/6 rounded-md" />
      </div>
    </div>
  );
};

const SkeletonPrayerSchedule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="p-5 sm:p-6 rounded-3xl bg-white  border border-gray-100  shadow-xs space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <SkeletonBase className="w-12 h-12 rounded-2xl" />
            <div className="space-y-2">
              <SkeletonBase className="h-5 w-24 rounded-md" />
              <SkeletonBase className="h-4 w-32 rounded-md" />
            </div>
          </div>
          <SkeletonBase className="h-7 w-20 rounded-full" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <SkeletonBase className="h-10 w-28 rounded-xl" />
          <SkeletonBase className="h-8 w-24 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-white  border border-gray-100  shadow-xs space-y-2">
          <SkeletonBase className="w-8 h-8 rounded-xl" />
          <SkeletonBase className="h-4 w-20 rounded-md" />
          <SkeletonBase className="h-6 w-16 rounded-md" />
        </div>
        <div className="p-4 rounded-2xl bg-white  border border-gray-100  shadow-xs space-y-2">
          <SkeletonBase className="w-8 h-8 rounded-xl" />
          <SkeletonBase className="h-4 w-20 rounded-md" />
          <SkeletonBase className="h-6 w-16 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="p-3.5 rounded-2xl bg-white  border border-gray-100  shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <SkeletonBase className="w-9 h-9 rounded-xl" />
              <SkeletonBase className="h-4 w-14 rounded-md" />
            </div>
            <SkeletonBase className="h-4 w-12 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

const SkeletonRamadanSchedule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="p-5 sm:p-6 rounded-3xl bg-white  border border-gray-100  shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <SkeletonBase className="h-7 w-28 rounded-full" />
          <SkeletonBase className="h-6 w-20 rounded-md" />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <SkeletonBase className="h-16 rounded-2xl" />
          <SkeletonBase className="h-16 rounded-2xl" />
        </div>
      </div>
      <div className="bg-white  rounded-3xl p-4 border border-gray-100  shadow-xs space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 ">
          <SkeletonBase className="h-5 w-24 rounded-md" />
          <SkeletonBase className="h-5 w-24 rounded-md" />
          <SkeletonBase className="h-5 w-24 rounded-md" />
        </div>
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="flex justify-between items-center py-2">
            <SkeletonBase className="h-4 w-16 rounded-md" />
            <SkeletonBase className="h-4 w-20 rounded-md" />
            <SkeletonBase className="h-4 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

const SkeletonDuaCard: React.FC = () => {
  return (
    <div className="bg-white  rounded-3xl p-5 border border-gray-100  shadow-xs space-y-3.5">
      <div className="flex items-center justify-between">
        <SkeletonBase className="h-6 w-32 rounded-full" />
        <SkeletonBase className="w-8 h-8 rounded-full" />
      </div>
      <div className="p-4 rounded-2xl bg-gray-50  space-y-2 border border-black/[0.03] ">
        <SkeletonBase className="h-5 w-full rounded" />
        <SkeletonBase className="h-5 w-3/4 ml-auto rounded" />
      </div>
      <div className="space-y-1.5 pt-1">
        <SkeletonBase className="h-4 w-full rounded" />
        <SkeletonBase className="h-4 w-5/6 rounded" />
      </div>
      <div className="space-y-1.5 pt-1 border-t border-gray-100 ">
        <SkeletonBase className="h-4 w-4/5 rounded" />
        <SkeletonBase className="h-4 w-2/3 rounded" />
      </div>
    </div>
  );
};

const SkeletonForm: React.FC = () => {
  return (
    <div className="bg-white  p-6 rounded-2xl shadow-sm border border-gray-100  space-y-4">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="space-y-2">
          <SkeletonBase className="h-4 w-28 rounded-md" />
          <SkeletonBase className="h-12 w-full rounded-xl" />
        </div>
      ))}
      <SkeletonBase className="h-12 w-full rounded-xl mt-4" />
    </div>
  );
};

const SkeletonPaymentCard: React.FC = () => {
  return (
    <div className="bg-white  rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-gray-100  shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonBase className="h-6 w-1/3 rounded-xl" />
        <SkeletonBase className="h-5 w-1/4 rounded-md" />
      </div>
      <SkeletonBase className="h-16 w-full rounded-2xl" />
      <SkeletonBase className="h-10 w-full rounded-xl" />
    </div>
  );
};

const SkeletonPaymentChannel: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`p-2 rounded-2xl border border-gray-100  bg-white  shadow-2xs flex flex-col items-center justify-center gap-1.5 ${className}`}>
      <SkeletonBase className="w-8 h-8 rounded-xl shrink-0" />
      <SkeletonBase className="h-3 w-12 rounded-md" />
    </div>
  );
};

const SkeletonAdminPage: React.FC = () => {
  return (
    <div className="px-3 sm:px-4 lg:px-8 pt-4 pb-20 space-y-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 ">
        <SkeletonBase className="h-8 w-44 rounded-xl" />
        <SkeletonBase className="h-8 w-24 rounded-xl" />
      </div>
      <SkeletonBase className="h-10 w-full sm:w-80 rounded-xl" />
      <div className="space-y-3 pt-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-white  border border-gray-100  shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <SkeletonBase className="w-10 h-10 rounded-xl shrink-0" />
              <div className="space-y-2 flex-1">
                <SkeletonBase className="h-4 rounded-md w-1/3" />
                <SkeletonBase className="h-3 rounded-md w-1/2" />
              </div>
            </div>
            <SkeletonBase className="w-16 h-8 rounded-xl shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

const SkeletonComplaintCard: React.FC = () => {
  return (
    <div className="bg-white  rounded-2xl p-4 shadow-xs border border-gray-100  flex flex-col justify-between space-y-3">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <SkeletonBase className="w-10 h-10 rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1">
              <SkeletonBase className="h-4 w-28 rounded-md" />
              <SkeletonBase className="h-3 w-20 rounded-md" />
            </div>
          </div>
          <SkeletonBase className="w-8 h-8 rounded-full shrink-0" />
        </div>
        <div className="rounded-xl p-3 border border-gray-100  bg-gray-50  space-y-2">
          <SkeletonBase className="h-3.5 w-full rounded" />
          <SkeletonBase className="h-3.5 w-4/5 rounded" />
          <SkeletonBase className="h-3.5 w-2/3 rounded" />
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 ">
        <SkeletonBase className="h-3 w-20 rounded" />
        <SkeletonBase className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
};

export default function Skeleton({ type, ...props }: { type?: string; [key: string]: any }) {
  if (type === 'card') return <SkeletonCard />;
  if (type === 'review') return <SkeletonReview />;
  if (type === 'profile') return <SkeletonProfile />;
  if (type === 'notice') return <SkeletonNotice />;
  if (type === 'noticeDetail') return <SkeletonNoticeDetail />;
  if (type === 'generateCard') return <SkeletonGenerateCard />;
  if (type === 'setting') return <SkeletonSetting />;
  if (type === 'news') return <SkeletonNewsCard />;
  if (type === 'slider') return <SkeletonSlider {...props} />;
  if (type === 'serviceCard') return <SkeletonServiceCard />;
  if (type === 'lostFound') return <SkeletonLostFoundCard />;
  if (type === 'houseRent') return <SkeletonHouseRentCard />;
  if (type === 'munAlertCard') return <SkeletonMunAlertCard />;
  if (type === 'munAlertReport') return <SkeletonMunAlertReport />;
  if (type === 'contact') return <SkeletonContact />;
  if (type === 'export') return <SkeletonExport />;
  if (type === 'ayah' || type === 'quranAyah') return <SkeletonAyahCard />;
  if (type === 'prayerSchedule') return <SkeletonPrayerSchedule />;
  if (type === 'ramadanSchedule') return <SkeletonRamadanSchedule />;
  if (type === 'dua' || type === 'duaCard') return <SkeletonDuaCard />;
  if (type === 'form') return <SkeletonForm />;
  if (type === 'paymentCard') return <SkeletonPaymentCard />;
  if (type === 'paymentChannel') return <SkeletonPaymentChannel {...props} />;
  if (type === 'adminPage') return <SkeletonAdminPage />;
  if (type === 'complaint' || type === 'complaintCard' || type === 'feedbackCard') return <SkeletonComplaintCard />;
  return <SkeletonBase {...props} />;
}






