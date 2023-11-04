import { Component } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public users: User[] | undefined;
  public editUser: User | undefined | null;
  public deleteUser: User | undefined | null;

  constructor(private userService: UserService){}

  title = 'taskmanagerapp';

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

   ///Method to handle addition of a new user
   public onAddUser(addForm: NgForm): void{
    const addUserForm = document.getElementById('add-user-form');
    if(addUserForm){
      addUserForm.click();
    }
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers(); //retrieve all user after adding new one
        addForm.reset(); //reset the form after successful addition
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }
  
  //To handle updating existing user
  public onUpdateUser(user: User): void{
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteUser(userId: number | undefined): void{
    if(userId == undefined){
      return;
    }
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public onOpenModal(user: User | null, mode: string): void {
    // Method to handle modal window for adding, editing or deleting an user
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      this.editUser = user; 
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    if(container){
      container.appendChild(button);
    }
    button.click();
  }

  public searchUsers(key: string): void {
    // Method to search for users based on a keyword
    console.log(key);
    if (!this.users) {
      return;
    }
    const results: User[] = [];
    for (const user of this.users) {
      if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user); // Add the matching users to the results array
      }
    }
    this.users = results; // Replace the component's users array with the results array
    if (results.length === 0 || !key) {
      this.getUsers(); // Retrieve all users if the keyword is empty or no results are found
    }
  }
}
