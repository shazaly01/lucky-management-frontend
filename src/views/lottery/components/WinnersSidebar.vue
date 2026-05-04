<!--src\views\lottery\components\WinnersSidebar.vue-->
<template>
  <div class="fixed left-6 top-1/2 -translate-y-1/2 z-20 w-64 hidden xl:block">
    <div class="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">
      <div class="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
        <div class="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></div>
        <h3 class="text-sm font-bold uppercase tracking-widest text-slate-300">آخر الفائزين</h3>
      </div>

      <TransitionGroup
        name="list"
        tag="div"
        class="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        <!-- التعديل هنا: الوصول لبيانات العميل عبر winner.client -->
        <div
          v-for="draw in recentWinners"
          :key="draw.id"
          class="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
        >
          <img
            :src="draw.client?.image_url || '/Empty.jpg'"
            class="w-10 h-10 rounded-full border border-gold-500/30 object-cover"
          />
          <div class="overflow-hidden">
            <p class="text-sm font-bold text-white truncate">
              {{ draw.client?.name || 'فائز غير معروف' }}
            </p>
            <p class="text-[10px] text-gold-500/70 font-mono">
              {{ formatPhone(draw.client?.phone) }}
            </p>
          </div>
        </div>

        <!-- حالة عدم وجود فائزين -->
        <div v-if="recentWinners.length === 0" class="text-center py-10 opacity-30">
          <p class="text-xs italic text-white">بانتظار الفائز الأول...</p>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recentWinners: {
    type: Array,
    default: () => [],
  },
})

// دالة لتنسيق الرقم لضمان الخصوصية والاتساق مع الشاشة الرئيسية
const formatPhone = (phone) => {
  if (!phone) return '***'
  const p = String(phone)
  return p.length > 6 ? `${p.substring(0, 4)}****${p.substring(p.length - 2)}` : p
}
</script>

<style scoped>
/* تحسين الأنيميشن ليكون أكثر انسيابية */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.list-move {
  transition: transform 0.4s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateX(-10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(234, 179, 8, 0.3);
  border-radius: 10px;
}
</style>
