<!--src\views\clients\GuestRegisterView.vue-->
<template>
  <div
    class="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#070b19] font-sans selection:bg-amber-500/30"
  >
    <!-- ================= الخلفية الديناميكية ================= -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float pointer-events-none"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-sky-500/10 rounded-full blur-[100px] animate-orb-float animation-delay-2000 pointer-events-none"
    ></div>
    <div
      class="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"
    ></div>
    <div
      class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"
    ></div>

    <!-- ================= منطقة الشعارات العلوية ================= -->
    <div
      class="relative z-20 flex items-center justify-center gap-4 sm:gap-8 w-full max-w-[400px] px-4 mt-6 mb-4"
    >
      <div
        class="absolute inset-0 bg-amber-500/10 blur-[50px] rounded-full animate-glow pointer-events-none"
      ></div>

      <img
        src="/RightLogo.png"
        alt="Sponsor Right"
        class="relative z-20 w-16 sm:w-20 h-auto drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] animate-float animation-delay-1000"
      />
      <img
        src="/MainLogo.png"
        alt="Event Logo"
        class="relative z-20 w-28 sm:w-36 h-auto drop-shadow-[0_0_12px_rgba(251,191,36,0.5)] animate-float"
      />
      <img
        src="/LeftLogo.png"
        alt="Sponsor Left"
        class="relative z-20 w-12 sm:w-16 h-auto drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] animate-float animation-delay-2000"
      />
    </div>

    <!-- ================= حاوية المحتوى الرئيسية ================= -->
    <div
      class="relative z-10 w-full max-w-[400px] px-5 pb-8 flex-1 flex flex-col justify-center animate-slide-up-enter"
    >
      <Transition name="switch" mode="out-in">
        <!-- ================= 1. حالة مسجل مسبقاً (البصمة الرقمية) ================= -->
        <div
          v-if="hasRegisteredBefore"
          class="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-sky-500/20 to-transparent pointer-events-none"
          ></div>

          <div class="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div class="absolute inset-0 bg-sky-500/20 rounded-full animate-ping-slow"></div>
            <!-- أيقونة درع/حماية -->
            <svg
              class="w-14 h-14 text-sky-400 z-10 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </div>

          <h2 class="text-2xl font-extrabold text-white mb-2 tracking-wide">مسجل مسبقاً</h2>
          <p class="text-slate-300 text-sm leading-relaxed mb-2">
            لقد تم تسجيل بياناتك من هذا الجهاز بالفعل ودخولك في السحب.
          </p>
          <p class="text-amber-400 text-sm font-bold">نتمنى لك حظاً وفيراً!</p>
        </div>

        <!-- ================= 2. حالة النجاح (اللحظية بعد التسجيل) ================= -->
        <div
          v-else-if="isSuccess"
          class="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none"
          ></div>

          <div class="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <div class="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping-slow"></div>
            <svg
              class="w-16 h-16 text-emerald-400 z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              viewBox="0 0 52 52"
            >
              <circle
                class="circle-animation"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="check-animation"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          <h2 class="text-2xl font-extrabold text-white mb-2 tracking-wide">تم بنجاح!</h2>
          <p class="text-slate-300 text-sm leading-relaxed">
            أهلاً بك <span class="text-amber-400 font-bold">{{ form.name }}</span
            ><br />
            لقد تم إدخالك في السحب الكبير.<br />نتمنى لك حظاً وفيراً!
          </p>
          <!-- تم إزالة زر التصفير (Reset) لمنع التسجيل المتكرر -->
        </div>

        <!-- ================= 3. حالة الفورم (الواجهة الافتراضية) ================= -->
        <div
          v-else
          class="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div class="text-center mb-8">
            <h1 class="text-xl sm:text-2xl font-extrabold text-white tracking-wide mb-1.5">
              التسجيل في السحب
            </h1>
            <p class="text-slate-400 text-xs sm:text-sm">يرجى إدخال بياناتك للدخول في القرعة</p>
          </div>

          <Transition name="fade">
            <div
              v-if="errorMessage"
              class="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5"
            >
              <svg
                class="w-4 h-4 text-red-400 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p class="text-red-300 text-xs leading-relaxed">{{ errorMessage }}</p>
            </div>
          </Transition>

          <form @submit.prevent="submitForm" class="space-y-4">
            <!-- حقل الاسم -->
            <div class="relative group">
              <div
                class="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-sky-500 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"
              ></div>
              <div
                class="relative bg-[#0f152a] rounded-xl border border-white/10 group-focus-within:border-amber-500/50 transition-colors"
              >
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                  placeholder=" "
                  class="autofill-fix block w-full px-4 pb-2 pt-5 bg-transparent text-white text-sm focus:outline-none peer dir-rtl"
                />
                <label
                  for="name"
                  class="absolute text-slate-400 duration-300 transform -translate-y-2.5 scale-75 top-3 z-10 origin-[right] right-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-amber-400 text-sm"
                >
                  الاسم الرباعي
                </label>
              </div>
            </div>

            <!-- حقل رقم الهاتف -->
            <div class="relative group">
              <div
                class="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-sky-500 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"
              ></div>
              <div
                class="relative bg-[#0f152a] rounded-xl border border-white/10 group-focus-within:border-amber-500/50 transition-colors flex items-center"
              >
                <div class="pl-3 pr-2.5 text-slate-500 border-r border-white/10">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div class="relative flex-1">
                  <input
                    v-model="form.phone"
                    type="tel"
                    id="phone"
                    required
                    placeholder=" "
                    class="autofill-fix block w-full px-3 pb-2 pt-5 bg-transparent text-white text-sm focus:outline-none peer dir-ltr text-left font-mono"
                    dir="ltr"
                  />
                  <label
                    for="phone"
                    class="absolute text-slate-400 duration-300 transform -translate-y-2.5 scale-75 top-3 z-10 origin-[left] left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-amber-400 text-sm"
                  >
                    رقم الهاتف
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="relative w-full overflow-hidden rounded-xl mt-4 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-300 group-hover:scale-[1.02]"
              ></div>
              <div
                class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
              ></div>

              <div
                class="relative flex items-center justify-center gap-2 py-3.5 px-6 text-white font-bold text-[15px] shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                <svg
                  v-if="isLoading"
                  class="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{{ isLoading ? 'جاري التسجيل...' : 'تأكيد التسجيل' }}</span>
              </div>
            </button>
          </form>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClientStore } from '@/stores/client.store'

