<template>
  <f7-page>
    <f7-navbar>
      <!--<f7-nav-left>
        <f7-link class="panel-open" open-panel="left" icon="fas fa-bars"></f7-link>
      </f7-nav-left>-->
      <div class="title">Home</div>
      <f7-nav-right>
        <img :src="logo" class="logo">
      </f7-nav-right>
    </f7-navbar>
    <f7-block-title>Introduction test</f7-block-title>
    <f7-block inner>
      <p>This is template for Framework75, Vue and Phonegap.</p>
    </f7-block>
    <f7-block-title class="searchbar-found">Links</f7-block-title>


  </f7-page>
</template>
<script>
import logo from '../../images/logo-nav.png';
export default {
    data() {
    return {
      logo,
    }
  },
  components: {}
};
</script>

<style scoped>

</style>
