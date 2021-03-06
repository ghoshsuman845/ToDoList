import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todolist: AngularFireList<any>;
  subTaskList: AngularFireList<any>;
  
  taskList: AngularFireList<any>;

  constructor(   private firebasedb: AngularFireDatabase) {


  }
  // get task list form firebase (task list)
  getTaskList (){
    this.taskList = this.firebasedb.list('subTitles');
    return this.taskList;
      
  }
// get task by task-id from firebase list ( single task )
  getTaskById(id) {
    return this.firebasedb.object('subTitles/'+id);

 }  gettodolist() {
    this.todolist = this.firebasedb.list('titles');
    return this.todolist;
  }
  addTitle(title: string) {
    this.todolist.push({
      title: title,
      isChecked: false
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.todolist.update($key, { isChecked: flag });

  }

  removeTitle($key: string) {
    this.todolist.remove($key);
  }
  
  getsubTaskList() {
    this.subTaskList = this.firebasedb.list('subTitles');
    return this.subTaskList;
  }
  addSubTitle(subTitle: string) {
    this.subTaskList.push({
      title: subTitle,
      isChecked: false
    });
  }

  checkOrUnCheckSubTitle($key: string, flag: boolean) {
    this.subTaskList.update($key, { isChecked: flag });

  }

  removeSubTitle($key: string) {
    this.subTaskList.remove($key);
  }



}
