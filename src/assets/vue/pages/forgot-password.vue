<template>
  <f7-page>
  <f7-navbar class="home--nav">
    <f7-navbar back-link="Forgot Password" back-link-show-text></f7-navbar>
      <f7-nav-right>
        <img :src="logo" class="logo">
      </f7-nav-right>
    </f7-navbar>
    <!--<f7-navbar back-link="Back"></f7-navbar>-->
    <f7-page-content class="forgot">
    <div class="block block-strong">
        <img :src="user" class="user">
      <p class="text">Enter the email address associated with your account</p>
      <p class="text-small">We will send you a verification  code to reset your password</p>
    </div>
    <form class="list form-store-data" id="demo-form">
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <input name="email" type="email" placeholder="Enter Code">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li>
          <f7-button class="verify--btn">Reset Password</f7-button>
        </li>
        
      </ul>
    </form>
    </f7-page-content>
  </f7-page>
</template>
<script>
import logo from '../../images/logo-nav.png';
import user from '../../images/user.png';
export default {
  data() {
    return {
      logo,
      user,
    }
  },
  components: {},
};
</script>

<style scoped>

  body {
        font-family: 'Montserrat', sans-serif;
    }

  .forgot {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 0px;
    padding-left: 10px;
    padding-right: 10px;

  }

  .block-strong {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5px;
    padding-bottom: 5px;
  }

  .block-strong::before, .block-strong::after{
    height: 0px;
    width: 0px;
  }

  .user {
    object-fit: cover;
    width: 25%
  }

  .forgot--title {
    color: #2B3D4C;
    font-size: 1.1rem;
    font-weight: 550;
    text-align: center;
  }

  .text {
    font-size: 1.2rem;
    font-weight: 380;
    margin-bottom: 1rem !important;
    text-align: center;
  }

  .text-small {
    font-size: 0.8rem;
    font-weight: 300;
    margin-top: 0;
    margin-bottom: 3rem !important;
    padding: 0px 1rem 0px 1rem;
    text-align: center;
  }

  .list {
    margin: 0px;
  }

  .list .item-content .item-inner .item-title{
    color: #2B3D4C;
  }

  .list .item-content .item-inner .item-input-wrap input {
    font-size: 1.6rem;
    padding-bottom: 1rem;
    text-align: center;
  }

  .list .item-content .item-inner .item-input-wrap::after{
    background-color: #2B3D4C;
  }

  .list ul::after, .list ul::before {
    height: 0px;
    width: 0px;
  }

 

  .verify--btn {
    background: #2B3D4C;
    border-radius: 0px;
    color: #fff;
    margin: 2rem auto 1.5rem auto;
    width: 90%;
  }
</style>
