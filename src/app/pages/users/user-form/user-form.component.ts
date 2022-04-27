import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];

  constructor(private fb:FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      ID: 0,
      nome: '',
      sobrenome: '',
      idade: '',
      Profissao: ''
    })
   }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUserList().subscribe(response => {
      this.users = response;
    })
  }

  addUser(){
    this.userForm.get('ID')?.patchValue(this.users.length + 1)
    this.userService.postUser(this.userForm.value).subscribe(result => {
      console.log('Usuario foi cadastrado com sucesso!')
    })
  }
}


