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
        <f7-link class="panel-close" panel-close><f7-icon ios="f7:close" aurora="f7:close" md="material:close"></f7-icon></f7-link>
        
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
                5 BHK Luxury House
                <span class="project-location">Lea Valley Country Park</span>
                <span class="project-price">£ 192,000</span>
            </p>
            <p class="register--btn" @click="$refs.actionsOneGroup.open()">Make Request</p>
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
                    <p class="info-text">3 Rooms</p>
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
                <p class="project-info-title">Tenure</p>
                <p class="project-info-text">Freehold</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Administration Fees</p>
                <p class="project-info-text">Administration Charge - Purchasers will be required to pay an administration fee of £1,200 inc VAT</p>
            </div>
            <div class="project-info">
                <p class="project-info-title">Tenancy</p>
                <p class="project-info-text">The property is subject to an Assured Shorthold Tenancy for a term of 18 months commencing 10th April 2019 at a rent of £1,300 per calendar month.</p>
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
                <form class="list form-store-data" id="demo-form">
                  <ul>
                    <li class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-input-wrap">
                          <input name="email" type="email" placeholder="Enter Amount">
                          <span class="input-clear-button"></span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <f7-button class="verify--btn">Make Request</f7-button>
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
export default {
    data() {
    return {
      logo,
      home,
      slide,
      isBottom: true,
    }
  },
  components: {
      f7Sheet,
  }
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

    .project-price {
        background: rgba(7, 153, 144, 0.4);
        color: rgb(43, 61, 76);
        border-radius: 0.3rem;
        font-size: 0.8rem;
        font-weight: 500;
        margin-top: 0.3rem;
        padding: 0.4rem 0.7rem;
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
        font-size: 0.7rem;
        margin: 0;
        margin-top: 0.1rem;
        padding: 0;
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
