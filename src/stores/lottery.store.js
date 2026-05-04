//src\stores\lottery.store.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import lotteryService from '@/services/lottery.service'

export const useLotteryStore = defineStore('lottery', () => {
  const draws = ref([])
  const pagination = ref({ current_page: 1, last_page: 1, total: 0 })
  const loading = ref(false)
  const isDrawing = ref(false)
  const error = ref(null)

  // الحالة الجديدة للفلاتر
  const filters = ref({
    date: '', // سيتم ربطه بـ Input من نوع date في الواجهة
    per_page: 15,
  })

  /**
   * جلب سجل السحوبات مع دمج الفلاتر الحالية
   */
  async function fetchDraws(page = 1) {
    loading.value = true
    error.value = null
    try {
      const response = await lotteryService.get({
        page,
        date: filters.value.date,
        per_page: filters.value.per_page,
      })

      draws.value = response.data.data
      // تحديث بيانات الترقيم بناءً على استجابة المورد (Resource)
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

  /**
   * إجراء عملية السحب
   */
  async function conductDraw() {
    if (isDrawing.value) return null

    isDrawing.value = true
    error.value = null
    try {
      const response = await lotteryService.create()
      // عند نجاح السحب، نصفر فلتر التاريخ لرؤية الفائز الجديد في قائمة "الكل"
      // أو نبقيه كما هو حسب منطق العمل المفضل لديك.
      await fetchDraws(1)
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل في إجراء السحب.'
      throw err
    } finally {
      isDrawing.value = false
    }
  }

  /**
   * إلغاء سحب
   */
  async function cancelDraw(id) {
    loading.value = true
    error.value = null
    try {
      await lotteryService.delete(id)
      await fetchDraws(pagination.value.current_page)
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
    filters, // تصدير الفلاتر ليتم ربطها بـ v-model في المكونات
    fetchDraws,
    conductDraw,
    cancelDraw,
  }
})
