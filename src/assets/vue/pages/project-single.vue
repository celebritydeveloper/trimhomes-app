<template>
  <f7-page class="home">
    <f7-navbar class="home--nav">
    <f7-navbar back-link="Back" back-link-show-text></f7-navbar>
      <f7-nav-right>
        <img :src="logo" class="logo">
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar tabbar labels :position="isBottom ? 'bottom' : 'top'">
      <f7-link tab-link="#tab-1" tab-link-active text="Home" icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home"></f7-link>
      <f7-link tab-link="#tab-2" text="Properties" icon-ios="f7:building_2_fill" icon-aurora="f7:building_2_fill" icon-md="material:local_offer"></f7-link>
      <f7-link tab-link="#tab-3" text="My Portfolio" icon-ios="f7:briefcase" icon-aurora="f7:briefcase" icon-md="material:work"></f7-link>
      <f7-link tab-link="#tab-4" text="Support" icon-ios="f7:question_circle" icon-aurora="f7:question_circle" icon-md="material:help_outline"></f7-link>
      <f7-link tab-link="" raised panel-open="right" cover text="More" icon-ios="f7:bars" icon-aurora="f7:bars" icon-md="material:menu"></f7-link>
    </f7-toolbar>

    <f7-panel class="panel" right resizable theme-dark>
    <f7-view>
      <f7-page>
        <f7-link class="panel-close" panel-close><f7-icon ios="f7:close" aurora="f7:close" md="material:close" panel-close></f7-icon></f7-link>
        
        <f7-link class="panel-link" href="/">My Profile</f7-link>
        <f7-link class="panel-link" href="/">My Earnings</f7-link>
        <f7-link class="panel-link" href="/">Settings</f7-link>
      </f7-page>
    </f7-view>
  </f7-panel>

    <f7-page-content class="confirm">

        <f7-swiper pagination>
            <f7-swiper-slide class="slide-img"><img :src="currentProperty.image"></f7-swiper-slide>
        </f7-swiper>

        <div class="project-top">
            <p class="project-type">
                {{currentProperty.Title}}
                <!--<span class="project-location" v-for="(location, index) in currentProperty.Location" :key="index">
                  {{currentProperty.Location}},
                  </span>-->
                  <span class="project-location">
                  {{currentProperty.Location}},
                  </span>
            </p>
        </div>

        <f7-block class="project-icons">
        <f7-row>
            <f7-col v-for="(icon, index) in currentProperty.Amenities" :key="index">
                <f7-card class="info-card">
                    <f7-icon class="info-icon" ios="f7:creditcard" aurora="f7:creditcard" md="material:credit_card"></f7-icon>
                    <p class="info-text">{{icon}}</p>
                </f7-card>
            </f7-col>
        </f7-row>
        </f7-block>

         <f7-block class="project-info-block">
             <div class="project-info">
                <p class="project-info-title">Outright Purchase</p>
                <p class="project-info-text">Buy this entire property from TRIM HOMES for full ownership</p>
                <div class="price">
                  <span class="project-price">{{convertCurrency(currentProperty.Outright)}}</span>
                  <f7-link @click="makeOutright" class="register--btn">Buy Outright</f7-link>
                </div>
            </div>
            <div class="project-info">
                <p class="project-info-title">Part-Purchase</p>
                <p class="project-info-text">Buy a part of this property to own a share of it and earn rental income monthly.</p>
                <div class="price">
                  <span class="project-price">{{convertCurrency(currentProperty.PartPrice)}}</span>
                  <span class="register--btn" @click="$refs.actionsOneGroup.open()">Buy a Share</span>
                </div>
            </div>
        </f7-block>

        <!-- Swipe to close demo sheet -->
        <f7-sheet ref="actionsOneGroup"
            class="demo-sheet-swipe-to-close"
            style="height:auto; --f7-sheet-bg-color: #fff;"
            swipe-to-close
            backdrop
            >
            <f7-page-content>
                <f7-block>
                  <p class="request-title">How much do you want to buy?</p>
                <form @submit.prevent="makeRequest" no-store-data="true" class="list form-store-data" id="demo-form">
                  <ul>
                    <li class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-input-wrap">
                          <input name="amount" type="number" v-model="amount" placeholder="Enter Amount">
                          <span class="input-clear-button"></span>
                        </div>
                      </div>
                    </li>
                    
                  </ul>
                  <p class="request-income">Your Monthly Rental Income:
                    <span>£{{ getPercent()  + '%'}}</span>
                  </p>
                  <p class="request-info">Based on your purchase amount entered above, your monthly rental income of <strong>£{{ getPercent()  + '%'}}</strong> will be paid on the last day of next month.</p>

                  <f7-button class="verify--btn" type="submit">Proceed to Payment</f7-button>
                </form>
                </f7-block>
            </f7-page-content>
        </f7-sheet>
        
    </f7-page-content>


  </f7-page>
