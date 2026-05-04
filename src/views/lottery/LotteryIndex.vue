<template>
  <div class="p-6">
    <!-- رأس الصفحة -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-white">سجل الفائزين</h1>
    </div>

    <!-- حاوية الجدول (سنقوم بربطها بالـ API لاحقاً) -->
    <div class="bg-surface-section rounded-xl border border-surface-border overflow-hidden">
      <div class="p-12 text-center">
        <svg
          class="w-16 h-16 text-text-muted mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p class="text-text-secondary text-lg">لا يوجد فائزون مسجلون في الوقت الحالي.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// هنا سنقوم بجلب البيانات من lotteryStore لاحقاً
</script>
