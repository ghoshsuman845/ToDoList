import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  todolist: AngularFireList<any>;
  

  constructor(private firebasedb: AngularFireDatabase) {
    
     
   }
 gettodolist(){
   this.todolist = this.firebasedb.list('titles');
   return this.todolist;
 }
 addTitle(title:string){
   this.todolist.push({
     title:title,
     isChecked:false
   });
 }

 checkOrUnCheckTitle($key: string, flag:boolean){
   this.todolist.update($key,{ isChecked: flag});

 }

 removeTitle($key:string){
   this.todolist.remove($key);
 }

 

  

  }
