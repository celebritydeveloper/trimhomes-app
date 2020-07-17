<template>
  <f7-page class="login">
    <!--<f7-navbar back-link="Back"></f7-navbar>-->
    <div class="block block-strong">
      <img :src="logo" class="logo">
      <p>Welcome to our exclusive collection of project and contributor community, where we pool resources to achieve our goals.</p>
      <f7-block-title class="login--title">Login</f7-block-title>
    </div>
    <form class="list form-store-data" id="demo-form">
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">E-mail</div>
            <div class="item-input-wrap">
              <input name="email" type="email">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Password</div>
            <div class="item-input-wrap">
              <input name="password" type="password">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li>
          <f7-button class="forgot-btn" href="/forgot-password/">Forgot password?</f7-button>
          <f7-button class="login--btn">Sign In</f7-button>
        </li>
        
      </ul>
    </form>
    <div>
      <f7-block-title class="login--title">New user?</f7-block-title>
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

  .login {
    background: #fff;
    padding-top: 0px;
    padding-left: 20px;
    padding-right: 20px;

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

  .login--title {
    color: #2B3D4C;
    font-size: 1.1rem;
    font-weight: 550;
    text-align: center;
  }

  .list {
    margin: 0px;
  }

  .list .item-content .item-inner .item-title{
    color: #2B3D4C;
  }

  .list .item-content .item-inner .item-input-wrap::after{
    background-color: #2B3D4C;
  }

  .list ul::after, .list ul::before {
    height: 0px;
    width: 0px;
  }

  .forgot-btn {
    color: #2B3D4C;
    font-size: 0.8rem;
    font-weight: lighter;
    text-transform: capitalize;
  }

  .login--btn {
    background: #2B3D4C;
    border-radius: 0px;
    color: #fff;
    margin: 0 auto;
    width: 90%;
  }

  .signup--btn {
    background: #fff;
    color: #2B3D4C;
    border: 1px solid #2B3D4C;
    border-radius: 0px;
    margin: 0 auto;
    width: 90%;
  }
</style>
