<!--src\views\clients\QrDisplayView.vue-->
<template>
  <div
    class="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#020617]"
  >
    <!-- ================= الخلفية والمؤثرات (من LotteryBackground) ================= -->
    <div
      class="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-amber-600/20 rounded-full blur-[150px] animate-pulse-bg-slow"
    ></div>
    <div
      class="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-amber-500/20 rounded-full blur-[150px] animate-pulse-bg-slow animation-delay-2000"
    ></div>

    <!-- أشعة الضوء الدوارة -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[1500px] max-h-[1500px] opacity-10 animate-spin-slow pointer-events-none"
    >
      <div class="w-full h-full bg-rays"></div>
    </div>

    <!-- جزيئات الغبار المضيئة والشبكة -->
    <div
      class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-drift pointer-events-none"
    ></div>
    <div
      class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"
    ></div>

    <div
      class="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80 pointer-events-none"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-transparent opacity-60 pointer-events-none"
    ></div>

    <!-- ================= منطقة الشعارات العلوية ================= -->
    <div
      class="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-10 md:gap-16 w-full max-w-5xl px-4 pointer-events-none"
    >
      <div class="absolute inset-0 bg-amber-500/20 blur-[80px] rounded-full animate-glow"></div>
      <img
        src="/RightLogo.png"
        alt="Sponsor Logo Right"
        class="relative z-20 w-24 md:w-40 h-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] animate-float animation-delay-1000"
      />
      <img
        src="/MainLogo.png"
        alt="Event Logo"
        class="relative z-20 w-40 md:w-64 h-auto drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-float pr-2"
      />
      <img
        src="/LeftLogo.png"
        alt="Sponsor Logo Left"
        class="relative z-20 w-20 md:w-32 h-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] animate-float animation-delay-2000"
      />
    </div>

    <!-- ================= محتوى الباركود (QR Code Card) ================= -->
    <div class="relative z-30 w-full max-w-2xl px-6 mt-32">
      <div
        class="bg-[#0f172a]/60 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center transform transition-all duration-700 translate-y-0 animate-fade-in-up"
      >
        <div class="mb-10 space-y-4">
          <h1 class="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
            مرحباً بكم في
            <span class="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">المعرض</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-300 font-light">
            امسح الرمز ضوئياً بهاتفك للتسجيل والدخول في السحب الكبير
          </p>
        </div>

        <!-- ================= إطار الباركود مع ليزر الحواف ================= -->
        <div class="relative mt-2">
          <!-- زوايا تجميلية خارجية للإطار -->
          <div
            class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl -translate-x-3 -translate-y-3 z-20"
          ></div>
          <div
            class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-400 rounded-tr-2xl translate-x-3 -translate-y-3 z-20"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-400 rounded-bl-2xl -translate-x-3 translate-y-3 z-20"
          ></div>
          <div
            class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-400 rounded-br-2xl translate-x-3 translate-y-3 z-20"
          ></div>

          <!-- حاوية تأثير الليزر (p-[4px] يحدد سماكة خط الليزر) -->
          <div
            class="relative rounded-2xl p-[4px] overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.3)]"
          >
            <!-- خلفية الليزر المتحركة (مزدوجة: شعاعين يلاحقان بعضهما) -->
            <div
              class="absolute top-1/2 left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_20%,rgba(56,189,248,0.5)_40%,rgba(251,191,36,1)_50%,transparent_50%,transparent_70%,rgba(56,189,248,0.5)_90%,rgba(251,191,36,1)_100%)] animate-laser-spin pointer-events-none origin-center -translate-x-1/2 -translate-y-1/2"
            ></div>

            <!-- البطاقة البيضاء الداخلية التي تحتوي الباركود -->
            <div class="relative bg-white p-5 rounded-[12px] z-10 flex items-center justify-center">
              <qrcode-vue
                v-if="registerUrl"
                :value="registerUrl"
                :size="300"
                level="H"
                render-as="svg"
                foreground="#020617"
              />
            </div>
          </div>
        </div>

        <div class="mt-12 flex items-center justify-center gap-3 text-amber-200/80">
          <svg class="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m0 0l-4-4m4 4l4-4"
            />
          </svg>
          <span class="text-lg">افتح كاميرا هاتفك ووجهها نحو الرمز</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QrcodeVue from 'qrcode.vue'

const registerUrl = ref('')

onMounted(() => {
  registerUrl.value = `${window.location.origin}/guest-register`
})
</script>

<style scoped>
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

/* --- حركة الليزر السريعة حول الإطار --- */
@keyframes laser-spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.animate-laser-spin {
  animation: laser-spin 4s linear infinite;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

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

@keyframes pulseBgSlow {
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
.animate-pulse-bg-slow {
  animation: pulseBgSlow 8s ease-in-out infinite alternate;
}

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

.animation-delay-1000 {
  animation-delay: 1s;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
