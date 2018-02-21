'use strict'
export default {
    template: `
        <section>
            <md-speed-dial class="md-top-right note-sort-dial" md-direction="bottom" md-event="click">
            <md-speed-dial-target class="md-primary">
                <md-icon class="md-morph-initial">add</md-icon>
                    <md-icon class="md-morph-final">close</md-icon>
                </md-speed-dial-target>

                    <md-speed-dial-content>
                        <md-button title="Sort by date" @click="emitDate" class="md-icon-button">
                            <md-icon>date_range</md-icon>
                        </md-button>

                        <md-button title="Sort by priority" @click="emitPriority" class="md-icon-button">
                            <md-icon>star</md-icon>
                        </md-button>
                    </md-speed-dial-content>
                </md-speed-dial>
        </section>
    `,
    methods: {
        emitDate() {
            this.$emit('dateSorted')
        },
        emitPriority() {
            this.$emit('prioritySorted')
        }
    }
}