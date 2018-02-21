
'use strict'

export default {
    template: `
    <section>
        <md-list-item  @click="emitAction" :title="nav.title">
            <md-icon>{{nav.icon}}</md-icon>
        </md-list-item>
        </section>
    `,
    props:['nav'],
    methods:{
        emitAction(){
            this.$emit('changeNav', this.nav.title)
        }
    },
}