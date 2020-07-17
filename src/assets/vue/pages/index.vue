<template>
  <f7-page class="index">
    <div class="block block-strong">
      <img :src="logo" class="logo">
      <p>Welcome to our exclusive collection of project and contributor community, where we pool resources to achieve our goals.</p>
    </div>
    <div class="actions">
      <f7-button class="login--btn">Sign In</f7-button>
      <f7-button class="signup--btn" href="/signup/">Sign Up</f7-button>
    </div>
  </f7-page>
</template>
<script>
import logo from '../../images/logo-small.png';
export default {
  data() {
    return {
      logo,
    }
  },
  components: {},
};
</script>

<style scoped>

  body {
        font-family: 'Montserrat', sans-serif;
    }

  .page-current .page-content {
    background: #fff;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  .block-strong {
    margin-bottom: 5px;
    margin-top: 15px;
    padding-top: 10px;
    padding-bottom: 5px;
  }

  .block-strong::before, .block-strong::after{
    height: 0px;
    width: 0px;
  }

  .logo {
    object-fit: cover;
    width: 100%
  }

  .actions {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }


  .login--btn {
    background: #2B3D4C;
    border-radius: 0px;
    color: #fff;
    margin: 30px auto 15px auto;
    width: 50%;
  }

  .signup--btn {
    background: #fff;
    color: #2B3D4C;
    border: 1px solid #2B3D4C;
    border-radius: 0px;
    margin: 0 auto;
    width: 50%;
  }
</style>
