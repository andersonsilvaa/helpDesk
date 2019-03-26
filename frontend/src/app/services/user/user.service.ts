import { HELP_DESK_API } from '../helpdesk.api';
import { User } from '../../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Método responsavel por fazer o login do usuário no sistema
  login(user:User){
    return this.http.post(`${HELP_DESK_API}/api/auth`, user);
  }

  // Método responsável por criar ou atualizar um usuário no sistema
  createOrUpdate(user:User){
    if(user.id!=null && user.id != ""){
      return this.http.put(`${HELP_DESK_API}/api/user`, user);
    }else{
      user.id = null;
      return this.http.post(`${HELP_DESK_API}/api/user`, user);
    }
  }

  // Método responsável por consultar todos os usuários cadastrados no sistema
  findAll(page:number, count:number){
    return this.http.get(`${HELP_DESK_API}/api/user/${page}/${count}`);
  }

  // Método responsável por consultar um usuário pelo id
  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/user/${id}`);
  }

  // Método responsável por deletar um usuário no sistema
  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/user/${id}`);
  }

}
