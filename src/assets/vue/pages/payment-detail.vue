<template>
  <f7-page class="home">
    <f7-navbar class="home--nav">
    <f7-navbar back-link="Back" back-link-show-text></f7-navbar>
      <f7-nav-right>
        <img :src="logo" class="logo">
      </f7-nav-right>
    </f7-navbar>

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

                <p><f7-icon class="bank-icon" ios="f7:placemark" aurora="f7:placemark" md="material:account_balance_wallet"></f7-icon></p>
                <div>
                    <p class="acc-title">Account Number</p>
                    <p class="acc-detail">62090917</p>
                </div>
                <div>
                    <p class="acc-title">Bank Name</p>
                    <p class="acc-detail">Natwest Bank</p>
                </div>
                <div>
                    <p class="acc-title">Account Name</p>
                    <p class="acc-detail">TrimHomes Limited</p>
                </div>
                <div>
                    <p class="acc-title">Sort Code</p>
                    <p class="acc-detail">60-14-10</p>
                </div>
            <!--<f7-tab id="tab-2" class="page-content">
            <f7-block>
            <div v-if="paidFor">
              <div class="paid">
                <p><f7-icon class="paypal-icon" ios="f7:placemark" aurora="f7:placemark" md="material:account_balance_wallet"></f7-icon></p>
                <p class="payment-text">Trim Homes received your payment of </p>
                <h2 class="payment-price">{{convertCurrency(product.price)}}</h2>
              </div>
              <div class="">
                <h3 class="payment-head">Transaction Details</h3>
                <div class="payment-detail">
                  <p class="payment-title">Reference:</p>
                  <p class="payment-ref">LKJJBJ8OJNB78O</p>
                </div>
                <div class="payment-detail">
                  <p class="payment-title">Date:</p>
                  <p class="payment-ref">29th June, 2020</p>
                </div>
              </div>

              <p class="payment-footer">If you have any issues with this payment, kindly reply to this email or send an email to team@trimhomes.co.uk</p>

              
            </div>
                <div ref="paypal"></div>
            </f7-block>
            </f7-tab>-->

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
                    <span>{{convertCurrency(50)}}</span>
                  </p>
                  <p class="request-info">Based on your purchase amount entered above, your monthly rental income of <strong>{{convertCurrency(50)}}</strong> will be paid on the last day of next month.</p>

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
        email: null,
        loaded: false,
        paidFor: false,
        product: {
        price: null,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg",
        userProps: null,
      }
      }
  },
  mounted() {
    if (localStorage.getItem('trimhomeUser'));
    userInfo = JSON.parse(localStorage.getItem('trimhomesUser'));
    console.log(userInfo);
    userEmail = userInfo.email;

    if (localStorage.getItem('userProperty'));
    this.userProps = JSON.parse(localStorage.getItem('userProperty'));
    this.price = this.userProps.amount;

    this.fetchByParam();

    firebase.auth().onAuthStateChanged(user => {
    if(user) {
        const user = firebase.auth().currentUser;
      let name, email, photoUrl, uid, emailVerified;

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

    const script = document.createElement("script");
    // script.src =
    //   "https://www.paypal.com/sdk/js?client-id=ATLlN-1s3VyZQVqlPp5MV1Mf_uCCKKEdC1sQAdVlI-OcRi7NYietzy_rCx45wrYxdBeQ0-G5kEeUjQEA";
    // script.addEventListener("load", this.setLoaded);
    // document.body.appendChild(script);
  },
  components: {
      f7Sheet,
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },

    fetchByParam() {
      firebase.firestore().collection("properties").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              data = doc;
              this.properties.push(data);
            })
        }).then(() => {
          for (let i = 0; i < this.properties.length; i++) {
        if( this.properties.id === this.getParam) {
            console.log("Param is the same");
            this.currentProperty = this.properties[i].data();
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
              firebase.firestore().collection("Portfolio").add({
              Name: this.userName,
              Email: this.emailAddress,
              Amount: this.amount,
              Property: this.currentProperty.Title,
              Price: this.currentProperty.SalePrice,
              Location: this.currentProperty.Location,
              Date: new Date()
            });
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
            this.$f7.dialog.alert(`Your request have been successfully sent to Admin!`, "Congratulations");
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
  components: {
    
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
        overflow: hidden;
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
      margin-top: 3rem;
      text-align: center;
    }

    .bank-icon {
      color: #2B3D4C;
      font-size: 4rem;
      margin-bottom: 2rem;
    }

    .paypal-icon {
      color: #2B3D4C;
      font-size: 4rem;
      margin-bottom: 0.3rem;
    }

    .bank-detail {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .bank-detail div {
      margin-bottom: 2.5rem;
      text-align: center;
    }

    .acc-title {
        font-size: 1.1rem;
        margin: 0;
        padding: 0;
    }


    .acc-detail {
        font-size: 1.8rem;
        font-weight: bolder;
        margin: 0;
        padding: 0;
    }

    .payment-text {
      color: #2B3D4C;
      font-size: 1.2rem;
      margin: 0;
      padding: 0;
    }

    .payment-price {
      color: #2B3D4C;
      font-size: 2.5rem;
      margin: 0;
      padding: 0;
    }

    .paid {
      align-items: center;
      background: rgba(234, 234, 234, 0.5 );
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 0.8rem;
      padding: 0.5rem 0;
    }

    .payment-detail {
      color: #2B3D4C;
      display: flex;
      justify-content: space-between;
    }

    .payment-head {
      color: #2B3D4C;
      text-align: center;
    }

    .payment-title {
      color: #2B3D4C;
      font-size: 1.1rem;
    }

    .payment-ref {
      color: #2B3D4C;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .payment-footer {
      color: #2B3D4C;
      font-size: 0.8rem;
      margin-top: 2.5rem;
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
