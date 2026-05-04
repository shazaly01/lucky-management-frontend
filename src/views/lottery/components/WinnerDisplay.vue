<!--src\views\lottery\components\WinnerDisplay.vue-->
<template>
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="opacity-0 scale-50"
    enter-to-class="opacity-100 scale-100"
  >
    <!-- v-if="displayData" تضمن عدم محاولة رندر المكون قبل وصول البيانات -->
    <div
      v-if="displayData"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
    >
      <!-- تأثير الهالة الضوئية -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-600/20 rounded-full blur-[100px] animate-pulse-slow"
        ></div>
      </div>

      <!-- بطاقة الفائز -->
      <div
        class="relative bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-gold-500/50 rounded-[2.5rem] shadow-[0_0_80px_rgba(234,179,8,0.2)] p-8 max-w-lg w-full text-center"
      >
        <!-- التاج -->
        <div class="absolute -top-12 left-1/2 -translate-x-1/2 drop-shadow-2xl">
          <svg class="w-20 h-20 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1Z"
            />
          </svg>
        </div>

        <div class="relative inline-block mt-8">
          <div class="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-20"></div>
          <!-- استخدام displayData لضمان الوصول للعميل سواء مررت سجل السحب أو سجل العميل مباشرة -->
          <img
            :src="displayData.image_url || '/dEmpty.jpg'"
            class="relative w-48 h-48 rounded-full border-8 border-slate-800 shadow-2xl object-cover z-10"
            @error="(e) => (e.target.src = '/Empty.jpg')"
          />
        </div>

        <div class="mt-8 space-y-2">
          <h3 class="text-gold-500 font-bold uppercase tracking-[0.3em] text-sm">مبروك للفائز</h3>
          <h2 class="text-4xl font-black text-white leading-tight">
            {{ displayData.name }}
          </h2>
          <p class="text-2xl font-mono text-slate-400 mt-2">
            {{ formatPhone(displayData.phone) }}
          </p>
        </div>

        <div class="mt-10">
          <AppButton
            variant="primary"
            class="w-full py-4 text-xl rounded-2xl shadow-lg bg-gradient-to-r from-gold-600 to-gold-400 border-none"
            @click="$emit('close')"
          >
            إغلاق وإكمال السحب
          </AppButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import confetti from 'canvas-confetti'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  winner: {
    type: Object,
    default: null,
  },
})

defineEmits(['close'])

/**
 * دالة ذكية لاستخراج بيانات العميل (Display Data)
 * سواء كان الكائن الممرر هو LotteryDraw أو Client مباشرة
 */
const displayData = computed(() => {
  if (!props.winner) return null
  // إذا كان الكائن يحتوي على مفتاح client (بنية الـ API الحالية) نستخدمه، وإلا نستخدم الكائن نفسه
  return props.winner.client ? props.winner.client : props.winner
})

const formatPhone = (phone) => {
  if (!phone) return '***'
  const p = String(phone)
  // تحسين بسيط للمقاسات السودانية مثلاً (تعديل حسب طول الرقم لديكم)
  return p.length > 6 ? `${p.substring(0, 4)}****${p.substring(p.length - 2)}` : p
}

onMounted(() => {
  // تشغيل الاحتفال فور الظهور
  const duration = 3 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }
  const randomInRange = (min, max) => Math.random() * (max - min) + min

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) return clearInterval(interval)
    const particleCount = 50 * (timeLeft / duration)
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  }, 250)
})
</script>

<style scoped>
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1.1);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}
</style>
