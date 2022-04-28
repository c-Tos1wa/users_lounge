import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users: Array<User> = [];
  userId: any = '';

  constructor(
    private fb:FormBuilder, 
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router
    ) {
        this.userForm = this.fb.group({
          ID: 0,
          nome: '',
          sobrenome: '',
          idade: '',
          Profissao: ''
    })
   }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.userId = params.get('ID');
      
      if(this.userId !== null){
        this.userService.getUser(this.userId).subscribe(response => {
          this.userForm.patchValue({
            ID: response[0].ID,
            nome: response[0].nome,
            sobrenome: response[0].sobrenome,
            idade: response[0].idade,
            profissao: response[0].profissao,
          })
        })
      }
    })

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
    }, (err) => {
      console.log('ERRO ao adicionar', err)
    }, () => {
      this.router.navigate(['/'])
    })
  }

  updateUser(){
    this.userService.updateUser(this.userId, this.userForm.value).subscribe(response => {
      console.log(`Usuário atualizado com sucesso!`, response)
    }, (err) => {
      console.log('ERRO ao atualizar', err)
    }, () => {
      this.router.navigate(['/'])
    })
  }

  actionButton() {
    if(this.userId !== null){
      this.updateUser()
    } else {
      this.addUser()
    }
  }

  
}


