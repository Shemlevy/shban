'use strict';

import AppsPre from '../cmps/AppsPre.js'
import HomeFooter from '../cmps/HomeFooter.js'

export default {
    template: `
    <section>
        <section class="welcome">
            <h1 class="main-title">ShBen</h1>
            <img src="/img/background.jpg" alt="">
        </section>
        <div class="services-title-container">
        <h1 class="our-services">Our Services</h1>
        </div>
        <apps-pre></apps-pre>
        <div class="services-title-container">
            <h1 class="our-services">Our Team</h1>
        </div>
        <home-footer></home-footer>

    </section>
    `,
    created(){
        console.log('shalom')
    },
    components:{
        AppsPre,
        HomeFooter
    }
}