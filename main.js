'use strict';

import myRoutes from './routes.js'

Vue.use(VueMaterial.default)
Vue.use(VueRouter)

const myRouter = new VueRouter({ routes: myRoutes })

import EventBusService from './services/EventBusService.js'
import EmailsService from './EmailsMgmt/services/EmailService.js'

new Vue({
    template: `
        <section class="main-body">
                <div class="page-container">
                                <md-tabs md-alignment="fixed">
                                    <template slot="md-tab" slot-scope="{ tab }">
                                        {{ tab.label }} <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
                                    </template>
                                    <md-tab @click="goToPage('/')" md-label="home"></md-tab>
                                    <md-tab :md-template-data="{ badge: newEmails }" @click="goToPage('/emails/inbox')" md-label="Mail"></md-tab>
                                    <md-tab @click="goToPage('/notes')" md-label="notes"></md-tab>
                                    <md-tab @click="goToPage('/maps')" md-label="Map"></md-tab>
                                </md-tabs>                                
                            </div>
                 <router-view></router-view>
              </div>
        </section>
    `,
    created() {
        console.log('Vue App was created!');
        EventBusService.$on('EmailCountUpdate', count=>{
            this.newEmails = count
        })
        EmailsService.getUnreadCount()
    },
    data() {
        return {
            menuVisible: false,
            newEmails: null
        }
    },
    methods: {
        goToPage(page) {
            this.$router.push(page)
        }
    },
    router: myRouter,
}).$mount('#app')