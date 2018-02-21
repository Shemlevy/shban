'use strict'


export default {
    template: `
    <section>
        <button @click="toggleBtns" class="fa fa-star star-btn"></button>
        <button @click="toggleBtns" class="priority">{{priority}}</button>
        <button v-show="btnActive" class="fa fa-star star animated bounceInLeft" @click="changePriority(1)"></button>
        <button v-show="btnActive" class="fa fa-star star animated bounceInLeft" @click="changePriority(2)"></button>
        <button v-show="btnActive" class="fa fa-star star animated bounceInLeft" @click="changePriority(3)"></button>
        <button v-show="btnActive" class="fa fa-star star animated bounceInLeft" @click="changePriority(4)"></button>
        <button v-show="btnActive" class="fa fa-star star animated bounceInLeft" @click="changePriority(5)"></button>
    </div>
    </section>
    `,
    props:['value'],
    created() {
        this.priority = this.value;
    },
    data() {
        return {
            priority: 1,
            btnActive: false,
        }
    },
    methods: {
        changePriority(val){
            this.priority = val;
            this.$emit('savePriority', val)
            this.btnActive = !this.btnActive;
        },
        toggleBtns(){
            this.btnActive = !this.btnActive;
        }
    }
}