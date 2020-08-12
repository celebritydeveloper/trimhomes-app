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
      <f7-link tab-link="#tab-2" text="Projects" icon-ios="f7:building_2_fill" icon-aurora="f7:building_2_fill" icon-md="material:apartment"></f7-link>
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
            <f7-swiper-slide class="slide-img"><img :src="slide"></f7-swiper-slide>
            <f7-swiper-slide class="slide-img"><img :src="home"></f7-swiper-slide>
            <f7-swiper-slide class="slide-img"><img :src="slide"></f7-swiper-slide>
        </f7-swiper>

        <div class="project-top">
            <p class="project-type">
                {{currentProperty.Title}}
                <span class="project-location" v-for="(location, index) in currentProperty.Location" :key="index">
                  {{location}},
                  </span>
                <span class="project-price">{{convertCurrency(currentProperty.SalePrice)}}</span>
            </p>
            <p class="register--btn" @click="$refs.actionsOneGroup.open()">Withdraw</p>
        </div>

        <f7-block class="project-icons">
        <f7-row>
            <f7-col>
                <f7-card class="info-card">
                    <f7-icon class="info-icon" ios="f7:creditcard" aurora="f7:creditcard" md="material:credit_card"></f7-icon>
                    <p class="info-text">3 Baths</p>
                </f7-card>
            </f7-col>
            <f7-col>
                <f7-card class="info-card">
                    <f7-icon class="info-icon" ios="f7:creditcard" aurora="f7:creditcard" md="material:credit_card"></f7-icon>
                    <p class="info-text">3 Toilets</p>
                </f7-card>
            </f7-col>
            <f7-col>
                <f7-card class="info-card">
                    <f7-icon class="info-icon" ios="f7:creditcard" aurora="f7:creditcard" md="material:credit_card"></f7-icon>
                    <p class="info-text">{{currentProperty.Bedrooms}} Room</p>
                </f7-card>
            </f7-col>
            <f7-col>
                <f7-card class="info-card">
                    <f7-icon class="info-icon" ios="f7:creditcard" aurora="f7:creditcard" md="material:credit_card"></f7-icon>
                    <p class="info-text">Garage</p>
                </f7-card>
            </f7-col>
        </f7-row>
        </f7-block>

        <f7-block class="project-info-block">
          <div class="project-info">
                <p class="project-info-title">Type</p>
                <p class="project-info-text" v-for="(type, index) in currentProperty.Type" :key="index">
                  <span class="inline">{{type}}, </span>
                </p>
            </div>
             <div class="project-info">
                <p class="project-info-title">Tenure</p>
                <p class="project-info-text" v-for="(tenure, index) in currentProperty.Tenure" :key="index">
                  <span class="inline">{{tenure}}, </span>
                </p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Actual Annual Rental Income</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.ActualAnnualRentalIncome)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Capital Gains Tax</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.CapitalGainsTax)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Deposit</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.Deposit)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Estimated Annual Rental Income</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.EstimatedAnnualRentalIncome)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Estimated Monthly Rental Income</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.EstimatedMonthlyRentalIncome)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Guide Price</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.GuidePrice)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">ROI On Sale</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.ROIOnSale)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">ROI Percentage</p>
                <p class="project-info-text">{{currentProperty.ROIPercentage}}%</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Rental Expenses</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.RentalExpenses)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Total Cash Required</p>
                <p class="project-info-text">{{convertCurrency(currentProperty.TotalCashRequired)}}</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Short Summary</p>
                <p class="project-info-text">{{currentProperty.ShortSummary}}</p>
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
                    <li>
                      <f7-button class="verify--btn" type="submit">Make Request</f7-button>
                    </li>
                    
                  </ul>
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

//let userId;
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
      let name, email, photoUrl, uid, emailVerified;

     if (user != null) {
      this.name = user.displayName;
      // email = user.email;
      // photoUrl = user.photoURL;
      // emailVerified = user.emailVerified;
      // uid = user.uid;
    }else {
      this.$f7router.navigate('/login/');
    }
    }else {
        console.log("User logged out");
        this.$f7router.navigate('/login/');
    }
    });
  },
  components: {
      f7Sheet,
  },
  methods: {
    openDialog() {
        this.$f7.dialog.confirm('Are you feel good today?', function () {
        this.$f7.dialog.alert('Great!');
      });
    },
    fetchByParam() {
      firebase.firestore().collection("properties").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              data = doc;
              this.properties.push(data);
              //console.log(this.properties);
            })
        }).then(() => {
          for (let i = 0; i < this.properties.length; i++) {
        if( this.properties.id == this.getParam) {
            console.log("True");
            this.currentProperty = this.properties[0].data();
            console.log(this.currentProperty);
          }    
        }
        })
    },
    convertCurrency(value) {
            return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(value);
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
              Name: this.userName,
              Email: this.emailAddress,
              Amount: this.amount,
              Property: this.currentProperty.Title,
              Price: this.currentProperty.SalePrice,
              Location: this.currentProperty.Location,
              Date: new Date()
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
                <p>Thank you so much for investing in the property.</p>
                <p>Admin will process your request and reach out to you via a call or email within 24hours. </p>
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
                From : "essiensaviour.a@gmail.com",
                Subject : "TrimHomes - Investment Request",
                Body : `
                <p>An investment opportunity just popped in.</p>
                <p> <strong>${this.userName}</strong> has just invested <strong>$${this.amount}</strong>. Here is their Email Address <strong>${this.emailAddress}</strong></p>
                <p>Property Details</strong></p>
                <p>${this.currentProperty.Title}, ${this.currentProperty.SalePrice}, ${this.currentProperty.Location}</p>
                `
            }).then(
              message => console.log(message)
            );
            this.$f7.dialog.alert(`You have successfully invested in this property`, "Success");
            this.$refs.actionsOneGroup.close();
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
        flex-direction: column;
        font-size:1.1rem;
        font-weight: 500;
    }

    .project-type span {
        font-size:0.7rem;
        font-weight: lighter;
    }

    .project-location {
      display: flex !important;
      flex-direction: row !important;
    }

    .project-price {
        background: rgba(7, 153, 144, 0.4);
        color: rgb(43, 61, 76);
        border-radius: 0.3rem;
        font-size: 0.9rem !important;
        font-weight: bold !important;
        margin-top: 0.3rem;
        padding: 0.3rem 0.4rem;
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
    font-size: 1.1rem;
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
