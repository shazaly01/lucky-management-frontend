<!--src\views\clients\ClientModal.vue-->
<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      @click.self="close"
    >
      <div
        class="bg-surface-section rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-surface-border"
      >
        <!-- الرأس -->
        <div
          class="px-6 py-4 border-b border-surface-border flex justify-between items-center bg-surface-ground"
        >
          <h3 class="text-lg font-bold text-text-primary">{{ title }}</h3>
          <button @click="close" class="text-text-muted hover:text-text-primary transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- المحتوى (استدعاء الفورم) -->
        <div class="p-6">
          <ClientForm
            :initial-data="client"
            :is-saving="isSaving"
            @submit="$emit('save', $event)"
            @cancel="close"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import ClientForm from './ClientForm.vue'

const props = defineProps({
  modelValue: Boolean,
  client: Object,
  isSaving: Boolean,
})

const emit = defineEmits(['update:modelValue', 'save'])

const title = computed(() => (props.client?.id ? 'تعديل بيانات النزيل' : 'إضافة نزيل جديد'))
const close = () => emit('update:modelValue', false)
</script>
