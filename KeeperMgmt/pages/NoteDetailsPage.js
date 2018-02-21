import NoteService from '../services/NoteService.js'
import NotesMgmt from './NotesMgmt.js'
import ColorPicker from '../cmps/ColorPicker.js'
import PriorityPicker from '../cmps/PriorityPicker.js'

export default {
    template: `
        <section class="note-details"  v-if="note">
            <div class="note-view" v-if="note">
                <div class="note-edit-date"">{{note.date}}</div>
                <div class="note-edit-title" @click.once="clearInput"  @blur="updateTitle($event ,note)" :contenteditable="true">{{note.title}}</div>
                <div class="note-edit-text"  @click.once="clearInput" @blur="updateText($event ,note)" :contenteditable="true">{{note.text}}</div>
                <div class="note-edit-img-container">
                <input type="file" @change="changeImg" class="input-file" ref="fileInput" accept=".jpg, .jpeg, .png"/> 
                <img @click="trigger" class="note-img" v-if="note.img" :src="'KeeperMgmt/img/'+note.img+'.jpg'" title="click to change a image"> 
                <i @click="trigger" class="fa fa-camera" aria-hidden="true" title="click to change a image" v-else></i>
                </div>
                <section class="tools">
                    <color-picker :value="note.color" @saveColor="changeColor"></color-picker>
                    <priority-picker :value="note.priority" @savePriority="changePriority"></priority-picker>
                </section>
                <button class="delete-btn" @click="deleteNote(note.id)">Delete</button>
            </div>
        </section>
    `,
    data() {
        return {
            note: null,
            pickedColor: ''

        }
    },
    created() {
        var noteId = +this.$route.params.noteId
        NoteService.getNoteById(noteId)
            .then(note => {
                this.note = note
                this.pickedColor = `color-picker-${note.color}`;
            })
            .catch(err => {
                this.$router.push('/notes')
            })

    },
   
    methods: {
        changeColor(color) {
            this.note.color = color
            this.pickedColor = `color-picker-${color}`;   
        },
        changePriority(val) {
            this.note.priority = val
        },
        updateTitle(ev, note) {
            this.note.title = ev.target.innerText
            this.note.newTitle = false;
            NoteService.saveNote(note)
        },
        updateText(ev, note) {
            this.note.text = ev.target.innerText
            this.note.newText = false;
            NoteService.saveNote(note)
        },
        deleteNote(noteId) {
            NoteService.deleteNote(+noteId)
                .then(_ => {
                    this.$router.push('/notes')
                })
                .catch(err =>
                    console.log('Error')
                )
        },
        clearInput(ev) {
            var text = this.note
            if (text.newTitle || text.newText) ev.target.innerText = ''

        },
        trigger(){
            this.$refs.fileInput.click()
        },
        changeImg(e) {
            console.log('e,',e.target.value);
            // this.note.img = e.target.value;
        }
    },
    components: {
        ColorPicker,
        PriorityPicker
    },
}

