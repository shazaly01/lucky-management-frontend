import apiClient from './apiClient'

const resource = '/lottery-draws'

export default {
  /**
   * جلب سجل السحوبات مع دعم الفلترة (التاريخ، الصفحة، إلخ)
   * @param {Object} params - كائن يحتوي على { page, date, per_page }
   */
  get(params = {}) {
    return apiClient.get(resource, { params })
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
