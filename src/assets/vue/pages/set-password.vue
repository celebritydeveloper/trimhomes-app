<template>
  <f7-page>
  <f7-navbar class="home--nav">
    <f7-navbar back-link="Set Password" no-shadow no-hairline back-link-show-text></f7-navbar>
      <f7-nav-right>
        <img :src="logo" class="logo">
      </f7-nav-right>
    </f7-navbar>
    <!--<f7-navbar back-link="Back"></f7-navbar>-->
    <f7-page-content class="confirm">
    <div class="block block-strong">
      <f7-block-title class="confirm--title">You’ve got mail....</f7-block-title>
      <p class="text">Please check your mailbox for an email from Trim Homes UK and enter the confirmation  code you received below:</p>
    </div>
    <form @submit.prevent="submitted" no-store-data="true" class="list form-store-data" id="password-form">
      <ul>
        <li class="item-content item-input disabled">
          <div class="item-inner">
            <div class="item-input-wrap">
              <input name="token" v-model="token" type="text">
              <span class="input-clear-button"></span>
              
            </div>
          </div>
        </li>
        <span class="valid">Awesome! Your email address has been verified.</span>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Create a strong password:</div>
            <div class="item-input-wrap">
              <input name="password" v-model="password" type="password">
              <span v-if="msg.password">{{msg.password}}</span>
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Confirm password:</div>
            <div class="item-input-wrap">
              <input name="cPassword" v-model="cPassword" type="password">
              <span class="input-clear-button"></span>
            </div>
            <span v-if="msg.cPassword">{{msg.cPassword}}</span>
          </div>
        </li>
        <li>
          <f7-button class="verify--btn" type="submit">Verify</f7-button>
          <p class="terms">If you didn’t recieve a code!  
          <f7-link class="forgot-btn" href="/forgot-password/">Resend</f7-link></p>
        </li>
        
      </ul>
    </form>
    </f7-page-content>
  </f7-page>
</template>
<script>
import logo from '../../images/logo-nav.png';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

let userId;
let userInfo;
export default {

  data() {
    return {
      logo,
      msg: [],
      token: userInfo,
      password: '',
      cPassword: '',
    }
  },
  mounted() {
  console.log('App mounted!');
    if (localStorage.getItem('trimhomeUser'));
    userInfo = JSON.parse(localStorage.getItem('trimhomesUser'));
    console.log(userInfo);
  },
  watch: {
    password(value){
      this.password = value;
      this.validatePassword(value);
    },
    cPassword(value){
      this.cPassword = value;
      this.confirmPassword(value);
    }
  },
  methods: {
    validatePassword(value){
      let difference = 8 - value.length;
      if (value.length < 8) {
        this.msg['password'] = 'Must be 8 characters! '+ difference + ' characters left' ;
      } else {
         this.msg['password'] = 'Good Enough';
      }
    },
    confirmPassword(value){
      if (value !== this.password) {
        this.msg['cPassword'] = 'Password Does not match';
      } else {
         this.msg['cPassword'] = 'Good Enough';
      }
    },
    async submitted() {
      this.$f7.preloader.show();
      if(this.password.trim() === "" && this.cPassword.trim() === "") {
        try {
          firebase.firestore().collection("users").where("email", "==", userInfo.email).get().then((snapshot) =>{
            let results = snapshot.docs.map(doc => {
              userId = doc.id;
              console.log(doc.id);
            });
            if (results.length > 0) {
              firebase.firestore().collection("users").doc(userId).update({
              password: this.password,
              }).then(() => {
                console.log("Updated");
              }).then(() => {
              console.log("It worker");
              this.$f7.preloader.hide();
              this.$f7router.navigate('/home1/');
            });
              
            }else {
              this.$f7.preloader.hide();
              this.$f7.dialog.alert("The Email you are setting password for does not Exists", "Error");
            }
          })
          
      } catch (err) {
        this.$f7.preloader.hide();
        console.log(err);
      }
      return true;
      }else {
        this.$f7.preloader.hide();
        this.$f7.dialog.alert("Password Does not Match... Try again", "Error");
      }
      
    }
  },
  components: {},
};
</script>

<style scoped>

  body {
        font-family: 'Montserrat', sans-serif;
    }

  .confirm {
    background: #fff;
    padding-top: 0px;
    padding-left: 10px;
    padding-right: 10px;

  }

  .block-strong {
    margin-bottom: 5px;
    margin-top: 3.8rem;
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

  .confirm--title {
    color: #2B3D4C;
    font-size: 1.1rem;
    font-weight: 550;
    text-align: center;
  }

  .text {
    font-size: 0.9rem;
    font-weight: 350;
    margin-bottom: 1.5rem !important;
    padding-right: 35px;
  }

  .valid {
    color: #18BC46;
    display: block;
    font-size: 0.6rem;
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

  .terms {
    font-size: 0.8rem;
    font-weight: lighter;
    text-align: center;
  }

  .forgot-btn {
    color: #2B3D4C;
    font-size: 0.8rem;
    font-weight: 550;
    text-align: center;
    text-transform: capitalize;
  }

  .verify--btn {
    align-items: center;
    background: #2B3D4C;
    border-radius: 0px;
    color: #fff;
    height: 2.8rem;
    justify-content: center;
    margin: 2rem auto 1.5rem auto;
    width: 90%;
  }
</style>
