'use strict'


export default {
    template:`
    <md-card>
    <div @click="emitAction">
        <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="16:9">
                <img src=""/>
            </md-card-media>
            <md-card-area>
                <md-card-header>
                <md-icon class="md-size-5x add-note-icon">note_add</md-icon>
                </md-card-header>
            </md-card-area>
        </md-card-media-cover>
    </div>
    </md-card>
    `,
    methods:{
        emitAction(){
            this.$emit('addNote')
            console.log('emitting??')
        }
    }
}