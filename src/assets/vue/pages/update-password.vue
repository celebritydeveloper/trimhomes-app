<template>
  <f7-page>
  <f7-navbar class="home--nav">
    <f7-navbar back-link="Back" no-shadow no-hairline back-link-show-text></f7-navbar>
      <f7-nav-right>
        <img :src="logo" class="logo">
      </f7-nav-right>
    </f7-navbar>
    <!--<f7-navbar back-link="Back"></f7-navbar>-->
    <f7-page-content class="confirm">
    <div class="block block-strong">
      <f7-block-title class="confirm--title">Hello {{name}}</f7-block-title>
      <p class="text">You can now set a new password for your account.</p>
    </div>
    <form @submit.prevent="updatePassword" no-store-data="true" class="list form-store-data" id="password-form">
      <ul>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">New password:</div>
            <div class="item-input-wrap">
              <input name="password" v-model="password" type="password" required validate>
              <span v-if="msg.password">{{msg.password}}</span>
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Confirm password:</div>
            <div class="item-input-wrap">
              <input name="cPassword" v-model="cPassword" type="password" required validatec>
              <span class="input-clear-button"></span>
            </div>
            <span v-if="msg.cPassword">{{msg.cPassword}}</span>
          </div>
        </li>
        <li>
          <f7-button class="verify--btn" type="submit" >Update Password</f7-button>
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
import 'firebase/auth';

const Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

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
      name: null,
      user: null,
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(users => {
        if(users) {
            this.user = firebase.auth().currentUser;
          let name, email, photoUrl, uid, emailVerified;

        if (this.user != null) {
          this.name = this.user.displayName;
          // email = user.email;
          // photoUrl = user.photoURL;
          // emailVerified = user.emailVerified;
          // uid = user.uid;
        }else {
          this.$f7router.navigate('/login/');
        }
        }else {
            this.$f7router.navigate('/login/');
            console.log("User logged out");
        }
    });

  console.log('App mounted!');
    if (localStorage.getItem('trimhomeUser'));
    userInfo = JSON.parse(localStorage.getItem('trimhomesUser'));
    this.token = userInfo.token;
    this.name = userInfo.firstName;
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
        this.msg['password'] = 'Must be 8 characters!';
      } else {
         this.msg['password'] = 'Good Enough';
      }
    },
    confirmPassword(value){
      if (value !== this.password) {
        this.msg['cPassword'] = 'Password Does not match';
      } else {
         this.msg['cPassword'] = 'Password Match';
      }
    },
    async updatePassword() {
      this.$f7.preloader.show();
      if(this.cPassword === this.password) {
        try {

          this.user.updatePassword(this.password).then(function() {
            // Update successful.
            this.$f7.preloader.hide();
            this.$f7.dialog.alert("Your password has been updated", "Success");
          }).catch(function(error) {
            // An error happened.
            this.$f7.preloader.hide();
            this.$f7.dialog.alert("Hello", "Error");
          });
          
      } catch (err) {
        this.$f7.preloader.hide();
        console.log(err);
      }
      return true;
      }else {
        this.$f7.preloader.hide();
        this.$f7.dialog.alert("You must set a password", "Error");
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
    text-align: center;
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
