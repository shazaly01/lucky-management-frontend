<!--src\views\lottery\components\LotterySlotMachine.vue-->
<template>
  <div class="relative w-full max-w-3xl py-4 mx-auto group perspective-1000">
    <!-- 1. إطار الماكينة الخارجي (تم تحويل الظل والشعاع إلى الأزرق الفاتح Cyan) -->
    <div
      class="absolute inset-0 rounded-[2rem] bg-slate-950 overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-700"
      :class="{
        'shadow-[0_0_60px_rgba(34,211,238,0.4)] scale-[1.01]':
          isDrawing || isWinnerRow(displayList.length - 1),
      }"
    >
      <!-- شعاع الدوران الخارجي (أزرق فاتح) -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#22d3ee_360deg)] animate-[spin_4s_linear_infinite] opacity-80"
        :class="{ 'animate-[spin_1s_linear_infinite] opacity-100': isDrawing }"
      ></div>
      <!-- الكابينة الداخلية -->
      <div class="absolute inset-[2px] bg-[#020617] rounded-[1.9rem] z-10"></div>
    </div>

    <!-- 2. الشاشة الرئيسية -->
    <div
      class="relative z-20 h-[260px] rounded-[1.9rem] overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,1)]"
    >
      <!-- تدرجات علوية وسفلية للعمق -->
      <div
        class="absolute inset-x-0 top-0 h-[60px] bg-gradient-to-b from-[#020617] to-transparent z-30 pointer-events-none"
      ></div>
      <div
        class="absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-[#020617] to-transparent z-30 pointer-events-none"
      ></div>

      <!-- 3. منطقة التركيز الليزرية (الزرقاء) -->
      <div
        class="absolute top-[80px] left-0 right-0 h-[100px] z-20 pointer-events-none flex items-center justify-center px-2"
      >
        <!-- ليزر علوي ديناميكي -->
        <div class="absolute top-0 inset-x-0 h-[2px] bg-cyan-900/30 overflow-hidden">
          <div
            class="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee,0_0_5px_#fff] animate-laser-scan"
          ></div>
        </div>

        <!-- ليزر سفلي ديناميكي -->
        <div class="absolute bottom-0 inset-x-0 h-[2px] bg-cyan-900/30 overflow-hidden">
          <div
            class="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee,0_0_5px_#fff] animate-laser-scan-reverse"
          ></div>
        </div>

        <!-- أقواس التصويب التقنية -->
        <div
          class="absolute left-6 top-1/2 -translate-y-1/2 w-3 border-l-[2px] border-y-[2px] border-cyan-400/80 shadow-[0_0_10px_#22d3ee] rounded-l-sm transition-all duration-300"
          :class="isDrawing ? 'h-16 border-cyan-300 shadow-[0_0_20px_#67e8f9]' : 'h-10'"
        ></div>
        <div
          class="absolute right-6 top-1/2 -translate-y-1/2 w-3 border-r-[2px] border-y-[2px] border-cyan-400/80 shadow-[0_0_10px_#22d3ee] rounded-r-sm transition-all duration-300"
          :class="isDrawing ? 'h-16 border-cyan-300 shadow-[0_0_20px_#67e8f9]' : 'h-10'"
        ></div>

        <!-- إضاءة جانبية زرقاء خفيفة -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 mix-blend-screen"
        ></div>
      </div>

      <!-- 4. شريط السحب (The Reel) -->
      <div
        ref="reelContainer"
        class="absolute inset-x-0 top-0 flex flex-col items-center pt-[80px] z-10 w-full"
      >
        <div
          v-for="(guest, index) in displayList"
          :key="index"
          class="h-[100px] w-full flex items-center justify-center shrink-0"
        >
          <div
            class="flex items-center justify-center gap-5 w-full px-8 transition-all duration-300"
            dir="rtl"
            :class="[
              isWinnerRow(index)
                ? 'scale-110 opacity-100 z-50'
                : isDrawing
                  ? 'opacity-60 scale-95'
                  : 'opacity-30 scale-90',
            ]"
          >
            <!-- صورة النزيل (تحويل الهالة إلى الأزرق الفاتح عند الفوز) -->
            <div
              class="relative shrink-0 rounded-full p-[3px]"
              :class="
                isWinnerRow(index)
                  ? 'bg-gradient-to-tr from-cyan-600 via-cyan-100 to-cyan-600 shadow-[0_0_25px_#22d3ee] animate-pulse'
                  : 'bg-slate-800'
              "
            >
              <img
                :src="guest.image_url || guest.client?.image_url || '/default-avatar.png'"
                class="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-[3px] border-[#020617] z-10 bg-[#020617]"
                @error="(e) => (e.target.src = '/Empty.jpg')"
              />
            </div>

            <!-- بيانات النزيل -->
            <div class="flex flex-col justify-center">
              <!-- تركنا الاسم باللون الأصفر/الذهبي لأنه يعطي تباين (Contrast) رائع مع الأزرق -->
              <h2
                class="text-2xl md:text-3xl font-black tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-colors duration-500"
                :class="
                  isWinnerRow(index)
                    ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]'
                    : 'text-slate-100'
                "
              >
                {{ guest.name || guest.client?.name }}
              </h2>

              <div class="mt-1">
                <!-- تحويل الشارة (Badge) إلى الأزرق الفاتح -->
                <span
                  class="text-xs font-mono tracking-widest px-3 py-1 rounded-md border transition-colors duration-500"
                  :class="
                    isWinnerRow(index)
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.3)]'
                      : 'bg-[#020617]/50 text-slate-500 border-slate-800'
                  "
                >
                  ID: {{ guest.id || guest.client_id }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { useClientStore } from '@/stores/client.store'

const props = defineProps({
  isDrawing: Boolean,
  winner: Object,
})

const emit = defineEmits(['animation-complete'])
const clientStore = useClientStore()

const reelContainer = ref(null)
const displayList = ref([])
const itemHeight = 100

const prepareReel = () => {
  // نأخذ عينة من النزلاء
  const pool = [...(clientStore.clients || [])].sort(() => 0.5 - Math.random()).slice(0, 100)
  let longList = []

  if (pool.length > 0) {
    // زيادة التكرار إلى 20 بدلاً من 5 لزيادة مسافة الشريط
    for (let i = 0; i < 20; i++) {
      longList = [...longList, ...pool]
    }
  } else {
    // في حال عدم وجود بيانات، نكرر العناصر الوهمية 60 مرة
    for (let i = 0; i < 60; i++) {
      longList.push({
        id: `00${i}`,
        name: 'جاري اختيار النزيل...',
        image_url: '/default-avatar.png',
      })
    }
  }

  if (props.winner) {
    longList.push(props.winner)
  }

  displayList.value = longList
}

const runAnimation = () => {
  if (!reelContainer.value || displayList.value.length === 0) {
    emit('animation-complete')
    return
  }

  const totalDistance = (displayList.value.length - 1) * itemHeight

  gsap.fromTo(
    reelContainer.value,
    { y: 0 },
    {
      y: -totalDistance,
      duration: 15,
      ease: 'power4.inOut',
      onComplete: () => {
        emit('animation-complete')
      },
    },
  )
}

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
  return props.winner && !props.isDrawing && index === displayList.value.length - 1
}
</script>

<style scoped>
/* حركات المسح الضوئي لليزر الأزرق */
@keyframes laser-scan {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(200%);
    opacity: 0;
  }
}
.animate-laser-scan {
  animation: laser-scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes laser-scan-reverse {
  0% {
    transform: translateX(200%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}
.animate-laser-scan-reverse {
  animation: laser-scan-reverse 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
</style>
