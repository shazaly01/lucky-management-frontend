import { defineStore } from 'pinia'
import { ref } from 'vue'
import lotteryService from '@/services/lottery.service'

export const useLotteryStore = defineStore('lottery', () => {
  const draws = ref([])
  const pagination = ref({ current_page: 1, last_page: 1, total: 0 })
  const loading = ref(false)
  const isDrawing = ref(false) // حالة مخصصة لزر السحب لمنع النقر المزدوج (حل ثغرة التزامن)
  const error = ref(null)

  // جلب سجل السحوبات
  async function fetchDraws(page = 1) {
    loading.value = true
    error.value = null
    try {
      const response = await lotteryService.get(page)
      draws.value = response.data.data
      pagination.value = response.data.meta || {
        current_page: 1,
        last_page: 1,
        total: response.data.data.length,
      }
    } catch (err) {
      error.value = 'فشل في تحميل سجل السحوبات.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // إجراء عملية السحب الأوتوماتيكية
  async function conductDraw() {
    // منع تنفيذ الدالة إذا كان السحب جارياً بالفعل
    if (isDrawing.value) return null

    isDrawing.value = true
    error.value = null
    try {
      const response = await lotteryService.create()
      await fetchDraws() // تحديث القائمة فوراً لإظهار الفائز الجديد في الجدول
      return response.data.data // إرجاع بيانات الفائز ليتم عرضها كإشعار نجاح في الواجهة
    } catch (err) {
      // التقاط رسالة الخطأ من الباك إند (مثل: "هناك عملية سحب تجري حالياً" أو "لا يوجد عملاء")
      error.value = err.response?.data?.message || 'فشل في إجراء السحب.'
      throw err
    } finally {
      isDrawing.value = false
    }
  }

  // إلغاء أو حذف سحب معين
  async function cancelDraw(id) {
    loading.value = true
    error.value = null
    try {
      await lotteryService.delete(id)
      await fetchDraws(pagination.value.current_page) // تحديث الصفحة الحالية
    } catch (err) {
      error.value = err.response?.data?.message || 'لا يمكن إلغاء السحب.'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    draws,
    pagination,
    loading,
    isDrawing,
    error,
    fetchDraws,
    conductDraw,
    cancelDraw,
  }
})
