import apiClient from './apiClient'

const resource = '/lottery-draws'

export default {
  // جلب سجل السحوبات السابقة مع دعم التقسيم لصفحات
  get(page = 1) {
    return apiClient.get(`${resource}?page=${page}`)
  },

  // إجراء سحب جديد أوتوماتيكي
  create() {
    return apiClient.post(resource)
  },

  // إلغاء/حذف سحب
  delete(id) {
    return apiClient.delete(`${resource}/${id}`)
  },
}
