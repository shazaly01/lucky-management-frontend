<template>
  <div>
    <AppTable :headers="headers" :items="clients" :is-loading="loading" :row-clickable="false">
      <!-- تخصيص عرض صورة النزيل -->
      <template #cell-image_url="{ item }">
        <div class="flex items-center justify-center">
          <img
            :src="item.image_url || '/default-avatar.png'"
            class="w-10 h-10 rounded-full object-cover border border-surface-border"
            alt="صورة النزيل"
          />
        </div>
      </template>

      <!-- تخصيص عمود العمليات -->
      <template #cell-actions="{ item }">
        <div class="flex items-center justify-end gap-2">
          <!-- زر التعديل: يظهر فقط لمن يملك الصلاحية -->
          <AppButton
            v-if="can('client.update')"
            variant="secondary"
            size="sm"
            @click="$emit('edit-client', item)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </AppButton>

          <!-- زر الحذف: يظهر فقط لمن يملك الصلاحية -->
          <AppButton
            v-if="can('client.delete')"
            variant="danger"
            size="sm"
            @click="$emit('delete-client', item)"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </AppButton>
        </div>
      </template>
    </AppTable>

    <!-- الترقيم (Pagination) -->
    <div v-if="pagination.last_page > 1" class="mt-4 flex justify-center">
      <!-- نفترض وجود مكون AppPagination أو أزرار بسيطة -->
      <div class="flex gap-2">
        <AppButton
          :disabled="pagination.current_page === 1"
          @click="$emit('page-change', pagination.current_page - 1)"
          variant="secondary"
          size="sm"
        >
          السابق
        </AppButton>
        <span class="flex items-center px-4 text-sm text-text-muted">
          صفحة {{ pagination.current_page }} من {{ pagination.last_page }}
        </span>
        <AppButton
          :disabled="pagination.current_page === pagination.last_page"
          @click="$emit('page-change', pagination.current_page + 1)"
          variant="secondary"
          size="sm"
        >
          التالي
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppTable from '@/components/ui/AppTable.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  clients: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  pagination: { type: Object, required: true },
})

const emit = defineEmits(['edit-client', 'delete-client', 'page-change'])

const { can } = useAuthStore() // استخدام دالة الصلاحيات من الـ store

// تعريف رؤوس الجدول بدقة لتطابق الـ Slots
const headers = [
  { key: 'image_url', label: 'الصورة', class: 'w-20 text-center' },
  { key: 'name', label: 'اسم النزيل' },
  { key: 'phone', label: 'رقم الهاتف' },
  { key: 'created_at', label: 'تاريخ التسجيل' },
  { key: 'actions', label: 'العمليات', class: 'text-left' },
]
</script>
