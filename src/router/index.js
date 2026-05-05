import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// --- استيراد التخطيطات الرئيسية (Layouts) ---
import AppLayout from '@/components/layout/AppLayout.vue'
import AuthLayout from '@/components/layout/AuthLayout.vue'

// --- استيراد الصفحات الأساسية ---
import LoginView from '@/views/LoginView.vue'

// --- استيراد صفحات النظام ديناميكياً (Lazy Loading) ---
const DashboardView = () => import('@/views/dashboard/DashboardView.vue')
const UsersList = () => import('@/views/users/UsersList.vue')
const RolesList = () => import('@/views/roles/RolesList.vue')
const BackupsList = () => import('@/views/settings/BackupsList.vue')
const ClientsList = () => import('@/views/clients/ClientsList.vue')
const LotteryView = () => import('@/views/lottery/LotteryView.vue')
const LotteryIndex = () => import('@/views/lottery/LotteryIndex.vue')

// --- الشاشات العامة الجديدة (لا تتطلب تسجيل دخول) ---
const GuestRegisterView = () => import('@/views/clients/GuestRegisterView.vue')
const QrDisplayView = () => import('@/views/clients/QrDisplayView.vue')

const routes = [
  // --- 1. المسارات العامة (Auth) ---
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: LoginView },
      { path: '', redirect: '/login' },
    ],
  },

  // --- 2. الشاشات العامة الخارجية (التسجيل والـ QR) ---
  {
    path: '/guest-register',
    name: 'GuestRegister',
    component: GuestRegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: '/qr-display',
    name: 'QrDisplay',
    component: QrDisplayView,
    meta: { requiresAuth: false },
  },

  // --- 3. شاشة القرعة (Full Screen) ---
  {
    path: '/lottery-screen',
    name: 'LotteryScreen',
    component: LotteryView,
    meta: {
      requiresAuth: true,
      permission: 'lottery_draw.create',
    },
  },

  // --- 4. المسارات الإدارية (داخل AppLayout) ---
  {
    path: '/app',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { permission: 'dashboard.view' },
      },
      {
        path: 'users',
        name: 'UsersList',
        component: UsersList,
        meta: { permission: 'user.view' },
      },
      {
        path: 'roles',
        name: 'RolesList',
        component: RolesList,
        meta: { permission: 'role.view' },
      },
      {
        path: 'settings/backups',
        name: 'BackupsList',
        component: BackupsList,
        meta: { permission: 'backup.view' },
      },
      {
        path: 'clients',
        name: 'ClientsList',
        component: ClientsList,
        meta: { permission: 'client.view' },
      },
      {
        path: 'lottery-log',
        name: 'LotteryIndex',
        component: LotteryIndex,
        meta: { permission: 'lottery_draw.view' },
      },
      { path: '', redirect: '/app/dashboard' },
    ],
  },

  // مسار الـ 404
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// --- حارس التنقل العام (Global Navigation Guard) ---
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { isAuthenticated, can } = authStore

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      authStore.returnUrl = to.fullPath
      next({ name: 'Login' })
    } else {
      const requiredPermission = to.meta.permission
      if (requiredPermission && !can(requiredPermission)) {
        console.warn(`Access denied: requires "${requiredPermission}"`)
        next({ name: 'Dashboard' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