const clientStore = useClientStore()

const form = ref({
  name: '',
  phone: '',
})

const isLoading = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

// المتغير الجديد الخاص بالبصمة الرقمية
const hasRegisteredBefore = ref(false)

// التحقق من البصمة بمجرد فتح الصفحة
onMounted(() => {
  const isRegistered = localStorage.getItem('lottery_registered_v1')
  if (isRegistered === 'true') {
    hasRegisteredBefore.value = true
  }
})

const submitForm = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    await clientStore.createPublicClient({
      name: form.value.name,
      phone: form.value.phone,
    })

    // إظهار شاشة النجاح
    isSuccess.value = true

    // زراعة البصمة الرقمية في المتصفح لمنع التسجيل مرة أخرى
    localStorage.setItem('lottery_registered_v1', 'true')
  } catch (error) {
    if (error.response?.data?.errors) {
      const firstErrorKey = Object.keys(error.response.data.errors)[0]
      errorMessage.value = error.response.data.errors[firstErrorKey][0]
    } else if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = clientStore.error || 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.dir-rtl {
  direction: rtl;
  text-align: right;
}
.dir-ltr {
  direction: ltr;
  text-align: left;
}

.autofill-fix:-webkit-autofill,
.autofill-fix:-webkit-autofill:hover,
.autofill-fix:-webkit-autofill:focus,
.autofill-fix:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #0f152a inset !important;
  -webkit-text-fill-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}

.switch-enter-active,
.switch-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.switch-enter-from {
  opacity: 0;
  transform: translateY(15px) scale(0.97);
}
.switch-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.97);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

@keyframes slideUpEnter {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-slide-up-enter {
  animation: slideUpEnter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -30px) scale(1.05);
  }
  66% {
    transform: translate(-15px, 15px) scale(0.95);
  }
}
.animate-orb-float {
  animation: orbFloat 15s ease-in-out infinite;
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1) translate(-50%, -50%);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05) translate(-50%, -50%);
  }
}
.animate-pulse-slow {
  animation: pulseSlow 8s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-150%) skewX(-12deg);
  }
  100% {
    transform: translateX(300%) skewX(-12deg);
  }
}
.animate-shimmer {
  animation: shimmer 3s infinite;
}

@keyframes glow {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.95);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
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
    transform: translateY(-6px);
  }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}

.circle-animation {
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  animation: drawCircle 0.5s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.check-animation {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: drawCheck 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
}
@keyframes drawCircle {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes drawCheck {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pingSlow {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}
.animate-ping-slow {
  animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
