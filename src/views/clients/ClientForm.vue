<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-5">
      <!-- حقل الاسم -->
      <AppInput
        id="client-name"
        label="اسم النزيل"
        v-model="form.name"
        placeholder="ادخل اسم النزيل الرباعي"
        required
      />

      <!-- حقل الهاتف -->
      <AppInput
        id="client-phone"
        label="رقم الهاتف"
        v-model="form.phone"
        placeholder="مثال: 09..."
        required
      />

      <!-- حقل رفع الصورة الشخصية -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-text-secondary">الصورة الشخصية</label>
        <div class="flex items-center gap-4">
          <!-- معاينة الصورة -->
          <div
            class="w-20 h-20 rounded-lg border-2 border-dashed border-surface-border overflow-hidden flex items-center justify-center bg-surface-ground"
          >
            <img v-if="previewUrl" :src="previewUrl" class="w-full h-full object-cover" />
            <svg
              v-else
              class="w-8 h-8 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <!-- زر الرفع -->
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            accept="image/*"
            @change="handleFileChange"
          />
          <AppButton type="button" variant="secondary" size="sm" @click="$refs.fileInput.click()">
            اختر صورة
          </AppButton>
        </div>
      </div>
    </div>

    <!-- أزرار التحكم -->
    <div class="mt-8 flex justify-end space-x-3 space-x-reverse">
      <AppButton type="button" variant="secondary" @click="$emit('cancel')"> إلغاء </AppButton>
      <AppButton type="submit" :disabled="isSaving" :loading="isSaving">
        {{ form.id ? 'تعديل البيانات' : 'حفظ النزيل' }}
      </AppButton>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const props = defineProps({
  initialData: { type: Object, default: null },
  isSaving: { type: Boolean, default: false },
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  id: null,
  name: '',
  phone: '',
  image: null,
})

const previewUrl = ref(null)

// مراقبة البيانات الابتدائية (عند التعديل)
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.value = { ...newData, image: null }
      previewUrl.value = newData.image_url // عرض الصورة القادمة من السيرفر
    } else {
      form.value = { id: null, name: '', phone: '', image: null }
      previewUrl.value = null
    }
  },
  { immediate: true },
)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.image = file
    previewUrl.value = URL.createObjectURL(file) // معاينة محلية
  }
}

const handleSubmit = () => {
  // تحويل البيانات إلى FormData لأننا نرفع ملفات
  const formData = new FormData()
  if (form.value.id) {
    formData.append('id', form.value.id)
    formData.append('_method', 'PUT') // مهم للارافيل في تحديث الملفات
  }
  formData.append('name', form.value.name)
  formData.append('phone', form.value.phone)
  if (form.value.image) {
    formData.append('image', form.value.image)
  }

  emit('submit', formData)
}
</script>
