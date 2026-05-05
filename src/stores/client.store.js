import { defineStore } from 'pinia'
import { ref } from 'vue'
import clientService from '@/services/client.service'

export const useClientStore = defineStore('client', () => {
  const clients = ref([])
  const pagination = ref({ current_page: 1, last_page: 1, total: 0 })
  const currentClient = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // جلب قائمة العملاء
  async function fetchClients(page = 1) {
    loading.value = true
    error.value = null
    try {
      const response = await clientService.get(page)
      clients.value = response.data.data
      // تخزين بيانات التقسيم لصفحات القادمة من لارافيل
      pagination.value = response.data.meta || {
        current_page: 1,
        last_page: 1,
        total: response.data.data.length,
      }
    } catch (err) {
      error.value = 'فشل في تحميل قائمة العملاء.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // جلب بيانات عميل واحد
  async function fetchClient(id) {
    loading.value = true
    error.value = null
    try {
      const response = await clientService.find(id)
      currentClient.value = response.data.data
    } catch (err) {
      error.value = 'فشل في تحميل بيانات العميل.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // إضافة عميل جديد (من داخل لوحة التحكم)
  async function createClient(payload) {
    loading.value = true
    error.value = null
    try {
      await clientService.create(payload)
      await fetchClients() // تحديث القائمة للعودة للصفحة الأولى ورؤية الإضافة
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل في إضافة العميل.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // إضافة عميل جديد (من شاشة التسجيل الخارجية للزوار)
  async function createPublicClient(payload) {
    loading.value = true
    error.value = null
    try {
      await clientService.createPublic(payload)
      // ملاحظة: لا نستدعي fetchClients هنا لأن الزائر ليس لديه صلاحيات الإدارة ولا يحتاج للقائمة
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل في إرسال طلب التسجيل.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // تحديث بيانات عميل
  async function updateClient(id, payload) {
    loading.value = true
    error.value = null
    try {
      await clientService.update(id, payload)
      await fetchClients(pagination.value.current_page) // البقاء في نفس الصفحة
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل في تحديث بيانات العميل.'
      throw err
    } finally {
      loading.value = false
    }
  }

  // حذف عميل
  async function deleteClient(id) {
    loading.value = true
    error.value = null
    try {
      await clientService.delete(id)
      await fetchClients(pagination.value.current_page)
    } catch (err) {
      error.value = err.response?.data?.message || 'لا يمكن حذف العميل.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    clients,
    pagination,
    currentClient,
    loading,
    error,
    fetchClients,
    fetchClient,
    createClient,
    createPublicClient,
    updateClient,
    deleteClient,
  }
})
