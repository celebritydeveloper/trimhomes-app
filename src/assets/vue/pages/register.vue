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
      <div  v-if="imageData!=null">
        <img :src="picture" class="user">
      </div>
      
      <p>Upload a profile picture.
      <f7-icon class="text-black" slot="media" ios="f7:pencil" md="material:create"></f7-icon>
      </p>

      <div>
      <p>Progress: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>
      
    </div>
    <form @submit.prevent="submitted" no-store-data="true" class="list form-store-data" id="demo-form">
      <ul>
      <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-input-wrap">
              <input name="image" accept="image/*" type="file" @change="previewImage">
            </div>
          </div>
      </li>
      <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Full Name</div>
            <div class="item-input-wrap">
              <input name="fullName" type="text" v-model="fullName" autocomplete="off">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">E-mail</div>
            <div class="item-input-wrap">
              <input name="email" type="email" v-model="email" autocomplete="off">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Phone Number</div>
            <div class="item-input-wrap">
              <input name="phone" type="tel" v-model="phone">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Memorable Number</div>
            <div class="item-input-wrap">
              <input name="password" type="text" v-model="memorableNumber">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">City</div>
            <div class="item-input-wrap">
              <input name="city" type="text" v-model="city">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Country</div>
            <div class="item-input-wrap">
              <input name="country" type="text" v-model="country">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Zip/Postal Code</div>
            <div class="item-input-wrap">
              <input name="postalCode" type="text" v-model="postalCode">
              <span class="input-clear-button"></span>
            </div>
          </div>
        </li>
        <li>
          <p class="terms">By clicking ‘Create Account’, you agree to our  
          <f7-link class="forgot-btn" href="/forgot-password/">Terms &amp; Conditions</f7-link> 
          and our  
          <f7-link class="forgot-btn" href="/forgot-password/"> Privacy Policy.</f7-link></p>
          <f7-button class="register--btn" type="submit">Create Account</f7-button>
        </li>
        
      </ul>
    </form>
    </f7-page-content>
  </f7-page>
</template>
<script>
import logo from '../../images/logo-nav.png';
import user from '../../images/user.png';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
import OTP from 'otp-client';


const secret = 'TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY'
const otp = new OTP(secret);
const token = otp.getToken();

const Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

let pics;
export default {
  name: "Upload",
  data() {
    return {
      logo,
      user,
      imageData: null,
      picture: null,
      uploadValue: 0,
      fullName: '',
      email: "",
      phone: "",
      memorableNumber: "",
      city: "",
      country: "",
      postalCode: "",
    }
  },
  methods: {

    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
    },

    async submitted() {
      this.$f7.preloader.show();
      try {

            const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot => {
            this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
          }, error => {console.log(error.message)},
          () => {this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.picture = url;
              pics = url;
            }).then(() => {
            Email.send({
              secureToken: "6d7fcff4-680b-48bd-a69c-43f92f919962",
              Host : "smtp.elasticemail.com",
              Username : "essiensaviour.a@gmail.com",
              Password : "2B06ACCA5856C1F7EE2F6CFB5BCC7C4218C6",
              To : this.email,
              From : "essiensaviour.a@gmail.com",
              Subject : "Verify Your Email - TrimHomes",
              Body : `
              <p>Thank you for registering with TrimHomes</p>
              <p>Here is your token <strong>${token}</strong> to verify your email. </p>
              `
          }).then(
            message => console.log(message)
          );
          }).then(() => {
            const userInfo = {
              email: this.email,
              city: this.city,
              country: this.country,
              fullName: this.fullName,
              image: pics,
              memorableNumber: this.memorableNumber,
              phone: this.phone,
              postalCode: this.postalCode,
              verified: false,
              created: new Date(),
              token
            }
            localStorage.setItem('trimhomesUser', JSON.stringify(userInfo));
          }).then(() => {
          this.$f7.preloader.hide();
          this.$f7router.navigate('/verify-token/');
        });
        });
            
          
      } catch (err) {
        console.log(err);
      }
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
