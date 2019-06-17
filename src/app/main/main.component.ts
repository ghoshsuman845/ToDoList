import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TodoService } from './shared/todo.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [TodoService]
})
export class MainComponent implements OnInit {
  todolistArray: any[];
<<<<<<< HEAD
  opened:boolean= false;
=======
  opened = true;
>>>>>>> 116e0d3167238b205eaef02bea403889954b9b1d
  itemName = '';
  itemDueDate = '';
  itemRepeat = '';
  itemMessage = '';
  items: Observable<any[]>;
  contactForm: FormGroup;




  constructor(private toDoService: TodoService, private fb: FormBuilder, private db: AngularFireDatabase) {
    this.items = db.list('messages').valueChanges();
    this.contactForm = this.fb.group({
      contactFormName: ['', Validators.required],
      contactFormDueDate: ['', Validators.required],
      contactFormRepeat: ['', Validators.required],
      contactFormMessage: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.toDoService.gettodolist().snapshotChanges()
      .subscribe(item => {
        this.todolistArray = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          // tslint:disable-next-line:no-string-literal
          x['$key'] = element.key;
          this.todolistArray.push(x);
        });

        // sort array isChecked false -> true
        this.todolistArray.sort((a, b) => {
          return a.isChecked - b.isChecked;


        });
      });
  }
  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnCheckTitle($key, !isChecked);

  }
  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }


  onSubmit() {
    this.db.list('/messages').push({
      name: this.itemName, dueDate: this.itemDueDate, repeat: this.itemRepeat,
      message: this.itemMessage
    });
  }

  clearForm() {
    this.contactForm.reset();
  }

}

