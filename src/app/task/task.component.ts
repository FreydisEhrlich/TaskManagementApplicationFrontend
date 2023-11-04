import { Component } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'task-root',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  public tasks: Task[] | undefined;
  public editTask: Task | undefined | null;
  public deleteTask: Task | undefined | null;

  constructor(private taskService: TaskService){}

  title = 'taskmanagerapp';

  ngOnInit() {
    this.getTasks();
  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response;
        console.log(this.tasks);
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

   public onAddTask(addForm: NgForm): void{
    const addTaskForm = document.getElementById('add-task-form');
    if(addTaskForm){
      addTaskForm.click();
    }
    this.taskService.addTask(addForm.value).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks(); 
        addForm.reset(); 
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }
  
  public onUpdateTask(task: Task): void{
    this.taskService.updateTask(task).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteTask(taskId: number | undefined): void{
    if(taskId == undefined){
      return;
    }
    this.taskService.deleteTask(taskId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public onOpenModal(task: Task | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTaskModal');
    }
    if (mode === 'edit') {
      this.editTask = task; 
      button.setAttribute('data-target', '#updateTaskModal');
    }
    if (mode === 'delete') {
      this.deleteTask = task;
      button.setAttribute('data-target', '#deleteTaskModal');
    }
    if(container){
      container.appendChild(button);
    }
    button.click();
  }

  public searchTasks(key: string): void {
    console.log(key);
    if (!this.tasks) {
      return;
    }
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (task.title.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(task); 
      }
    }
    this.tasks = results;
    if (results.length === 0 || !key) {
      this.getTasks(); 
    }
  }
}

