<template>
  <f7-list  media-list class="listing">
    <f7-list-item
                v-for="property in properties" 
                :key="property.id"
                class="listing-item"
                :link="`/portfolioSingle/${property.id}`"
                :title="`${property.data().propertName + ', ' + property.data().Location}`"
                :text="`${convertCurrency(property.data().Amount) + ' - Invested Amount'}`"
                icon-ios="f7:briefcase" icon-aurora="f7:briefcase" icon-md="material:work"
            >
                <img slot="media" :src="property.data().image" height="80" width="80" />
                <f7-icon slot="media" icon="demo-list-icon"></f7-icon>
        </f7-list-item>
    </f7-list>
</template>

<script>
import home from '../images/home.jpg';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


let prop;
export default {

    data() {
    return {
      properties: [],
      name: null,
      propsId: null,
      paid: null,
      id: null,
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
      this.image = this.user.photoURL;
      // emailVerified = user.emailVerified;
      this.id = this.user.uid;
      console.log(this.id);
    }else {
      this.$f7router.navigate('/login/');
    }
    }else {
        this.$f7router.navigate('/login/');
        console.log("User logged out");
    }

    console.log(this.id);


    });

    this.getProperty();
       
    },



    methods: {
      convertCurrency(value) {
            return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'GBP' }).format(value);
        },

        async getProperty() {
        try {
          firebase.firestore().collection("portfolio").where("userId", "==", this.id).where("Paid", "==", true).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                this.propsId = doc.data().propId;
                this.properties.push(doc);
                console.log(this.properties);
              
            });
            });
          
      } catch (err) {
        console.log(err);
      }
      return true;
      
      },

    }

}
</script>

<style>

</style>