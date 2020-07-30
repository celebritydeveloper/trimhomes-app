<template>
  <f7-page class="home" ptr @ptr:refresh="loadMore">
    <f7-navbar class="home--nav">
    <f7-nav-left>
        Home
      </f7-nav-left>
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
        <f7-link class="panel-link" @click="logout">Logout</f7-link>
      </f7-page>
    </f7-view>
  </f7-panel>

    <f7-page-content class="confirm">
    <div class="top-bar">
      Welcome, {{name}}
    </div>
    <f7-tabs>
      <f7-tab id="tab-1" class="page-conten" tab-active>
        <f7-list  media-list class="listing">
          <f7-list-item
                v-for="property in properties" 
                :key="property.id"
                class="listing-item"
                link="/project-single/"
                :title="property.Title"
                :subtitle="property.SalePrice"
                :text="property.ShortSummary"
            >
                <img slot="media" :src="home" height="80" width="80" />
          </f7-list-item>
          </f7-list>
            <f7-card class="info-card">
              <f7-icon class="info-icon" ios="f7:creditcard" aurora="f7:creditcard" md="material:credit_card"></f7-icon>
              <p class="info-title">Part-purchase a property</p>
              <p class="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e</p>
              <f7-button class="info-btn">Learn How</f7-button>
            </f7-card>
            <f7-card class="info-card">
              <f7-icon class="info-icon" ios="f7:person_circle" aurora="f7:person_circle" md="material:account_circle"></f7-icon>
              <p class="info-title">Update your details</p>
              <p class="info-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e</p>
              <f7-button class="info-btn">Update Now</f7-button>
            </f7-card>
      </f7-tab>
      <f7-tab id="tab-2" class="page-conten">
          <f7-list  media-list class="listing">
            <f7-list-item 
                class="listing-item"
                link="#"
                title="5 BHK Luxury House"
                subtitle="£ 192,000"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <img slot="media" :src="home" height="80" width="80" />
          </f7-list-item>
          <f7-list-item
                class="listing-item"
                link="#"
                title="5 Park Lane"
                subtitle="£ 150,000"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <img slot="media" :src="home" height="80" width="80" />
          </f7-list-item>
          </f7-list>
      </f7-tab>
      <f7-tab id="tab-3" class="page-conten">
        <f7-list  media-list class="listing">
            <f7-list-item 
                class="listing-item"
                link="#"
                title="5 BHK Luxury House"
                subtitle="£ 192,000"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <img slot="media" :src="home" height="80" width="80" />
          </f7-list-item>
          <f7-list-item
                class="listing-item"
                link="#"
                title="5 Park Lane"
                subtitle="£ 150,000"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <img slot="media" :src="home" height="80" width="80" />
          </f7-list-item>
          </f7-list>
      </f7-tab>
      <f7-tab id="tab-4" class="page-content">
        <f7-block>
          <p>Support Form</p>
        </f7-block>
      </f7-tab>
    </f7-tabs>
    </f7-page-content>


  </f7-page>
</template>
<script>
import logo from '../../images/logo-nav.png';
import home from '../../images/home.jpg';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

let data;

export default {
    data() {
    return {
      logo,
      home,
      name: null,
      isBottom: true,
      properties: [],
    }
  },
  methods: {
     loadMore(done) {
       setTimeout(() => {
       this.$f7router.navigate('/home1/');
       done();
       }, 1000);
    },

    logout() {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    },

    async submitted() {
      try {
        // const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(users => {
        //   return 
          firebase.firestore().collection("users").get().then((snapshot) =>{
            snapshot.docs.map(doc => {
              console.log(doc);
              console.log(doc.data());
            });
          })
          
      } catch (err) {
        console.log(err);
      }
  }
  },
  components: {},

  mounted(){
    firebase.firestore().collection("properties").get().then((snapshot) => {
            snapshot.docs.map(doc => {
              data = doc.data();
              this.properties.push(data); 
              console.log(this.properties);
        });
    });

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
    
    // axios.get('https://firestore.googleapis.com/v1/projects/trimhomesapp/databases/(default)/documents/properties')
    // .then((response) => data = response);
    // .then(() => this.properties.push(data))
    // .then(() => console.log(data))

    

  }
}
</script>


<style scoped>
    body {
        font-family: 'Montserrat', sans-serif;
    }

    .navbar-bg {
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

    .top-bar {
      background: #E3E6E0;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0.6rem 0;
      text-align: center;
    }

    .listing {
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
      box-shadow: 0px 2px 8px rgb(220, 220, 220);
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 0 0.3rem 0;
      padding: 1.3rem 0;
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
      padding: 0 2rem;
      margin: 0;
      text-align: center;
    }

    .info-icon {
      color: #899CB2;
      font-size: 2.5rem;
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
</style>
