<template>
  <f7-page class="home">
    <f7-navbar class="home--nav">
      <div class="title">Home</div>
      <f7-nav-right>
        <img :src="logo" class="logo">
      </f7-nav-right>
    </f7-navbar>
    <f7-toolbar tabbar labels :position="isBottom ? 'bottom' : 'top'">
      <f7-link tab-link="#tab-1" tab-link-active text="Tab 1" icon-ios="f7:envelope_fill" icon-aurora="f7:envelope_fill" icon-md="material:email"></f7-link>
      <f7-link tab-link="#tab-2" text="Tab 2" icon-ios="f7:calendar_fill" icon-aurora="f7:calendar_fill" icon-md="material:today"></f7-link>
      <f7-link tab-link="#tab-3" text="Tab 3" icon-ios="f7:cloud_upload_fill" icon-aurora="f7:cloud_upload_fill" icon-md="material:file_upload"></f7-link>
    </f7-toolbar>

    <f7-tabs>
      <f7-tab id="tab-1" class="page-conten" tab-active>
        <f7-list  media-list>
            <f7-list-item class="listing"
                link="#"
                title="5 BHK Luxury House"
                after="$15"
                subtitle="£ 192,000"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <img slot="media" :src="home" height="80" width="80" />
            </f7-list-item>
            <f7-list-item
                link="#"
                title="5 Park Lane"
                after="$22"
                subtitle="£ 150,000"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            >
                <img slot="media" :src="home" height="80" width="80" />
            </f7-list-item>
            <f7-list-item
                link="#"
                title="Billie Jean"
                after="$16"
                subtitle="Michael Jackson"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            >
                <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" />
            </f7-list-item>
            </f7-list>
      </f7-tab>
      <f7-tab id="tab-2" class="page-content">
        <f7-block>
          <p>Tab 2 content</p>
          ...
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-3" class="page-content">
        <f7-block>
          <p>Tab 3 content</p>
          ...
        </f7-block>
      </f7-tab>
    </f7-tabs>


  </f7-page>
</template>
<script>
import logo from '../../images/logo-nav.png';
import home from '../../images/home.jpg';
export default {
    data() {
    return {
      logo,
      home,
      isBottom: true,
    }
  },
  components: {}
};
</script>


<style scoped>
    .home .home--nav .navbar-bg {
        background: none !important;
        background-color: #2B3D4C !important;
        background-image: none !important;
        height: 0px;
    }

    /* .home {
        background: red;
    } */

    .listing {
        background: red;
    }

    .listing img {
        object-fit: cover;
    }

    .listing title {
        font-size: 2rem;
    }
</style>
