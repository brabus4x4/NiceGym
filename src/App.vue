<template>

  <HeaderVue />
  <MainScreen />
  <MainSection />
  <FooterVue />

</template>

<script>
import HeaderVue from './components/Header.vue';
import MainScreen from './components/MainScreen.vue';
import MainSection from './components/MainSection.vue';
import FooterVue from './components/FooterVue.vue';



export default {
  components: {
    HeaderVue,
    MainScreen,
    MainSection,
    FooterVue
    
  },
};
</script>

<style scoped>

</style>