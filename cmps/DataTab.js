
'use strict'

export default {
    template: `
    <template slot="md-tab" slot-scope="{ tab }">
        {{ tab.label }} <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
    </template>
    `,
    props: ['badge']
}