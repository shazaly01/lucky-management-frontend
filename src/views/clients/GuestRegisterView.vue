<template>
  <div
    class="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-950 px-4 py-8"
  >
    <!-- خلفية الفندق الباهتة (نفس صورة شاشة العرض لتوحيد الهوية البصرية) -->
    <div
      class="absolute inset-0 z-0 bg-cover bg-center opacity-30 blur-md scale-110 fixed"
      style="
        background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920&auto=format&fit=crop');
      "
    ></div>

    <!-- تدرج لوني داكن لتسهيل قراءة النصوص وتجميل المظهر -->
    <div
      class="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-gray-950/95 to-gray-950"
    ></div>

    <!-- حاوية المحتوى الزجاجية (Glassmorphism) -->
    <div class="relative z-10 w-full max-w-md">
      <Transition name="fade-slide" mode="out-in">
        <!-- حالة النجاح (تظهر بعد إتمام التسجيل) -->
        <div
          v-if="isSuccess"
          class="bg-surface-section/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center"
        >
          <div
            class="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-short"
          >
            <svg
              class="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white mb-4">تم التسجيل بنجاح!</h2>
          <p class="text-gray-300 text-lg mb-8">
            شكراً لك <span class="text-primary-400 font-bold">{{ form.name }}</span
            >.<br />
            لقد تم إدخالك في السحب الكبير. نتمنى لك حظاً سعيداً!
          </p>
          <button
            @click="resetForm"
            class="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300 border border-white/5"
          >
            تسجيل نزيل آخر
          </button>
        </div>

        <!-- حالة الفورم (الواجهة الافتراضية) -->
        <div
          v-else
          class="bg-surface-section/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-white tracking-wide mb-2">التسجيل في السحب</h1>
            <p class="text-gray-400 text-sm">أدخل بياناتك أدناه للدخول في قرعة الفندق</p>
          </div>

          <!-- رسالة الخطأ (إن وجدت، مثل تكرار رقم الهاتف) -->
          <div
            v-if="errorMessage"
            class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
          >
            {{ errorMessage }}
          </div>

          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- حقل الاسم -->
            <div class="space-y-2 text-right">
              <label class="block text-sm font-medium text-gray-300">الاسم الرباعي</label>
              <div class="relative">
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="أدخل اسمك الكامل"
                  class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-500 text-right dir-rtl"
                />
              </div>
            </div>

            <!-- حقل رقم الهاتف -->
            <div class="space-y-2 text-right">
              <label class="block text-sm font-medium text-gray-300">رقم الهاتف</label>
              <div class="relative">
                <!-- تم جعل الإدخال من اليسار لليمين لضمان كتابة الأرقام بشكل صحيح -->
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="مثال: 09..."
                  class="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-gray-500 text-left dir-ltr"
                  dir="ltr"
                />
              </div>
            </div>

            <!-- زر الإرسال -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-600/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              <!-- أيقونة التحميل -->
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            </button>
          </form>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios' // افتراض استخدام axios الموجود افتراضياً في مشاريع Laravel/Vue

const form = ref({
  name: '',
  phone: '',
})

const isLoading = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

// دالة إرسال البيانات
const submitForm = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    // إرسال الطلب إلى المسار العام
    // ملاحظة: قد تحتاج لضبط الرابط إذا كان الـ API يعمل على منفذ/نطاق مختلف، لكن هذا هو الافتراضي
    const response = await axios.post('/api/public-clients', {
      name: form.value.name,
      phone: form.value.phone,
    })

    isSuccess.value = true
  } catch (error) {
    // التقاط خطأ التحقق من الصحة (Validation Error) مثل رقم هاتف مكرر
    if (error.response?.data?.errors) {
      // جلب أول رسالة خطأ من مصفوفة الأخطاء
      const firstErrorKey = Object.keys(error.response.data.errors)[0]
      errorMessage.value = error.response.data.errors[firstErrorKey][0]
    } else if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = 'حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.'
    }
  } finally {
    isLoading.value = false
  }
}

// دالة للعودة إلى شاشة التسجيل
const resetForm = () => {
  form.value.name = ''
  form.value.phone = ''
  isSuccess.value = false
  errorMessage.value = ''
}
</script>

<style scoped>
/* تنسيقات اتجاه النص */
.dir-rtl {
  direction: rtl;
}
.dir-ltr {
  direction: ltr;
}

/* حركات الانتقال (Transitions) بين الفورم ورسالة النجاح */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* حركة ظهور أيقونة النجاح */
@keyframes bounceShort {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce-short {
  animation: bounceShort 0.5s ease-out forwards;
}
</style>
