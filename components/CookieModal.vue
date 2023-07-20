<template>
    <div class="cookie-modal-container" v-show="displaymain">
        <div class="row align-center">
            <div class="col col-7">
                <h2 class="size-4 padd-bottom-15">Cookies Settings</h2>
                <p class="size-5 padding-bottom-0 cookie-desc">We use our own cookies and third-party cookies so that we can display this website correctly and better understand how
                    this website used, with a view to improving the services we offer. A decision on cookie usage permissions can be
                    changed anytime using the cookie button that will appear atter a selection has been made on this banner.
                </p>
            </div>
            <div class="col col-3 justify-end">
                <div class="d-flex padd-bottom-15">
                    <a class="btn dark with-arrow margin-bottom-0 margin-top-0 margin-right-15" @click="displaymain = true" v-show="displaymain">ACCEPT</a>
                    <a class="btn btn_secondry with-arrow margin-bottom-0" @click="displaymain = false" v-show="displaymain">DECLINE</a>
                </div>
                <p class="padding-bottom-0"><a class="underline navy size-5" @click="displayinner = true" v-show="displaymain">Learn more & customize</a></p>
            </div>
        </div>
    </div>
    <div class="modal-overlay" v-show="displayinner">
      <div class="modal">
        <img class="check" src="~/assets/check-icon.png" alt="" />
        <h6>Saved!</h6>
        <p>Your Details have been saved Successfully</p>
        <button @click="lol()">Go Home</button>
      </div>
      <div class="close">
        <img class="close-img" src="~/assets/close-icon.svg" alt="" />
      </div>
    </div>
  </template>
  
  <script>
    export default {
        data() {
            return {
                displayinner: false,
                displaymain:true
                
            };
        },
        methods:{
            lol(){
                this.displayinner= false
                this.displaymain=false
            }
        }
    }
  </script>