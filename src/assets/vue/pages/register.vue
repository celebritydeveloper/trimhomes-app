<template>
  <f7-page>
  <f7-navbar class="home--nav">
    <f7-navbar back-link="Create Account" back-link-show-text></f7-navbar>
      <f7-nav-right>
        <img :src="logo" class="logo">
      </f7-nav-right>
    </f7-navbar>
    
    <f7-page-content class="register">
    <div class="block block-strong">
      <img :src="user" class="user">
      <p>Upload a profile picture.
      <f7-icon class="text-black" slot="media" ios="f7:pencil" md="material:create"></f7-icon>
      </p>
    </div>
    <form class="list form-store-data" id="demo-form">
      <ul>
      <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Full Name</div>
            <div class="item-input-wrap">
              <input name="fullName" type="text">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
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
            <div class="item-title item-label">Phone Number</div>
            <div class="item-input-wrap">
              <input name="phone" type="tel">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Memorable Number</div>
            <div class="item-input-wrap">
              <input name="memory" type="text">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Address Line 1</div>
            <div class="item-input-wrap">
              <input name="address1" type="text">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Address Line 2</div>
            <div class="item-input-wrap">
              <input name="address2" type="text">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">City</div>
            <div class="item-input-wrap">
              <input name="city" type="text">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Country</div>
            <div class="item-input-wrap">
              <input name="country" type="text">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Zip/Postal Code</div>
            <div class="item-input-wrap">
              <input name="email" type="email">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li>
          <p class="terms">By clicking ‘Create Account’, you agree to our  
          <f7-link class="forgot-btn" href="/forgot-password/">Terms &amp; Conditions</f7-link> 
          and our  
          <f7-link class="forgot-btn" href="/forgot-password/"> Privacy Policy.</f7-link></p>
          <f7-button class="register--btn">Create Account</f7-button>
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
        overflow: hidden;
    }

    .navbar .navbar-bg {
        background: none !important;
        background-color: #2B3D4C !important;
        background-image: none !important;
        height: 0px;
    }

    .text-black {
        color: #000;
    }

  .register {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
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
    margin-top: 15px;
    padding-top: 10px;
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

  .register--title {
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

  .terms {
    color: #2B3D4C;
    font-size: 0.6rem;
    font-weight: lighter;
    padding: 5px 90px 5px 20px;
  }

  .terms .forgot-btn {
    color: #2B3D4C;
    display: inline;
    font-size: 0.6rem;
    font-weight: 500;
    text-decoration: underline;
    text-transform: capitalize;
  }

  .register--btn {
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
