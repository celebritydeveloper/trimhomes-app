import Home from './assets/vue/pages/home.vue';
import HomePage from './assets/vue/pages/home1.vue';
import AboutPage from './assets/vue/pages/about.vue';
import SplashPage from './assets/vue/pages/splash.vue';
import IndexPage from './assets/vue/pages/index.vue';
import RegisterPage from './assets/vue/pages/register.vue';
import SignInPage from './assets/vue/pages/login.vue';
import VerifyTokenPage from './assets/vue/pages/verify-token.vue';
import SetPasswordPage from './assets/vue/pages/set-password.vue';
import SettingsPage from './assets/vue/pages/settings.vue';
import UpdateProfilePage from './assets/vue/pages/update-profile.vue';
import UpdateAccountPage from './assets/vue/pages/update-account.vue';
import UpdatePasswordPage from './assets/vue/pages/update-password.vue';
import ForgotPasswordPage from './assets/vue/pages/forgot-password.vue';
import ProjectSinglePage from './assets/vue/pages/project-single.vue';
import PaymentDetailPage from './assets/vue/pages/payment-detail.vue';
import PortfolioSinglePage from './assets/vue/pages/portfolio-single.vue';

import DynamicRoutePage from './assets/vue/pages/dynamic-route.vue';

import PanelLeftPage from './assets/vue/pages/panel-left.vue';
import ColorThemes from './assets/vue/pages/color-themes.vue';
import Chat from './assets/vue/pages/chat.vue';
import Vuex from './assets/vue/pages/vuex.vue';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home1/',
    component: HomePage
  },
  {
    path: '/about/',
    component: AboutPage
  },
  {
    path: '/splash/',
    component: SplashPage
  },
  {
    path: '/index/',
    component: IndexPage
  },
  {
    path: '/register/',
    component: RegisterPage
  },
  {
    path: '/login/',
    component: SignInPage
  },
  {
    path: '/verify-token/',
    component: VerifyTokenPage
  },
  {
    path: '/set-password/',
    component: SetPasswordPage
  },
  {
    path: '/settings/',
    component: SettingsPage
  }, 
  {
    path: '/update-profile/',
    component: UpdateProfilePage
  },  
  {
    path: '/update-account/',
    component: UpdateAccountPage
  },  
  {
    path: '/update-password/',
    component: UpdatePasswordPage
  },
  {
    path: '/forgot-password/',
    component: ForgotPasswordPage
  },
  {
    path: '/projectSingle/:project',
    component: ProjectSinglePage
  },
  {
    path: '/payment-detail/',
    component: PaymentDetailPage
  },
  {
    path: '/portfolioSingle/:project',
    component: PortfolioSinglePage
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage
  },
  {
    path: '/color-themes/',
    component: ColorThemes
  },
  {
    path: '/chat/',
    component: Chat
  },
  {
    path: '/vuex/',
    component: Vuex
  },
];
