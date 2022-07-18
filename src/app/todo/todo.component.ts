import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { addDoc, Firestore, collection } from '@angular/fire/firestore'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm = this.fb.group({
    todo: ['', [Validators.pattern('[a-zA-Z]*')]],
    time: ['', [Validators.pattern('[0-9:]*')]],
  });

  // pendingList:any=[
  //   {task:"wash car"},
  //   {task:"clean house"},
  //   {task:"pay bill"},
  //   {task:"bring vegitables"}
  // ]

  pendingList: any = [];
  doneList: any = [];

  titile = 'stopwatch';

  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;

  startTimer: any;
  running = false;

  stopTime: any;

  task: any;
  todo: any;

  visible: boolean = false;

  message:any="No Records Found"

  constructor(private fb: FormBuilder, public firestore:Firestore) {}

  ngOnInit(): void {}

  // onKey(event: any) {
  //   this.pauseTime += event.target.value(this.pauseTime);
  // }

  addData(value:any){
    const dbInstance=collection(this.firestore,'todo')
    addDoc(dbInstance,value)
    .then(() =>{
      alert('Data sent')
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  // addTodo(todo: any, time: any) {
  //   var newTodo = {
  //     task: todo.value,
  //     time: time.value,
  //   };

  //   if (todo.value.length > 0 && time.value.length > 0) {
  //     this.doneList.push(newTodo);

  //       for(var i=0;i<this.pendingList.length;i++){
  //         if(this.pendingList[i]["task"]==todo.value){
  //           this.pendingList.splice(i,1);
  //         }
  //       }
      
  //     todo.value = '';
  //     time.value = '';
    
  //     this.hr = this.min = this.sec = this.ms = '0' + 0;
  //   }

  //   if (todo.value.length > 0 && time.value.length == 0) {
  //     this.pendingList.push(newTodo);
  //     todo.value = '';
  //     time.value = '';
  //   }

  // }

  doneTodo(todo: any, no: any) {
    this.task = todo;
    
    //this.task=this.pendingList.find((task:any)=>task[0]==no)
    //this.pendingList.splice(no, 1);
    
    
  }

  deleteTodo(pno: any) {
    this.pendingList.splice(pno, 1);
  }

  delTodoDone(dno: any) {
    this.doneList.splice(dno, 1);
  }

  start() {
    
    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if (this.ms === 100) {
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0;
        }

        if (this.sec === 60) {
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }

        if (this.min === 60) {
          this.hr++;
          this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
          this.min = '0' + 0;
        }
      }, 10);
    } else {
      this.pause();
    }
  }

  pause() {
    clearInterval(this.startTimer);
    this.running = false;
  }

  btnStop(hrs: any, mins: any, secs: any) {
    clearInterval(this.startTimer);
    this.stopTime = hrs + ':' + mins + ':' + secs;
    this.running=false
  }

  reset() {
    clearInterval(this.startTimer);
    this.running = false;
    this.hr = this.min = this.sec = this.ms = '0' + 0;
    // this.start();
  }

  addTime() {
    this.visible = !this.visible;
  }
}
