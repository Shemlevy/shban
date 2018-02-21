'use strict'
import EmailService from '../services/EmailService.js'

export default {
    template:`
    <section class="md-layout-item">
        <md-list-item @click="openEmail">
        <div class="md-list-item-text">
            <small v-if="catagory !== 'sent'">from: {{email.from}}</small>
            <small v-else>sent to: {{email.to}}</small>
          <h1 class="email-preview-title">{{email.title}}</h1>
          <p>{{shortText}}</p>
          <p>recived at: {{email.date}}</p>
        </div>
          <md-icon v-if="email.isRead" class="md-primary">done</md-icon>
          <md-icon v-else="email.isRead" class="md-accent">brightness_1</md-icon>
      </md-list-item>
      <md-divider class="md-inset"></md-divider>
    </section>
    `,
    props: ['email','catagory'],
    data(){
        return{
            myMail: EmailService.getMyMail()
        }
    },
    computed: {
        shortText() {
            let string = this.email.txt
            var dots = "...";
            let limit = 50;
            if (string.length > limit) {
                string = string.substring(0, limit) + dots;
            }
            return string;
        }
    },
    methods: {
        openEmail() {
            this.$emit('viewEmail', this.email.id)
        },
    }

    
}