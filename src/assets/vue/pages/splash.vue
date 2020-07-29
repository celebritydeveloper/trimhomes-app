<template>
  <f7-page class="splash">
      <f7-page-content class="splash--content">
          <div class="splash--white">
            <img :src="logo" alt="">
        </div>
      </f7-page-content>
        
  </f7-page>
</template>

<script>
import bg from '../../images/trim-bg.png';
import logo from '../../images/logo.png';
export default {
    data() {
        return {
            bg,
            logo,
        }
    }

}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500&display=swap');

    body {
        font-family: 'Montserrat', sans-serif;
    }
    .splash {
        background: linear-gradient(to right, rgba(43, 61, 76, 0.5), rgba(43, 61, 76, 0.5)), url('../../images/trim-bg.png') no-repeat;
        background-color: white;
        background-size: cover;
        background-position: contain;
    }

    .splash--content {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .splash--white {
        align-items: center;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>