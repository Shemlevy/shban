
'use strict'

export default {
    template: `
    <section>
    <md-button class="md-raised md-layout-item" @click="emitSort">
        {{sort.by}}
        <span v-if="isActive">
        <md-icon>{{sort.icon}}</md-icon>
        </span>
    </md-button>
    </section>
    `,
    props: ['sort', 'activeSort'],
    data() {
        return {
            isActive: false
        }
    },
    created (){
        if (this.sort === this.activeSort) this.isActive = true
        else this.isActive = false
    },
    methods: {
        emitSort() {
            this.$emit('changeSort', this.sort.by)
        }
    },
    watch: {
        activeSort: function () {
            if (this.sort === this.activeSort) this.isActive = true
            else this.isActive = false
        }
    }
}