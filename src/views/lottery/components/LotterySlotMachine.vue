<template>
  <div class="relative w-full max-w-4xl py-10">
    <!-- إطار الروليت الخارجي -->
    <div
      class="relative h-80 bg-slate-900/50 backdrop-blur-xl border-4 border-gold-600/30 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
    >
      <!-- مؤشر التوقف (السهم الجانبي) -->
      <div class="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex items-center">
        <div class="w-8 h-16 bg-gold-500 clip-arrow-left shadow-lg animate-pulse"></div>
      </div>
      <div class="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center">
        <div class="w-8 h-16 bg-gold-500 clip-arrow-right shadow-lg animate-pulse"></div>
      </div>

      <!-- حاوية الشريط المتحرك -->
      <div ref="reelContainer" class="absolute inset-0 flex flex-col items-center py-20">
        <!-- توليد قائمة النزلاء الوهمية + الفائز -->
        <div
          v-for="(guest, index) in displayList"
          :key="index"
          class="h-40 w-full flex flex-col items-center justify-center shrink-0 border-y border-white/5"
        >
          <div class="relative">
            <img
              :src="guest.image_url || '/default-avatar.png'"
              class="w-24 h-24 rounded-full border-4 border-slate-700 shadow-2xl object-cover"
              :class="{ 'border-gold-500 scale-110': isWinnerRow(index) }"
            />
          </div>
          <h2 class="mt-3 text-xl font-bold text-slate-200">
            {{ guest.name }}
          </h2>
          <span class="text-xs text-gold-500 tracking-widest uppercase opacity-60"
            >Guest ID: {{ guest.id }}</span
          >
        </div>
      </div>
    </div>

    <!-- تأثيرات الإضاءة العلوية والسفلية (Vignette) -->
    <div
      class="absolute inset-x-0 top-10 h-32 bg-gradient-to-b from-slate-950 to-transparent z-20"
    ></div>
    <div
      class="absolute inset-x-0 bottom-10 h-32 bg-gradient-to-t from-slate-950 to-transparent z-20"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useClientStore } from '@/stores/client.store'

const props = defineProps({
  isDrawing: Boolean,
  winnerId: [Number, String],
})

const emit = defineEmits(['animation-complete'])
const clientStore = useClientStore()

const reelContainer = ref(null)
const displayList = ref([])
const itemHeight = 160 // ارتفاع كل صف بالبيكسل

// دالة لتجهيز قائمة الروليت
const prepareReel = () => {
  // نأخذ عينة عشوائية من النزلاء المسجلين (مثلاً 20) لزوم التدوير
  const pool = [...clientStore.clients].sort(() => 0.5 - Math.random()).slice(0, 20)

  // نكرر القائمة عدة مرات لخلق انطباع الشريط الطويل (مثلاً 5 تكرارات)
  let longList = []
  for (let i = 0; i < 5; i++) {
    longList = [...longList, ...pool]
  }

  // نضع "الفائز الحقيقي" في نهاية القائمة ليكون هو نقطة التوقف
  if (props.winnerId) {
    const realWinner = clientStore.clients.find((c) => c.id === props.winnerId)
    if (realWinner) longList.push(realWinner)
  }

  displayList.value = longList
}

// دالة الأنيميشن الأساسية
const runAnimation = () => {
  if (!reelContainer.value) return

  // حساب المسافة النهائية للتوقف عند آخر عنصر (الفائز)
  const totalDistance = (displayList.value.length - 1) * itemHeight

  gsap.fromTo(
    reelContainer.value,
    { y: 0 },
    {
      y: -totalDistance,
      duration: 6, // مدة الدوران 6 ثوانٍ
      ease: 'power4.inOut', // تباطؤ تدريجي احترافي في النهاية
      onComplete: () => {
        emit('animation-complete')
      },
    },
  )
}

// مراقبة حالة السحب للبدء
watch(
  () => props.isDrawing,
  (newVal) => {
    if (newVal) {
      prepareReel()
      nextTick(() => {
        runAnimation()
      })
    }
  },
)

const isWinnerRow = (index) => {
  return props.winnerId && index === displayList.value.length - 1
}
</script>

<style scoped>
.clip-arrow-left {
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
}
.clip-arrow-right {
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}
</style>
