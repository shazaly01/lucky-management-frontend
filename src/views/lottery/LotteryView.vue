<!--src\views\lottery\LotteryView.vue-->
<template>
  <div class="relative min-h-screen bg-slate-950 text-white overflow-hidden font-sans">
    <!-- قطعة الليغو 1: الخلفية المتحركة (التي تحتوي على الشعار) -->
    <LotteryBackground />

    <!-- تعديل: زيادة المسافة العلوية mt-[320px] لضمان عدم تغطية الماكينة للشعار نهائياً -->
    <main class="relative z-10 container mx-auto px-4 mt-[320px] flex flex-col items-center">
      <!-- قطعة الليغو 2: محرك الروليت الليزري -->
      <LotterySlotMachine
        ref="slotMachine"
        :is-drawing="isDrawing"
        :winner="winner"
        @animation-complete="handleAnimationComplete"
      />

      <!-- النص الوصفي (زجاجي أنيق) -->
      <div
        class="mt-8 px-8 py-3 bg-[#020617]/60 backdrop-blur-md border border-white/5 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <p class="text-slate-400 text-lg font-light tracking-wide text-center">
          سحب عشوائي على جوائز قيمة لنزلاء الفندق
        </p>
      </div>

      <!-- أزرار التحكم -->
      <div class="mt-8">
        <AppButton
          v-if="!isWinnerDeclared"
          size="xl"
          class="px-14 py-5 text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-700 to-blue-600 border border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] hover:scale-105 transition-all duration-300 rounded-2xl"
          :loading="isDrawing"
          @click="startLotteryDraw"
        >
          {{ isDrawing ? 'جاري السحب...' : 'إبـدأ السـحب الآن' }}
        </AppButton>

        <AppButton
          v-else
          variant="secondary"
          size="lg"
          class="px-12 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 shadow-[0_0_20px_rgba(255,255,255,0.05)] rounded-2xl transition-all"
          @click="resetDraw"
        >
          سحب جديد
        </AppButton>
      </div>
    </main>

    <!-- قطعة الليغو 3: السجل الجانبي للفائزين -->
    <WinnersSidebar :recent-winners="sessionWinners" />

    <!-- قطعة الليغو 4: شاشة الاحتفال الكبرى -->
    <WinnerDisplay v-if="isWinnerDeclared" :winner="winner" @close="isWinnerDeclared = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLotteryStore } from '@/stores/lottery.store'
import { useClientStore } from '@/stores/client.store'
import { useToast } from 'vue-toastification'

import LotteryBackground from './components/LotteryBackground.vue'
import LotterySlotMachine from './components/LotterySlotMachine.vue'
import WinnerDisplay from './components/WinnerDisplay.vue'
import WinnersSidebar from './components/WinnersSidebar.vue'
import AppButton from '@/components/ui/AppButton.vue'

const lotteryStore = useLotteryStore()
const clientStore = useClientStore()
const toast = useToast()

const slotMachine = ref(null)
const isDrawing = ref(false)
const isWinnerDeclared = ref(false)
const winner = ref(null)
const sessionWinners = ref([])

onMounted(async () => {
  try {
    await clientStore.fetchClients(1)
    await lotteryStore.fetchDraws(1)
    sessionWinners.value = [...lotteryStore.draws]
  } catch (error) {
    console.error('Failed to load initial data:', error)
  }
})

const startLotteryDraw = async () => {
  if (isDrawing.value) return

  try {
    isWinnerDeclared.value = false
    const result = await lotteryStore.conductDraw()
    winner.value = result
    isDrawing.value = true
  } catch (error) {
    const msg = error.response?.data?.message || 'فشل الاتصال بالسيرفر'
    toast.error(msg)
    isDrawing.value = false
  }
}

const handleAnimationComplete = () => {
  isDrawing.value = false
  isWinnerDeclared.value = true
  if (winner.value) {
    sessionWinners.value.unshift(winner.value)
  }
}

const resetDraw = () => {
  isWinnerDeclared.value = false
  winner.value = null
  isDrawing.value = false
}
</script>
