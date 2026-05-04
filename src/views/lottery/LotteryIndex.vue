<template>
  <div class="p-6 space-y-6 text-right" dir="rtl">
    <!-- رأس الصفحة -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">سجل الفائزين</h1>
        <p class="text-slate-400 text-sm">مراجعة وإدارة كافة سحوبات القرعة السابقة</p>
      </div>

      <!-- فلتر التاريخ -->
      <div class="flex items-center gap-3 w-full md:w-auto">
        <span class="text-sm text-slate-400 whitespace-nowrap">فلترة باليوم:</span>
        <AppInput
          id="lottery-date-filter"
          v-model="lotteryStore.filters.date"
          type="date"
          class="w-full md:w-48"
          @change="handleFilterChange"
        />
        <AppButton variant="secondary" @click="lotteryStore.fetchDraws(1)"> تحديث </AppButton>
      </div>
    </div>

    <!-- حاوية الجدول -->
    <div class="space-y-4">
      <AppTable
        :headers="tableHeaders"
        :items="lotteryStore.draws"
        :is-loading="lotteryStore.loading"
        :row-clickable="false"
      >
        <!-- كولوم العميل: نستخدم cell-client بناءً على تعريف المكون لديك -->
        <template #cell-client="{ item }">
          <div class="flex items-center gap-3">
            <img
              :src="item.client?.image_url || '/Empty.jpg'"
              class="w-10 h-10 rounded-full object-cover border border-surface-border"
            />
            <div class="flex flex-col">
              <span class="font-bold text-white">{{ item.client?.name }}</span>
              <span class="text-xs text-text-muted">ID: #{{ item.client?.id }}</span>
            </div>
          </div>
        </template>

        <!-- كولوم الهاتف -->
        <template #cell-phone="{ item }">
          <span class="font-mono text-text-secondary">{{ item.client?.phone }}</span>
        </template>

        <!-- كولوم تاريخ السحب -->
        <template #cell-draw_date="{ item }">
          <div class="flex flex-col">
            <span class="text-sm text-text-secondary">{{ formatDate(item.draw_date) }}</span>
            <span class="text-[10px] text-text-muted">{{ formatTime(item.draw_date) }}</span>
          </div>
        </template>

        <!-- كولوم العمليات -->
        <template #cell-actions="{ item }">
          <AppButton variant="danger" size="sm" @click="confirmDelete(item)">
            إلغاء الفوز
          </AppButton>
        </template>
      </AppTable>

      <!-- الترقيم (خارج الجدول لأن AppTable لا يدعم slot footer) -->
      <div
        v-if="lotteryStore.pagination.last_page > 1"
        class="flex justify-center p-4 bg-surface-section rounded-xl border border-surface-border"
      >
        <AppPagination
          v-model="lotteryStore.pagination.current_page"
          :total-pages="lotteryStore.pagination.last_page"
          @change="lotteryStore.fetchDraws"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLotteryStore } from '@/stores/lottery.store'
import { useToast } from 'vue-toastification'
import { useConfirm } from '@/composables/useConfirm'
import AppTable from '@/components/ui/AppTable.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPagination from '@/components/ui/AppPagination.vue'

const lotteryStore = useLotteryStore()
const toast = useToast()
const { confirm } = useConfirm()

// تعريف الأعمدة - تأكد من تطابق key مع keys البيانات ومع مسميات slots
const tableHeaders = [
  { key: 'client', label: 'الفائز' },
  { key: 'phone', label: 'رقم الهاتف' },
  { key: 'draw_date', label: 'تاريخ السحب' },
  { key: 'actions', label: 'العمليات', cellClass: 'text-left' },
]

onMounted(() => {
  lotteryStore.fetchDraws(1)
})

const handleFilterChange = () => {
  lotteryStore.fetchDraws(1)
}

const confirmDelete = async (item) => {
  const isConfirmed = await confirm({
    title: 'إلغاء نتيجة السحب؟',
    message: `هل أنت متأكد من إلغاء فوز "${item.client?.name}"؟`,
    type: 'danger',
  })

  if (isConfirmed) {
    try {
      await lotteryStore.cancelDraw(item.id)
      toast.success('تم إلغاء السحب بنجاح.')
    } catch (error) {
      toast.error('حدث خطأ أثناء محاولة الإلغاء.')
    }
  }
}

const formatDate = (dateString) => new Date(dateString).toLocaleDateString('ar-SD')
const formatTime = (dateString) =>
  new Date(dateString).toLocaleTimeString('ar-SD', { hour: '2-digit', minute: '2-digit' })
</script>
