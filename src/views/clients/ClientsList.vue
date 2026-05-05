<!--src\views\clients\ClientsList.vue-->
<template>
  <div>
    <!-- رأس الصفحة -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-text-primary">إدارة النزلاء</h1>
      <AppButton v-if="can('client.create')" @click="openClientModal()">
        إضافة نزيل جديد
      </AppButton>
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