</template>
<script>
import logo from '../../images/logo-nav.png';
import home from '../../images/home.jpg';
import slide from '../../images/props.jpg';
import {f7Sheet } from 'framework7-vue';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

let userId;
let userInfo;
let userEmail;
let userName;
let data;

export default {
    data() {
      return {
        logo,
        amount: '',
        home,
        slide,
        isBottom: true,
        properties: [],
        currentProperty: {},
        userName,
        propId: null,
        user: null,
        property: null,
        name: null,
        email: null,
        phone: null,

      }
  },
  mounted() {
    if (localStorage.getItem('trimhomeUser'));
    userInfo = JSON.parse(localStorage.getItem('trimhomesUser'));
    console.log(userInfo);
    userEmail = userInfo.email;

    this.fetchByParam();

    firebase.auth().onAuthStateChanged(user => {
    if(user) {
        const user = firebase.auth().currentUser;
      let name, displayName, email, photoUrl, uid, emailVerified;

     if (user != null) {
      this.name = user.displayName;
      this.email = user.email;
      // photoUrl = user.photoURL;
      // emailVerified = user.emailVerified;
      this.userUid = user.uid;
    }else {
      this.$f7router.navigate('/login/');
    }
    }else {
        console.log("User logged out");
        this.$f7router.navigate('/login/');
    }
    });

    this.getAccount();
  },
  components: {
      f7Sheet,
  },
  methods: {
    async getAccount() {
        try {
          firebase.firestore().collection("users").where(firebase.firestore.FieldPath.documentId(), "==", this.uid).get().then((snapshot) => {
            let results = snapshot.docs.map(doc => {
              this.propId = doc.id;
              this.user = doc.data();
            });
            console.log(this.propId);
            this.phone = this.user.phone;
          });
          
      } catch (err) {
        console.log(err);
      }
      return true;
      
    },

    getPercent() {
      return Number(this.amount * 100 / this.currentProperty.PartPrice).toFixed(2);
    },
    fetchByParam() {
      firebase.firestore().collection("properties").where(firebase.firestore.FieldPath.documentId(), "==", this.getParam).get().then((snapshot) => {
            let results = snapshot.docs.map(doc => {
              this.userId = doc.id;
              this.property = doc.data();
            });

            this.currentProperty = this.property;
        })
    },
    convertCurrency(value) {
            return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(value);
    },

    async makeOutright() {
      this.$f7.preloader.show();
      try {
        const outrightProperty = {
              ref: this.userId,
              propertyName: this.currentProperty.Title,
              location: this.currentProperty.Location,
              outright: this.currentProperty.Outright,
              partPrice: this.currentProperty.PartPrice,
              amount: this.amount,
              image: this.currentProperty.image,
          }
        localStorage.setItem('outrightProperty', JSON.stringify(outrightProperty))
          this.$f7.preloader.hide();
          this.$f7router.navigate("/outright-payment/");
        
      }  catch (error) {
        console.log(error);
        this.$f7.dialog.alert(error.message, "Error");
      }
    },

    async makeRequest() {
        this.$f7.preloader.show();
        try {
          if(this.amount.trim() !== "" && this.amount > 0) {
            const user = firebase.auth().currentUser;
          if(user != null) {
            this.userName = user.displayName;
            this.emailAddress = user.email;
            firebase.firestore().collection("Requests").add({
              userId: this.userUid,
              propId: this.userId,
              Name: this.userName,
              Email: this.emailAddress,
              Amount: this.amount,
              image: this.currentProperty.image,
              monthlyIncome: this.getPercent(),
              totalIncome: "",
              Paid: false,
              Date: new Date()
            }).then(() => {
              firebase.firestore().collection("portfolio").add({
              userId: this.userUid,
              propId: this.userId,
              Name: this.userName,
              Email: this.emailAddress,
              Amount: this.amount,
              monthlyIncome: this.getPercent(),
              image: this.currentProperty.image,
              propertName: this.currentProperty.Title,
              Location: this.currentProperty.Location,
              totalIncome: "",
              Paid: false,
              Date: new Date()
            });
            }).then(() => {
              const userProperty = {
              ref: this.userId,
              propertyName: this.currentProperty.Title,
              location: this.currentProperty.Location,
              outright: this.currentProperty.Outright,
              partPrice: this.currentProperty.PartPrice,
              amount: this.amount,
            }
            localStorage.setItem('userProperty', JSON.stringify(userProperty));

            }).then(() => {
              Email.send({
                secureToken: "6d7fcff4-680b-48bd-a69c-43f92f919962",
                Host : "smtp.elasticemail.com",
                Username : "essiensaviour.a@gmail.com",
                Password : "2B06ACCA5856C1F7EE2F6CFB5BCC7C4218C6",
                To : this.emailAddress,
                From : "essiensaviour.a@gmail.com",
                Subject : "TrimHomes - Investment Request",
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
                                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello, ${this.userName}</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you so much for your interest to invest <strong>£${this.amount}</strong> in our property.</p>

                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">If you made payment via our bank account, wait for an hour or two for Admin to verify your payment but if you paid via our Paypal channel then your payment will be automatically reflected on your portfolio page.</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you for you business.</p>

                                        <p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 8px;">Property Title:</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${this.currentProperty.Title}</p>

                                        <p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 8px;">Property Location:</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${this.currentProperty.Location}</p>

                                        <p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 8px;">Part-Purchase Price:</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${this.currentProperty.PartPrice}</p>
                                       
                                       
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
              message => console.log(message)
            );
            }).then(() => {
              Email.send({
                secureToken: "6d7fcff4-680b-48bd-a69c-43f92f919962",
                Host : "smtp.elasticemail.com",
                Username : "essiensaviour.a@gmail.com",
                Password : "2B06ACCA5856C1F7EE2F6CFB5BCC7C4218C6",
                To : "essiensaviour.a@gmail.com",
                From : "essien@theboringcreatives.com",
                Subject : "TrimHomes - Investment Request",
                Body : `
                <!doctype html>
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Request Email</title>
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
                                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello, Timi</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"><strong>${this.userName}</strong> has just requested to invested <strong>£${this.amount}</strong>. Here is their Email Address <strong>${this.emailAddress}</strong></p>

                                        <p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 8px;">Property Title:</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${this.currentProperty.Title}</p>

                                        <p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 8px;">Property Location:</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${this.currentProperty.Location}</p>

                                        <p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin: 0; Margin-bottom: 8px;">Part-Purchase Price:</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${this.currentProperty.PartPrice}</p>
                                       
                                       
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
              message => console.log(message)
            );
            this.$f7.dialog.alert(`Your request was registered, please make payment to confirm your investment!`, "Success");
            this.$refs.actionsOneGroup.close();
            this.$f7router.navigate('/payment-detail/');
            }).then(() => {
            this.$f7.preloader.hide();
          });
          }else {
            this.$f7.preloader.hide();
            this.$f7.dialog.alert(`You are not a registered user`, "Error");
            this.$f7router.navigate('/register/');
          }
          }else {
            this.$f7.preloader.hide();
            this.$f7.dialog.alert(`Amount must not be empty of less than $1`, "Error");
          }
          
            
          
      } catch (error) {
        console.log(error);
        this.$f7.preloader.hide();
        this.$f7.dialog.alert(error.message, "Error");
      }
      return true;
      
    }
  },
  computed: {
    getParam() {
      return this.$f7route.params.id
    }
  },
};
</script>


<style scoped>
    body {
        font-family: 'Montserrat', sans-serif;
    }

    .home .navbar .navbar-bg {
        background: none !important;
        background-color: #2B3D4C !important;
        background: #2B3D4C !important;
        background-image: none !important;
        height: 0px;
    }

    .home {
        background: #fff;
    }

    .confirm {
      padding-top: 0;
    }

    .slide-img {
        height: 280px;
        width: 100%;
    }

    .slide-img img{
        object-fit: cover;
        width: 100%;
    }

    .project-top {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
    }

    .project-type {
        display: flex;
        color: #2B3D4C;;
        flex-direction: column;
        font-size:1.5rem;
        font-weight: 500;
        margin-top: 0.2rem;
    }

    .project-type span {
      color: #2B3D4C;;
      font-size: 1.1rem;
      font-weight: lighter;
    }

    .project-location {
      display: flex !important;
      flex-direction: row !important;
      font-size: 1.3rem;
    }

    .project-price {
        background: rgba(7, 153, 144, 0.4);
        color: rgb(43, 61, 76);
        border-radius: 0.3rem;
        font-size: 0.9rem !important;
        font-weight: bold !important;
        margin-top: 0.3rem;
        padding: 0.3rem 0rem;
        text-align: center;
        width: 50%;
    }

    .project-icons {
        margin: 0.3rem 0 0.3rem 0;
    }

    .project-info-block {
        margin: 2.2rem 0 0.2rem 0;
    }

    .project-info {
        margin-bottom: 0.8rem;
    }

    .project-info-title {
        color: #2B3D4C;
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
        padding: 0;
    }

    .project-info-text {
        color: #2B3D4C;
        display: inline;
        font-size: 0.7rem;
        margin: 0;
        padding: 0;
    }

    .price {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .request-title {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
    }

    .request-income {
      align-items: center;
      display: flex;
      flex-direction: column;
    }

    .request-income span {
      background: rgba(7, 153, 144, 0.4);
      border-radius: 10px;
      display: block;
      font-size: 1.1rem;
      margin: 0 auto;
      padding: 0.2rem 1rem;
      text-align: center;
      width: 30%;
    }

    .request-info {
      font-size: 0.9rem;
      text-align: center;
    }

    .inline {
      display: inline;
    }

    .listing {
        color: red;
        margin-top: 0;
        margin-bottom: 0.3rem;
    }

    .listing .listing-item {
        box-shadow: 0px 2px 8px rgb(220, 220, 220);
        margin-bottom: 0.3rem;
    }

    .listing img {
        object-fit: cover;
    }

    .listing title {
        font-size: 7rem;
    }

    .listing .listing-item .item-subtitle {
      display: none !important;
      background: blue;
    }

    .listing .listing-item .item-inner::after{
      height: 0px !important;
      width: 0;
    }

    .info-card {
      align-items: center;
      border: 1px solid #2B3D4C;
      border-radius: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;
      padding: 0.5rem 0;
      width: 100%;
    }

    .info-title {
      color: #2B3D4C;
      font-size: 0.8rem;
      font-weight: 500;
      margin: 0.5rem 0 0 0.3rem;
      padding: 0;
    }

    .info-text {
      color: #2B3D4C;
      font-size: 0.8rem;
      font-weight: lighter;
      padding: 0 0.2rem;
      margin: 0;
      text-align: center;
    }

    .info-icon {
      color: #899CB2;
      font-size: 2rem;
    }

    .info-btn {
      background: #fff;
      border: 1px solid #2B3D4C;
      border-radius: 0;
      color: #06124E;
      font-weight: 350;
      padding: 0 1rem;
      text-transform: capitalize;
    }

    .panel-backdrop-in {
      background-color: #2B3D4C; 
    }

    .panel {
      background-color: #2B3D4C;
      height: 91vh;
      width: 100%;
    }

    .panel-close {
      color: #fff;
      display: block;
      font-size: 1.5rem;
      margin: 2rem 2rem 5rem 2rem;
    }

    .panel-link {
      color: #fff;
      border-bottom: 2px solid #fff;
      display: block;
      font-size: 1rem;
      margin: 0 2rem 2rem 2rem;
      padding: 0 0 0.5rem 0.5rem;
    }

    .register--btn {
    background: #2B3D4C;
    border-radius: 0px;
    color: #fff;
    font-weight: 500;
    padding: 0.5rem 0.7rem;
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

  .list {
    margin: 0px;
  }

  .list .item-content .item-inner .item-title{
    color: #2B3D4C;
  }

  .list .item-content .item-inner .item-input-wrap input {
    font-size: 1.5rem;
    padding-bottom: 0rem;
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
    display: flex;
    height: 2.6rem;
    justify-content: center;
    margin: 2rem auto 1.5rem auto;
    width: 90%;
  }

  .demo-sheet-swipe-to-close {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>
