<template>
  <div class="relative min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
    <!-- قطعة الليغو 1: الخلفية المتحركة -->
    <LotteryBackground />

    <!-- الرأس: شعار الفندق أو عنوان الفعالية -->
    <header class="relative z-10 pt-10 text-center">
      <h1
        class="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 uppercase"
      >
        Grand Hotel Lottery
      </h1>
      <p class="text-slate-400 mt-2 text-lg">سحب عشوائي على جوائز قيمة لنزلاء الفندق</p>
    </header>

    <main class="relative z-10 container mx-auto px-4 mt-12 flex flex-col items-center">
      <!-- قطعة الليغو 2: محرك الروليت (الرأس النابض) -->
      <LotterySlotMachine
        ref="slotMachine"
        :is-drawing="isDrawing"
        :winner-id="winner?.client_id"
        @animation-complete="handleAnimationComplete"
      />

      <!-- أزرار التحكم (تظهر بجمالية عالية) -->
      <div class="mt-16">
        <AppButton
          v-if="!isWinnerDeclared"
          size="xl"
          class="px-12 py-6 text-2xl shadow-[0_0_50px_rgba(234,179,8,0.3)] hover:scale-105 transition-transform"
          :loading="isDrawing"
          @click="startLotteryDraw"
        >
          {{ isDrawing ? 'جاري السحب...' : 'إبـدأ السـحب الآن' }}
        </AppButton>

        <AppButton v-else variant="secondary" size="lg" @click="resetDraw"> سحب جديد </AppButton>
      </div>
    </main>

    <!-- قطعة الليغو 3: السجل الجانبى للفائزين -->
    <WinnersSidebar :recent-winners="sessionWinners" />

    <!-- قطعة الليغو 4: شاشة الاحتفال الكبرى -->
    <WinnerDisplay v-if="isWinnerDeclared" :winner="winner" @close="isWinnerDeclared = false" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useLotteryStore } from '@/stores/lottery.store'
import { useToast } from 'vue-toastification'

// استيراد قطع الليغو (سنقوم ببرمجتها في الردود القادمة)
import LotteryBackground from './components/LotteryBackground.vue'
import LotterySlotMachine from './components/LotterySlotMachine.vue'
import WinnerDisplay from './components/WinnerDisplay.vue'
import WinnersSidebar from './components/WinnersSidebar.vue'
import AppButton from '@/components/ui/AppButton.vue'

const lotteryStore = useLotteryStore()
const toast = useToast()

const isDrawing = ref(false)
const isWinnerDeclared = ref(false)
const winner = ref(null)
const sessionWinners = ref([])

// دالة بدء السحب
const startLotteryDraw = async () => {
  if (isDrawing.value) return

  try {
    isDrawing.value = true
    isWinnerDeclared.value = false

    // 1. طلب الفائز من الباك إند (الحقيقة تأتي من السيرفر أولاً)
    const result = await lotteryStore.conductDraw()
    winner.value = result

    // 2. تفعيل أنيميشن الروليت في قطعة الليغو المخصصة
    // سنقوم بمخاطبة المكون "SlotMachine" لبدء الدوران
  } catch (error) {
    const msg = error.response?.data?.message || 'فشل الاتصال بالسيرفر'
    toast.error(msg)
    isDrawing.value = false
  }
}

// يتم استدعاؤها عندما ينتهي الأنيميشن بصرياً ويقف عند الفائز
const handleAnimationComplete = () => {
  isDrawing.value = false
  isWinnerDeclared.value = true
  sessionWinners.value.unshift(winner.value) // إضافة الفائز لسجل الجلسة
}

const resetDraw = () => {
  isWinnerDeclared.value = false
  winner.value = null
}
</script>
