<!--src\views\lottery\components\LotteryBackground.vue-->
<template>
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020617]">
    <!-- إضاءة المسرح الخلفية (Spotlights) -->
    <div
      class="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-gold-600/20 rounded-full blur-[150px] animate-pulse-slow"
    ></div>
    <div
      class="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-amber-600/20 rounded-full blur-[150px] animate-pulse-slow animation-delay-2000"
    ></div>

    <!-- أشعة الضوء الدوارة (Rays) - تركناها في المنتصف لتضيء خلفية الروليت -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[1500px] max-h-[1500px] opacity-10 animate-spin-slow pointer-events-none"
    >
      <div class="w-full h-full bg-rays"></div>
    </div>

    <!-- جزيئات الغبار المضيئة (Particles) -->
    <div
      class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-drift"
    ></div>

    <!-- شبكة خلفية خفيفة (Grid) -->
    <div
      class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"
    ></div>

    <!-- --- منطقة الشعارات العلوية (تم التعديل لعرض 3 شعارات) --- -->
    <div
      class="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-10 md:gap-16 w-full max-w-5xl px-4"
    >
      <!-- هالة ضوئية خفيفة خلف الشعارات -->
      <div class="absolute inset-0 bg-gold-500/20 blur-[80px] rounded-full animate-glow"></div>

      <!-- الشعار الأيمن (Right Logo) -->
      <!-- عدل src لمسار الشعار الأيمن -->
      <img
        src="/RightLogo.png"
        alt="Sponsor Logo Right"
        class="relative z-20 w-32 md:w-48 h-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] animate-float animation-delay-1000"
      />

      <!-- الشعار الرئيسي (Center Logo) - الحجم الأكبر -->
      <img
        src="/MainLogo.png"
        alt="Event Logo"
        class="relative z-20 w-48 md:w-80 h-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-float pr-2"
      />

      <!-- الشعار الأيسر (Left Logo) -->
      <!-- عدل src لمسار الشعار الأيسر -->
      <img
        src="/LeftLogo.png"
        alt="Sponsor Logo Left"
        class="relative z-20 w-24 md:w-32 h-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] animate-float animation-delay-2000"
      />
    </div>
    <!-- -------------------------------------------------------- -->

    <!-- تدرجات ناعمة للحواف لدمج الخلفية مع محتوى الصفحة -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-transparent opacity-60"
    ></div>
  </div>
</template>

<style scoped>
/* تصميم أشعة الضوء الدائرية */
.bg-rays {
  background: repeating-conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 10deg,
    rgba(251, 191, 36, 0.15) 10deg,
    rgba(251, 191, 36, 0.15) 20deg
  );
  border-radius: 50%;
  mask-image: radial-gradient(circle, black 20%, transparent 60%);
  -webkit-mask-image: radial-gradient(circle, black 20%, transparent 60%);
}

/* --- الحركات المخصصة (Animations) --- */

/* دوران بطيء للأشعة */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 90s linear infinite;
}

/* نبض الكشافات السفلية */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite alternate;
}

/* توهج النبض خلف الشعار */
@keyframes glow {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}
.animate-glow {
  animation: glow 4s ease-in-out infinite;
}

/* طفو الشعار للأعلى والأسفل بسلاسة */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* حركة الجزيئات (Stardust) */
@keyframes drift {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 200px 200px;
  }
}
.animate-drift {
  animation: drift 30s linear infinite;
}

/* تأخير الحركات للشعارات الجانبية لتبدو عشوائية وجميلة */
.animation-delay-1000 {
  animation-delay: 1s;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
