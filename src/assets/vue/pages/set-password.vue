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
      <f7-block-title class="confirm--title">Welcome {{name}}</f7-block-title>
      <p class="text">You can now set a password for your brand new account.</p>
    </div>
    <form @submit.prevent="registerUser" no-store-data="true" class="list form-store-data" id="password-form">
      <ul>
        <li class="item-content item-input disabled">
          <div class="item-inner">
            <div class="item-input-wrap">
              <input name="token" v-model="token" type="text">              
            </div>
          </div>
        </li>
        <span class="valid">Awesome! Your email address has been verified.</span>
        <li class="item-content item-input">
          <div class="item-inner">
            <div class="item-title item-label">Create a strong password:</div>
            <div class="item-input-wrap">
              <input name="password" v-model="password" type="password" validate pattern="[0-9]*" data-error-message="Must contain number and etters please!">
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
          <f7-button class="verify--btn" type="submit" >Go To Dashboard</f7-button>
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
      token: null,
      password: '',
      cPassword: '',
      name: null,
    }
  },
  mounted() {
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
    validatePassword(value) {
      let difference = 8 - value.length;
      if (value.length < 8) {
        this.msg['password'] = 'Must be 8 characters or  more!';
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
    async registerUser() {
      this.$f7.preloader.show();
      if(this.password.trim() !== "" && this.cPassword.trim() !== "" && this.cPassword === this.password) {
        try {
          firebase.auth().createUserWithEmailAndPassword(userInfo.email, this.password).then(users => {
          return firebase.firestore().collection("users").doc(users.user.uid).set({
              phone: userInfo.phone,
              address: userInfo.address,
              city: '',
              country: '',
              memorableNumber: userInfo.memorableNumber,
              bankName: '',
              bankNumber: '',
              bankAccountName: '',
              bankSortCode: '',
              postalCode: '',
              token: userInfo.token,
              verified: true,
              created: userInfo.created,
        });
        }).then(() => {
          let user = firebase.auth().currentUser;
            user.updateProfile({
            displayName: userInfo.firstName + ' ' + userInfo.lastName,
            photoURL: userInfo.image
          }).then(()=> {
            Email.send({
              secureToken: "6d7fcff4-680b-48bd-a69c-43f92f919962",
              Host : "smtp.elasticemail.com",
              Username : "essiensaviour.a@gmail.com",
              Password : "2B06ACCA5856C1F7EE2F6CFB5BCC7C4218C6",
              To : userInfo.email,
              From : "essiensaviour.a@gmail.com",
              Subject : "Welcome to TrimHomes UK",
              Body : `
              <!doctype html>
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>TrimHomes Welcome Email</title>
                    <style>
                    /* -------------------------------------
                        INLINED WITH htmlemail.io/inline
                    ------------------------------------- */
                    /* -------------------------------------
                        RESPONSIVE AND MOBILE FRIENDLY STYLES
                    ------------------------------------- */
                    @media only screen and (max-width: 620px) {
                      table[class=body] h1 {
                        font-size: 28px !important;
                        margin-bottom: 10px !important;
                      }
                      table[class=body] p,
                            table[class=body] ul,
                            table[class=body] ol,
                            table[class=body] td,
                            table[class=body] span,
                            table[class=body] a {
                        font-size: 16px !important;
                      }
                      table[class=body] .wrapper,
                            table[class=body] .article {
                        padding: 10px !important;
                      }
                      table[class=body] .content {
                        padding: 0 !important;
                      }
                      table[class=body] .container {
                        padding: 0 !important;
                        width: 100% !important;
                      }
                      table[class=body] .main {
                        border-left-width: 0 !important;
                        border-radius: 0 !important;
                        border-right-width: 0 !important;
                      }
                      table[class=body] .btn table {
                        width: 100% !important;
                      }
                      table[class=body] .btn a {
                        width: 100% !important;
                      }
                      table[class=body] .img-responsive {
                        height: auto !important;
                        max-width: 100% !important;
                        width: auto !important;
                      }
                    }

                    /* -------------------------------------
                        PRESERVE THESE STYLES IN THE HEAD
                    ------------------------------------- */
                    @media all {
                      .ExternalClass {
                        width: 100%;
                      }
                      .ExternalClass,
                            .ExternalClass p,
                            .ExternalClass span,
                            .ExternalClass font,
                            .ExternalClass td,
                            .ExternalClass div {
                        line-height: 100%;
                      }
                      .apple-link a {
                        color: inherit !important;
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        text-decoration: none !important;
                      }
                      #MessageViewBody a {
                        color: inherit;
                        text-decoration: none;
                        font-size: inherit;
                        font-family: inherit;
                        font-weight: inherit;
                        line-height: inherit;
                      }
                      .btn-primary table td:hover {
                        background-color: #34495e !important;
                      }
                      .btn-primary a:hover {
                        background-color: #34495e !important;
                        border-color: #34495e !important;
                      }
                    }
                    </style>
                  </head>
                  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                      <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                            <!-- START CENTERED WHITE CONTAINER -->
                            <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

                              <!-- START MAIN CONTENT AREA -->
                              <tr>
                                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                      <p style="background: #2B3D4C; padding: 0.2rem 0; text-align: center;"><img src="https://lirp-cdn.multiscreensite.com/7e157610/dms3rep/multi/opt/3-68f7e3f4-218w.png" style="width: 120px;"></p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Welcome to TrimHomes UK Family</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you ${this.firstName} for creating an account with us, you can now enjoy all the benefits we offer.</p>
                                       
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>

                            <!-- END MAIN CONTENT AREA -->
                            </table>

                            <!-- START FOOTER -->
                            <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                <tr>
                                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                                    <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">12 Streatham Place, Bradwell Common, Milton Keynes, England MK13 8RG</span>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!-- END FOOTER -->

                          <!-- END CENTERED WHITE CONTAINER -->
                          </div>
                        </td>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                      </tr>
                    </table>
                  </body>
                </html>
              `
          }).then(
            message => console.log(message + "Sent")
          );
          }).then(()=> {
            this.$f7.preloader.hide();
            this.$f7router.navigate('/home1/');
          })
        })
          //   if (results.length > 0) {
          //     firebase.firestore().collection("users").doc(userId).update({
          //     password: this.password,
          //     }).then(() => {
          //       console.log("Updated");
          //     }).then(() => {
          //     console.log("It worker");
          //     this.$f7.preloader.hide();
          //     this.$f7router.navigate('/home1/');
          //   });
              
          //   }else {
          //     this.$f7.preloader.hide();
          //     this.$f7.dialog.alert("The Email you are setting password for does not Exists", "Error");
          //   }
          // })
          
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
