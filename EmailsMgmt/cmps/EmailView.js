'use strict'
import EmailService from '../services/EmailService.js'


export default {
    template: `
        <section v-if="email" style="width: 100%">
                <div>recived at: {{email.date}}</div>
                <br>
                <h3>from: {{email.from}}</h3>
                <br>
                <h2>{{email.title}}</h2>
                <br>
                <p>{{email.txt}}</p>
                <div class="email-delete-button-container">
                    <md-button class="md-raised md-accent" @click="emitDelete(email.id)">Delete</md-button>
                </div>
                
        </section>
    `,
    data (){
        return {
            email: null,
        }
    },
    methods:{
        emitDelete(emailId){
            this.$emit('deleteEmail', emailId)
        }
    },
    created (){
        var initalId = this.$route.params.emailId
        EmailService.getEmailById(initalId).then(email =>{
            this.email = email
        })
    },
    watch: {
        emailId: function (currId) {
            EmailService.getEmailById(currId).then(email =>{
                this.email = email
            })
        }
    },
    computed:{
        emailId: function(){
            return this.$route.params.emailId
        }
    }
}