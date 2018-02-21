'use strict';
import EmailPreview from '../cmps/EmailPreview.js';
import EmailService from '../services/EmailService.js';
import EmailView from '../cmps/EmailView.js';
import SideNav from '../../cmps/SideNav.js';
import SortNav from '../../cmps/SortNav.js';
import EmailWrite from '../cmps/EmailWrite.js';



export default {
    template: `
    <section>
        <div class="email-display-container">
            <div class="email-sort-list-container">
                <div class="email-sort-container">
                    <div class="email-side-nav">
                        <side-nav @changeNav="changeCatagory" v-if="navs" :navs="navs"></side-nav>
                    </div>
                    <div class="email-sort-input-container">
                        <md-field>
                            <md-input @keyup="searchEmails" placeholder="search"></md-input>
                        </md-field>
                        <div>
                                <md-switch v-model="hideRead">Hide read emails</md-switch>
                                <sort-nav @reverse="reverseSort" @renderSort="renderSort" v-if="sorts" :sorts="sorts" :sortBy="sortBy"></sort-nav>
                        </div>
                    </div>
                </div>
                <div>
                    <md-list class="md-triple-line md-scrollbar" v-if="emails">
                        <email-preview @viewEmail="viewEmailDetails" v-if="emails" :catagory="catagory" v-for="email in searchedEmails" :email="email" :key="email.id"></email-preview>
                    </md-list>
                </div>
            </div>
            <div class="email-view-continer">
                <email-view v-if="searchedEmails.length > 0" @deleteEmail="deleteEmail"></email-view>
            </div>
            <email-write @sendEmail="sendNewEmail"></email-write>
        </div>
    </section>
    `,
    data() {
        return {
            emails: [],
            searchedEmails: [],
            navs: [
                { icon: 'mail', title: 'inbox' },
                { icon: 'send', title: 'sent' },
                { icon: 'mail_outline', title: 'All mail' },
                ],
            sorts: [
                { by: 'date', icon: 'expand_more' },
                { by: 'title', icon: 'expand_more' }
                ],
            sortBy: null,
            hideRead: false,
            catagory: ''
        }
    },
    created() {
        EmailService.getEmails().then(emails => {
            this.emails = emails
            this.changeCatagory('inbox')
            
        })
    },
    methods: {
        viewEmailDetails(emailId) {
            this.$router.push('/emails/' + this.catagory + '/' + emailId)
        },
        deleteEmail(emailId) {
            EmailService.deleteEmail(emailId).then((msg) => {
                this.changeCatagory(this.catagory)
            })
        },
        changeCatagory(toCatagory) {
            if (toCatagory === 'All mail') {
                this.$router.push('/emails/All')
                this.catagory = 'all'
                this.emails = EmailService.getEmailsByCatagory('all')
                this.searchedEmails = this.emails.slice()
                this.sortByDate()
                if(this.searchedEmails.length > 0) this.viewEmailDetails(this.searchedEmails[0].id)
            } else {
                this.$router.push('/emails/' + toCatagory)
                this.catagory = toCatagory
                this.emails = EmailService.getEmailsByCatagory(toCatagory)
                this.searchedEmails = this.emails.slice()
                this.sortByDate()
                if(this.searchedEmails.length > 0) this.viewEmailDetails(this.searchedEmails[0].id)
                
            }
        },
        renderSort(event) {
            if (event === this.sortBy) {
                this.reverseSort()
            } else {
                switch (event) {
                    case 'date':
                        this.sortByDate()
                        this.sortBy = event
                        break;
                    case 'title':
                        this.sortEmailsByTitle()
                        this.sortBy = event
                        break;
                }
            }
        },
        sortByDate() {
            var sortedEmails = this.emails.sort(function (a, b) {
                var c = new Date(a.date)
                var d = new Date(b.date)
                return c < d
            })
            this.searchedEmails = sortedEmails
            if(this.hideRead) this.hideRead = false
        },
        sortEmailsByTitle() {
            this.searchedEmails = this.emails.sort(function (a, b) {
                return a.title > b.title
            })
            if(this.hideRead) this.hideRead = false
        },
        reverseSort() {
            this.searchedEmails.reverse();
        },
        searchEmails(event) {
            if (event.target.value === '') this.searchedEmails = this.emails.slice()
            else {
                this.searchedEmails = EmailService.searchEmails(this.emails, event.target.value)
            }
        },
        sendNewEmail(email){
            EmailService.sendMail(email).then(() =>{
                console.log('email sent')
            }).catch()
        }
    },
    watch:{
        hideRead: function (){
            if(this.hideRead){
                this.searchedEmails = this.emails.filter(email => !email.isRead)
            }else{
                this.searchedEmails = this.emails.slice()
            }
        },
    },
    components: {
        EmailPreview,
        EmailView,
        SideNav,
        SortNav,
        EmailWrite
    },
}