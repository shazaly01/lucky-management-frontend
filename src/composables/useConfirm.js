import { ref } from 'vue'

/**
 * Composable لإدارة نوافذ التأكيد (Confirmation Dialogs)
 * يوفر طريقة نظيفة لطلب تأكيد المستخدم قبل العمليات الحساسة (مثل الحذف)
 */
export function useConfirm() {
  const isVisible = ref(false)
  const title = ref('')
  const message = ref('')
  const type = ref('primary') // primary, danger, warning

  let resolvePromise

  /**
   * دالة التأكيد الرئيسية
   * @param {Object} options - { title, message, type }
   * @returns {Promise<Boolean>}
   */
  const confirm = (options = {}) => {
    title.value = options.title || 'تأكيد العملية'
    message.value = options.message || 'هل أنت متأكد من الاستمرار؟'
    type.value = options.type || 'primary'

    // إظهار النافذة (إذا كنت تستخدم Modal مخصص)
    // في الوقت الحالي سنستخدم confirm المتصفح لضمان عمل الكود فوراً
    // ويمكنك لاحقاً ربطisVisible بمكون Modal من Panda UI

    return new Promise((resolve) => {
      const result = window.confirm(`${title.value}\n\n${message.value}`)
      resolve(result)
    })
  }

  return {
    confirm,
    isVisible,
    title,
    message,
    type,
  }
}
