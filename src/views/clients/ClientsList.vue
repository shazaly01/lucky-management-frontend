<!--src\views\clients\ClientsList.vue-->
<template>
  <div>
    <!-- رأس الصفحة -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 class="text-2xl font-bold text-text-primary">إدارة النزلاء</h1>

      <!-- مجموعة أزرار التحكم والوصول السريع -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- 1. زر رابط التسجيل المباشر (الأونلاين) للاختبار -->
        <a
          href="/guest-register"
          target="_blank"
          title="فتح شاشة تسجيل الزوار في نافذة جديدة"
          class="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl transition-all font-medium text-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span>رابط التسجيل الأونلاين</span>
        </a>

        <!-- 2. زر شاشة عرض الباركود (للمعرض) -->
        <router-link
          to="/qr-display"
          target="_blank"
          title="عرض شاشة الباركود الخاصة بالمعرض"
          class="flex items-center gap-2 px-4 py-2 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 border border-sky-500/20 rounded-xl transition-all font-medium text-sm"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <span>شاشة الباركود</span>
        </router-link>

        <!-- 3. زر الإضافة اليدوي (موجود سابقاً) -->
        <AppButton
          v-if="can('client.create')"
          @click="openClientModal()"
          class="!rounded-xl text-sm"
        >
          إضافة نزيل يدوي
        </AppButton>
      </div>
    </div>

    <!-- قطعة الجدول -->
    <ClientsTable
      :clients="clients"
      :pagination="pagination"
      :loading="loading"
      @page-change="handlePageChange"
      @edit-client="openClientModal"
      @delete-client="openDeleteDialog"
    />

    <!-- قطعة النافذة المنبثقة (إضافة/تعديل) -->
    <ClientModal
      v-if="isModalOpen"
      v-model="isModalOpen"
      :client="selectedClient"
      :is-saving="isSaving"
      @save="handleSaveClient"
    />

    <!-- نافذة تأكيد الحذف -->
    <AppConfirmDialog
      v-model="isDeleteDialogOpen"
      title="تأكيد حذف النزيل"
      :message="`هل أنت متأكد من رغبتك في حذف النزيل '${clientToDelete?.name}'؟`"
      @confirmed="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'
import { useClientStore } from '@/stores/client.store'
import { useAuthStore } from '@/stores/authStore'

// استيراد قطع الليغو
import AppButton from '@/components/ui/AppButton.vue'
import AppConfirmDialog from '@/components/ui/AppConfirmDialog.vue'
import ClientsTable from './ClientsTable.vue'
import ClientModal from './ClientModal.vue'

// --- إدارة الحالة ---
const clientStore = useClientStore()
const { can } = useAuthStore()
const { clients, loading, pagination } = storeToRefs(clientStore)
const toast = useToast()

const isModalOpen = ref(false)
const isSaving = ref(false)
const selectedClient = ref(null)

const isDeleteDialogOpen = ref(false)
const clientToDelete = ref(null)

// --- دوال جلب البيانات ---
const handlePageChange = (page = 1) => {
  clientStore.fetchClients(page).catch(() => {
    toast.error('حدث خطأ أثناء جلب قائمة النزلاء.')
  })
}

onMounted(() => {
  handlePageChange()
})

// --- معالجة الإضافة والتعديل ---
const openClientModal = (client = null) => {
  selectedClient.value = client ? { ...client } : null
  isModalOpen.value = true
}

const handleSaveClient = async (formData) => {
  isSaving.value = true
  try {
    const clientId = formData.get('id')
    if (clientId) {
      await clientStore.updateClient(clientId, formData)
      toast.success('تم تحديث بيانات النزيل بنجاح.')
    } else {
      await clientStore.createClient(formData)
      toast.success('تم إضافة النزيل الجديد بنجاح.')
    }
    isModalOpen.value = false
    handlePageChange(pagination.value.current_page)
  } catch (error) {
    const msg = error.response?.data?.message || 'فشل حفظ البيانات.'
    toast.error(msg)
  } finally {
    isSaving.value = false
  }
}

// --- معالجة الحذف ---
const openDeleteDialog = (client) => {
  clientToDelete.value = client
  isDeleteDialogOpen.value = true
}

const confirmDelete = async () => {
  if (!clientToDelete.value) return

  try {
    await clientStore.deleteClient(clientToDelete.value.id)
    toast.success('تم حذف النزيل بنجاح.')
    // العودة للصفحة السابقة إذا تم حذف آخر عنصر في الصفحة الحالية
    const targetPage =
      clients.value.length === 1 && pagination.value.current_page > 1
        ? pagination.value.current_page - 1
        : pagination.value.current_page
    handlePageChange(targetPage)
  } catch (error) {
    toast.error('حدث خطأ أثناء محاولة الحذف.')
  } finally {
    isDeleteDialogOpen.value = false
    clientToDelete.value = null
  }
}
</script>
