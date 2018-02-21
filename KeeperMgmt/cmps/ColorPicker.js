
'use strict'


export default {
    template: `
    <section>
        <button @click="toggleBtns" :class="[pickerBtn, pickedColor]"></button>
        <button v-show="btnActive" @click="changeColor('white')" class="color-picker-btn color-picker-white animated bounceInLeft"></button>
        <button v-show="btnActive" @click="changeColor('red')" class="color-picker-btn color-picker-red animated bounceInLeft"></button>
        <button v-show="btnActive" @click="changeColor('blue')" class="color-picker-btn color-picker-blue animated bounceInLeft"></button>
        <button v-show="btnActive" @click="changeColor('green')" class="color-picker-btn color-picker-green animated bounceInLeft"></button>
        <button v-show="btnActive" @click="changeColor('orange')" class="color-picker-btn color-picker-orange animated bounceInLeft"></button>
    </div>
    </section>
    `,
    props:['value'],
    created() {
        this.pickedColor = `color-picker-${this.value}`;
    },
    data() {
        return {
            pickedColor: 'color-picker-white',
            pickerBtn: 'color-picker-btn',
            btnActive: false,
        }
    },
    methods: {
        changeColor(currColor){
            this.pickedColor = `color-picker-${currColor}`;
            this.$emit('saveColor', currColor)
            this.btnActive = !this.btnActive;
        },
        toggleBtns(){
            this.btnActive = !this.btnActive;
        }
    }
}