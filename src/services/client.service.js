import apiClient from './apiClient'

const resource = '/clients'

export default {
  // جلب جميع العملاء (مع دعم التقسيم لصفحات - Pagination)
  get(page = 1) {
    return apiClient.get(`${resource}?page=${page}`)
  },

  // جلب عميل محدد
  find(id) {
    return apiClient.get(`${resource}/${id}`)
  },

  // إضافة عميل جديد (ندعم رفع الصورة عبر multipart/form-data)
  create(payload) {
    return apiClient.post(resource, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // تحديث بيانات عميل
  // ملاحظة: لارافيل يتطلب إرسال التحديث كـ POST مع إضافة payload.append('_method', 'PUT') إذا كان هناك ملف
  update(id, payload) {
    return apiClient.post(`${resource}/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // حذف عميل (Soft Delete كما تم في الباك إند)
  delete(id) {
    return apiClient.delete(`${resource}/${id}`)
  },
}
