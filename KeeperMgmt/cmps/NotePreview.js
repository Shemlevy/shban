'use strict';
export default {
    template: ` 

    <md-card>
        <div :class="colorClass" @click="openNote">
            <md-card-media-cover md-text-scrim>
                <md-card-media md-ratio="16:9">
                    <img v-if="note.img" :src="'KeeperMgmt/img/'+note.img+'.jpg'"> 
                    <img v-else :background-color="note.color"/>
                </md-card-media>
                <md-card-area>
                    <md-card-header>
                    <span class="md-subhead">{{note.date}}</span>
                    <span class="md-title">{{note.title}}</span>
                    <span class="md-subhead">{{shortText}}</span>
                    </md-card-header>
                </md-card-area>
            </md-card-media-cover>
        </div>
  </md-card>

    `,
    props: ['note'],
    computed: {
        shortText() {
            let string = this.note.text
            var dots = "...";
            let limit = 150;
            if (string.length > limit) {
                string = string.substring(0, limit) + dots;
            }
            return string;
        }
    },
    data () {
        return {
            colorClass:`color-picker-${this.note.color}`
        }
    },
    methods: {
        openNote() {
            this.$emit('viewNote', this.note.id)
        },
    }
}
