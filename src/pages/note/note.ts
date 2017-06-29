import { Component,Input } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { TokenManager } from '../../providers/token.manager';
import { NoteService } from '../../providers/note.manager';
import { AuthService } from "../../providers/auth.manager";
/**
 * Generated class for the NotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {

  @Input() duration: any = "0";
  notes: any;
  user: any;
  passNote: any;
  @Input() distance: any = 1;
  @Input() calories: any = 0;
  showEdit: boolean = false;
  public titleNote: any = "";
  public editNote: any = "";
  public addTitle: string;
  public adDNote: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private authService :AuthService , private noteService: NoteService, private authToken: TokenManager) {
  this.user = this.authToken.getToken("token").user;

    this.noteService.getNotes(this.user.email).then((theNotes) => {
      this.notes = theNotes;

    }, (err) => {
        console.log("not allowed");
    }
    );
  
}

  ionViewDidLoad() {


  
  }
 
  addNote(title: string, note: string) {
    if (title != "" && note != ""  && title != undefined && note != undefined) {
     
      var oneNote = {
        email: this.user.email,
        title: title,
        note: note,
        showButtons: false


      }
      this.noteService.add(oneNote).then((returnedNote )=> {
        if(returnedNote != null&& returnedNote!= undefined&&returnedNote!== {err: "Email already exists"}){
          returnedNote.showButtons=true;
      this.notes.push(returnedNote);
        }
        
        this.addTitle = "";
        this.adDNote = "";
      }, (err) => {
          
        }
      )

    }

  }
  edit(note: any) {
    this.showEdit = true;
    this.passNote = note;
    this.titleNote = note.title;
    this.editNote = note.note;

  }
  updateNote() {
    this.passNote.title = this.titleNote;
    this.passNote.note = this.editNote;
    this.noteService.edit(this.passNote).then(thenote => {
      var note = {
        email: this.user.email,
        title: thenote.title,
        note: thenote.note,
        showButtons: false,
        _id: thenote._id
      }
      this.passNote = note;
    })
    this.showEdit = false;
  }
  removeEdit(){
    this.showEdit = false;
      this.titleNote = "";
    this.editNote = "";
  }
  delete(note: any, i: number) {
    this.noteService.delete(note).then(isdelete => {
      if (isdelete) {
        this.notes.splice(i, 1);
        
      }

    })
  }
}
