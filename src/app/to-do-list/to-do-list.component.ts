import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToDoListService } from './to-do-list.service';
import { Observable } from 'rxjs';
import { Task, TaskDetails } from './to-do-list.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss',
})
export class ToDoListComponent implements OnInit {
  task: Task = {
    id: 4,
    name: 'Task 4',
  };
  todo: Task = {
    id: 1,
    name: 'Task 2',
  };
  isDetailsVisible: boolean = false;
  taskDetails: any = [];
  selectedTaskDetails!: Task;
  taskModal: TaskDetails = {};
  submitted: boolean = false;
  taskDialog: boolean = false;
  buttonName: string = 'Show';

  constructor(
    private todolistService: ToDoListService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    const taskData = [
      {
        id: 1,
        name: 'Task 101',
      },
      {
        id: 2,
        name: 'Task 102',
      },
    ];
    this.taskDetails = taskData;

    this.taskModal = {
      id: 0,
      name: '',
      completed: false,
      completedPercent: 0,
    };
    this.getTaskDetails();
  }

  getTaskDetails() {
    this.todolistService.getTaskListDetailsFromJSON().subscribe({
      next: (response: any) => {
        this.taskDetails = response;
        console.info('Response', this.taskDetails);
      },
      error: (error: any) => {
        console.error('Error', error);
      },
    });
  }

  onKeyupValue() {
    const stringRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const data = stringRegex.test(this.todo.name);
    console.info('Name', data, this.todo.name);
  }

  onClickAdd() {
    if (this.todo.name.length > 1) {
      this.isDetailsVisible = !this.isDetailsVisible;
      this.isDetailsVisible
        ? (this.buttonName = 'Hide')
        : (this.buttonName = 'Show');
    } else {
      alert('Name is required.');
    }
  }

  addNewTask() {
    this.taskModal = {};
    this.submitted = false;
    this.taskDialog = true;
  }

  onClickEdit(event: any) {
    console.info('Event Edit', event);
    this.taskModal = { ...event };
    this.taskDialog = true;
  }

  saveTaskDetails() {
    this.submitted = true;
    if (
      !this.todolistService.isEmpty(this.taskModal.name) &&
      !this.todolistService.isEmpty(this.taskModal.description) &&
      !this.todolistService.isEmpty(this.taskModal.completedPercent)
    ) {
      if (this.taskModal.name?.trim()) {
        if (this.taskModal.id) {
          this.taskDetails[this.findIndexById(this.taskModal.id)] =
            this.taskModal;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Task details updated successfully.',
            life: 3000,
          });
        } else {
          this.taskModal.id = this.createId();
          this.taskModal.completed =
            this.taskModal.completedPercent == 100 ? true : false;
          this.taskDetails.push(this.taskModal);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Task details added successfully.',
            life: 3000,
          });
        }

        this.taskDetails = [...this.taskDetails];
        this.taskDialog = false;
        this.taskModal = {};
      }
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.taskDetails.length; i++) {
      if (this.taskDetails[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): number {
    return this.taskDetails.length + 1;
  }

  hideDialog() {
    this.taskDialog = false;
  }

  onClickDelete(data: any) {
    console.info('Delete Data', data);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete details for ' + data.name + ' ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskDetails = this.taskDetails.filter(
          (val: any) => val.id !== data.id
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Task Details Deleted Successfully.',
          life: 3000,
        });
      },
    });
  }
}
