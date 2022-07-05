import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoList:any=[]
  constructor() { }

  ngOnInit(): void {
  }

  addTodo(todo:any){
    //console.log(t.value);
    if(todo.value.length>0){
      this.todoList.push(todo.value)
      todo.value=''
    }
  }

  deleteTodo(uno:any){
    this.todoList.splice(uno,1)
  }

}