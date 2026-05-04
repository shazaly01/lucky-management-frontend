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
        <div
          v-for="winner in recentWinners"
          :key="winner.id"
          class="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
        >
          <img
            :src="winner.image_url || '/default-avatar.png'"
            class="w-10 h-10 rounded-full border border-gold-500/30 object-cover"
          />
          <div class="overflow-hidden">
            <p class="text-sm font-bold text-white truncate">{{ winner.name }}</p>
            <p class="text-[10px] text-gold-500/70 font-mono">{{ winner.phone }}</p>
          </div>
        </div>

        <!-- حالة عدم وجود فائزين بعد -->
        <div v-if="recentWinners.length === 0" class="text-center py-10 opacity-30">
          <p class="text-xs italic">بانتظار الفائز الأول...</p>
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
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(234, 179, 8, 0.2);
  border-radius: 10px;
}
</style>
