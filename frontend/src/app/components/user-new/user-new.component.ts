import { UserService } from './../../services/user/user.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  user = new User('','','','');
  shared : SharedService;
  message  : {};
  classCss : {};

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { 
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if(id!=undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    this.userService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.user = responseApi.data;
      this.user.password = '';
      this.user.profile = this.buscarPerfilDoUsuario(this.user);
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }
  
  registrar(){
    this.message = {};
    this.user.profile = this.getPerfilDoUsuario(this.user);
    this.userService.createOrUpdate(this.user).subscribe((responseApi: ResponseApi) => {
      this.user = new User('','','','');
      let userRet : User = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registro ${userRet.email} adicionado com sucesso`
      });
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  private buscarPerfilDoUsuario(user:User): string {
    switch(user.profile){
      case 'ROLE_ADMIN':
        return 'Administrador';
        break;
      case 'ROLE_CUSTOMER':
        return 'Usuário';
        break;
      case 'ROLE_TECHNICIAN':
        return 'Técnico';
        break;
    }
  }

  private getPerfilDoUsuario(user:User): string {
    switch(user.profile){
      case 'Administrador':
        return 'ROLE_ADMIN';
        break;
      case 'Usuário':
        return 'ROLE_CUSTOMER';
        break;
      case 'Técnico':
        return 'ROLE_TECHNICIAN';
        break;
    }
  }

  private showMessage(message: {type: string, text: string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert':true
    }
    this.classCss['alert-'+type] = true;
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group' : true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };

  }

}
