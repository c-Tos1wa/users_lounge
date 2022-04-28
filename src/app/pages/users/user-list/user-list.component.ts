import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<User> = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void{
    this.userService.getUserList().subscribe( response => {
      this.users = response;
    })
  }

  deleteUser(id: number): void{
    this.userService.deleteUser(id).subscribe(response => {
      console.log('Usuário deletado')
    }, (err) => {
      console.log(err)
    }, () => {
      this.getUsers();
    })
  }

}
