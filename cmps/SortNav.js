
'use strict'

import SortNavBtn from './SortNavBtn.js'

export default {
    template: `
    <section>
        <div class="md-layout  md-alignment-center-left sort-nav">
        <h2>Sort by:</h2><sort-nav-btn v-if="sorts" @changeSort="sortTo" v-for="sort in sorts" :sort="sort" :sortBy="activeSort"></sort-nav-btn>
        </div>
    </section>
    `,
    props: ['sorts', 'sortBy'],
    data(){
        return {
            activeSort: this.sortBy
        }
    },
    methods: {
        sortTo(action) {
                this.activeSort = action
                this.$emit('renderSort', action)
        }
    },
    watch: {
        sortBy (){
            this.activeSort = this.sortBy
        }
    },
    components: {
        SortNavBtn
    }
}