'use strict'

import sideNavIcon from './sideNavIcon.js'

export default {
    template: `
    <section>
        <md-list class="side-nav">
            <side-nav-icon v-if="navs" @changeNav="moveTo" v-for="nav in navs" :nav="nav"></side-nav-icon>
        </md-list>
    </section>
    `,
    props: ['navs'],
    data (){
        return {
            isActive: 'move_to_inbox'
        }
    },
    methods:{
        moveTo(action){
            this.$emit('changeNav', action)
        }
    },
    components:{
        sideNavIcon
    }
}

{/* <md-list-item>
<md-icon>send</md-icon>
</md-list-item>

<md-list-item>
<md-icon>delete</md-icon>
</md-list-item>

<md-list-item>
<md-icon>error</md-icon>
</md-list-item> */}