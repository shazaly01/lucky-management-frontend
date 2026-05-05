<!--src\views\clients\GuestRegisterView.vue-->
<template>
  <!-- استخدمنا min-h-[100dvh] ليكون متوافقاً تماماً مع شاشات الجوال الحقيقية -->
  <div
    class="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#070b19] font-sans selection:bg-amber-500/30"
  >
    <!-- ================= الخلفية الديناميكية (Ambient Orbs) ================= -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 rounded-full blur-[80px] animate-orb-float pointer-events-none"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-sky-500/10 rounded-full blur-[100px] animate-orb-float animation-delay-2000 pointer-events-none"
    ></div>
    <div
      class="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"
    ></div>

    <!-- شبكة خفيفة لإعطاء ملمس عصري (Texture) -->
    <div
      class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"
    ></div>

    <!-- ================= حاوية المحتوى الرئيسية ================= -->
    <div class="relative z-10 w-full max-w-[400px] px-5 py-8 animate-slide-up-enter">
      <Transition name="switch" mode="out-in">
        <!-- ================= حالة النجاح (شكر وتسجيل) ================= -->
        <div
          v-if="isSuccess"
          class="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 sm:p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <!-- لمعان خلفي لحالة النجاح -->
          <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none"
          ></div>

          <!-- أيقونة الصح المتحركة -->
          <div class="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            <div class="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping-slow"></div>
            <svg
              class="w-20 h-20 text-emerald-400 z-10 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
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

          <h2 class="text-3xl font-extrabold text-white mb-3 tracking-wide">تم بنجاح!</h2>
          <p class="text-slate-300 text-lg leading-relaxed mb-8">
            أهلاً بك <span class="text-amber-400 font-bold">{{ form.name }}</span
            ><br />
            لقد تم إدخالك في السحب الكبير.<br />نتمنى لك حظاً وفيراً!
          </p>

          <button
            @click="resetForm"
            class="w-full py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>تسجيل نزيل آخر</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </button>
        </div>

        <!-- ================= حالة الفورم (الواجهة الافتراضية) ================= -->
        <div
          v-else
          class="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <!-- تصميم الشعار الترحيبي -->
          <div class="text-center mb-10">
            <div
              class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/20 to-amber-300/5 border border-amber-500/30 mb-4 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
            >
              <svg
                class="w-8 h-8 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-wide mb-2">
              التسجيل في السحب
            </h1>
            <p class="text-slate-400 text-sm">يرجى إدخال بياناتك للدخول في القرعة</p>
          </div>

          <!-- رسالة الخطأ المنبثقة -->
          <Transition name="fade">
            <div
              v-if="errorMessage"
              class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3"
            >
              <svg
                class="w-5 h-5 text-red-400 shrink-0 mt-0.5"
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
              <p class="text-red-300 text-sm leading-relaxed">{{ errorMessage }}</p>
            </div>
          </Transition>

          <form @submit.prevent="submitForm" class="space-y-5">
            <!-- حقل الاسم (تصميم مخصص للموبايل) -->
            <div class="relative group">
              <!-- تأثير التوهج الخلفي للحقل عند التركيز -->
              <div
                class="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-sky-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"
              ></div>
              <div
                class="relative bg-[#0f152a] rounded-2xl border border-white/10 group-focus-within:border-amber-500/50 transition-colors"
              >
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                  placeholder=" "
                  class="block w-full px-5 pb-3 pt-7 bg-transparent text-white text-base focus:outline-none peer dir-rtl"
                />
                <label
                  for="name"
                  class="absolute text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[right] right-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-amber-400"
                >
                  الاسم الرباعي
                </label>
              </div>
            </div>

            <!-- حقل رقم الهاتف -->
            <div class="relative group">
              <div
                class="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-sky-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"
              ></div>
              <div
                class="relative bg-[#0f152a] rounded-2xl border border-white/10 group-focus-within:border-amber-500/50 transition-colors flex items-center"
              >
                <!-- أيقونة الهاتف -->
                <div class="pl-4 pr-3 text-slate-500 border-r border-white/10">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    class="block w-full px-4 pb-3 pt-7 bg-transparent text-white text-base focus:outline-none peer dir-ltr text-left font-mono"
                    dir="ltr"
                  />
                  <label
                    for="phone"
                    class="absolute text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[left] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-amber-400"
                  >
                    رقم الهاتف
                  </label>
                </div>
              </div>
            </div>

            <!-- زر الإرسال مع تأثير اللمعان -->
            <button
              type="submit"
              :disabled="isLoading"
              class="relative w-full overflow-hidden rounded-2xl mt-6 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <!-- خلفية الزر -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-300 group-hover:scale-[1.02]"
              ></div>

              <!-- لمعة الزر المتحركة -->
              <div
                class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
              ></div>

              <div
                class="relative flex items-center justify-center gap-2 py-4 px-6 text-white font-bold text-lg shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                <svg
                  v-if="isLoading"
                  class="animate-spin h-5 w-5 text-white"
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
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  name: '',
  phone: '',
})

const isLoading = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const submitForm = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    await axios.post('/api/public-clients', {
      name: form.value.name,
      phone: form.value.phone,
    })

    isSuccess.value = true
  } catch (error) {
    if (error.response?.data?.errors) {
      const firstErrorKey = Object.keys(error.response.data.errors)[0]
      errorMessage.value = error.response.data.errors[firstErrorKey][0]
    } else if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.'
    }
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.value.name = ''
  form.value.phone = ''
  isSuccess.value = false
  errorMessage.value = ''
}
</script>

<style scoped>
/* ================= اتجاه النصوص ================= */
.dir-rtl {
  direction: rtl;
  text-align: right;
}
.dir-ltr {
  direction: ltr;
  text-align: left;
}

/* ================= حركات الانتقال (Transitions) ================= */
.switch-enter-active,
.switch-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.switch-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.switch-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
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
  transform: translateY(-10px);
}

/* ================= الحركات المخصصة (Keyframes) ================= */

/* دخول الفورم عند فتح الرابط */
@keyframes slideUpEnter {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-slide-up-enter {
  animation: slideUpEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* حركة الكرات المضيئة في الخلفية */
@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
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
    opacity: 0.6;
    transform: scale(1.05) translate(-50%, -50%);
  }
}
.animate-pulse-slow {
  animation: pulseSlow 8s ease-in-out infinite;
}

/* لمعة الزر */
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

/* ================= رسم علامة الصح لحالة النجاح ================= */
.circle-animation {
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  animation: drawCircle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.check-animation {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: drawCheck 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
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
    transform: scale(1.5);
    opacity: 0;
  }
}
.animate-ping-slow {
  animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
