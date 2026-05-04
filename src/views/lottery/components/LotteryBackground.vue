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

    <!-- منطقة الشعار في الجزء العلوي وبحجم مناسب -->
    <div
      class="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center w-64 md:w-96"
    >
      <!-- هالة ضوئية خفيفة خلف الشعار -->
      <div class="absolute inset-0 bg-gold-500/30 blur-[60px] rounded-full animate-glow"></div>

      <!-- الشعار -->
      <img
        src="/MainLogo.png"
        alt="Event Logo"
        class="relative z-20 w-full h-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-float"
      />
    </div>

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

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
