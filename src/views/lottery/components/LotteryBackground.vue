<template>
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
    <!-- بقع ضوئية متحركة -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold-900/10 rounded-full blur-[120px] animate-blob"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] animate-blob animation-delay-2000"
    ></div>

    <!-- شبكة خلفية خفيفة (Grid) -->
    <div
      class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"
    ></div>

    <!-- تدرج ناعم للحواف -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"
    ></div>
  </div>
</template>

<style scoped>
@keyframes blob {
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
.animate-blob {
  animation: blob 10s infinite alternate;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
