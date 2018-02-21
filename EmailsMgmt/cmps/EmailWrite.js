'use strict'

import EmailService from '../services/EmailService.js'

export default {
    template: `
    <section>
        <div>
            <md-speed-dial class="md-bottom-right">
                <md-speed-dial-target @click="showDialog = !showDialog" title="Write new email">
                    <md-icon>edit</md-icon>
                </md-speed-dial-target>
            </md-speed-dial>  
            <md-dialog class="new-email-modal" :md-active.sync="showDialog">
                <md-dialog-title>Write a new mail</md-dialog-title>

                    <md-field :class="isEmailNotValid">
                        <label>Send to:</label>
                        <md-input v-model="email.to" required></md-input>
                        <span class="md-error">Not a vaild email</span>
                    </md-field>

                    <md-field :class="titleRequired">
                        <label>Title</label>
                            <md-input v-model="email.title" required></md-input>
                        <span class="md-error">There is an error</span>
                    </md-field>


                    <md-field :class="txtRequired">
                        <label>Textarea</label>
                        <md-textarea v-model="email.txt" required></md-textarea>
                        <span class="md-error">Required field</span>
                    </md-field>
                <div class="email-modal-attach">
                    <md-speed-dial>
                        <md-speed-dial-target class="md-primary" title="In progress">
                            <md-icon>attachment</md-icon>
                        </md-speed-dial-target>
                    </md-speed-dial>
                </div>
                <div class="md-bottom-left">
                    <md-button class="md-primary" @click="undoMail">Cancel</md-button>
                    <md-button class="md-primary" @click="checkAll">Send</md-button>
                </div>
            </md-dialog>


        </div>
    </section>
    `,

    data() {
        return {
            email: {},
            showDialog: false,
            titleRequired: null,
            isEmailNotValid: null,
            txtRequired: null,
        }
    },
    created() {
        this.email = EmailService.getEmptyEmail()
        this.email.date = EmailService.getNewDate()
        this.email.from = EmailService.getMyMail()
        this.email.id = EmailService.getNextId()
    },
    methods: {
        undoMail(){
            this.email = EmailService.getEmptyEmail()
            this.showDialog = false
        },
        checkAll() {
            var txt = this.checkTxt();
            var title = this.checkTitle();
            var email = this.checkVaildEmail();
            if(txt && title && email){
                this.$emit('sendEmail', this.email)
                this.undoMail()
            }
        },
        checkTxt(){
            if(this.email.txt.length > 0) {
                this.txtRequired = null
                return true
            }
            else{
                this.txtRequired = 'md-invalid'
                return false
            }
        },
        checkTitle(){
            if(this.email.title.length > 0){
                this.titleRequired = null
                 return true
                }
            else{
                this.titleRequired = 'md-invalid'
                return false
            }
        },
        checkVaildEmail(){
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(regex.test(this.email.to)){
                this.isEmailNotValid = null
                return true
            }else{
                this.isEmailNotValid = 'md-invalid'
                return false
            }
        }
    },
}