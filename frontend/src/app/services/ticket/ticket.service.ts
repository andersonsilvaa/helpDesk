import { HELP_DESK_API } from './../helpdesk.api';
import { Ticket } from './../../model/ticket.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  // Método responsável por adicionar e alterar um ticket do usuário logado
  createOrUpdate(ticket: Ticket){
    if(ticket.id!=null && ticket.id == ''){
      return this.http.put(`${HELP_DESK_API}/api/ticket`, ticket);
    }else{
      ticket.id = null;
      ticket.status = 'Novo';
      return this.http.post(`${HELP_DESK_API}/api/ticket`, ticket);
    }
  }

  // Método responsável por consultar todos os tickets do usuário logado
  findAll(page:number, count:number){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  // Método responsável por consultar um ticket pelo id do usuário logado
  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  // Método responsável por deletar um ticket pelo id do usuário logado
  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  // Método responsável por consultar os tickets de acordo com os parametros informados
  findByParams(page:number, count:number, assigned: boolean, ticket: Ticket){
    ticket.number = ticket.number == null ? 0 : ticket.number;
    ticket.title = ticket.title == '' ? 'uninformed': ticket.title;
    ticket.status = ticket.status == '' ? 'uninformed': ticket.status;
    ticket.priority = ticket.priority == '' ? 'uninformed': ticket.priority;
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}/${ticket.number}/${ticket.title}/${ticket.status}/${ticket.priority}/${assigned}`); 
  }

  // Método responsável por alterar um status de um ticket
  changeStatus(status:string, ticket:Ticket){
    return this.http.put(`${HELP_DESK_API}/api/ticket/${ticket.id}/${status}`, ticket);
  }

  // Método responsável por consultar o resumo
  summary(){
    return this.http.get(`${HELP_DESK_API}/api/ticket/summary`);
  }

}
