import Home from './assets/vue/pages/home.vue';
import HomePage from './assets/vue/pages/home1.vue';
import AboutPage from './assets/vue/pages/about.vue';
import SplashPage from './assets/vue/pages/splash.vue';
import IndexPage from './assets/vue/pages/index.vue';
import RegisterPage from './assets/vue/pages/register.vue';
import SignInPage from './assets/vue/pages/login.vue';
import VerifyTokenPage from './assets/vue/pages/verify-token.vue';
import SetPasswordPage from './assets/vue/pages/set-password.vue';
import ForgotPasswordPage from './assets/vue/pages/forgot-password.vue';
import ProjectSinglePage from './assets/vue/pages/project-single.vue';

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
    path: '/forgot-password/',
    component: ForgotPasswordPage
  },
  {
    path: '/project-single/',
    component: ProjectSinglePage
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
