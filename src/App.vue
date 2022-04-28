<template>
  <AppHeader />

  <router-view v-slot="{ Component }" >
    <transition name="fade" mode="out-in">
      <component v-bind:is="Component"></component>
    </transition>
  </router-view>

  <AppPlayer>
  </AppPlayer>
<AuthModal />
</template>
<script>
// components
import AppHeader from './components/Header.vue';
import AuthModal from './components/Auth.vue';
import AppPlayer from './components/Player.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;

}

.fade-enter-active {

  transition: all 300ms linear;
}

.fade-leave-to {
  transition: all 300ms linear;
  opacity: 0;
}
</style>
