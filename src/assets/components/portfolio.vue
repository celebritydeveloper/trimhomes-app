<template>
  <f7-list  media-list class="listing">
    <f7-list-item
                v-for="property in properties" 
                :key="property.id"
                class="listing-item"
                :link="`/portfolioSingle/${property.id}`"
                :title="property.data().Title"
                :subtitle="property.data().SalePrice"
                :text="property.data().ShortSummary"
                icon-ios="f7:briefcase" icon-aurora="f7:briefcase" icon-md="material:work"
                badge="Review"
                badge-color="yellow"
                no-chevron
            >
                <img slot="media" :src="home" height="80" width="80" />
                <f7-icon slot="media" icon="demo-list-icon"></f7-icon>
        </f7-list-item>
    </f7-list>
</template>

<script>
import home from '../images/home.jpg';
import * as firebase from 'firebase/app';
import 'firebase/firestore';


let data;
export default {

    data() {
    return {
      home,
      properties: [],
    }
  },

    mounted() {
        firebase.firestore().collection("properties").get().then((snapshot) => {
            snapshot.docs.map(doc => {
              data = doc;
              this.properties.push(data); 
              console.log(this.properties);
            });
        });
    }

}
</script>

<style>

</style>