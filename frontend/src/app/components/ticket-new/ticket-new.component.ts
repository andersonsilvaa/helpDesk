import { AbstractComponent } from './../../abstractComponent';
import { TicketService } from './../../services/ticket/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ticket } from 'src/app/model/ticket.model';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent extends AbstractComponent implements OnInit {

  @ViewChild('form')
  form: NgForm

  ticket = new Ticket('',0,'','','','',null, null,'',null);
  shared = SharedService.getInstance();
  message: {};
  classCss: {};

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) { 
    super();
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id: string = this.route.snapshot.params['id'];
    if(id!=undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    this.ticketService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.ticket = responseApi.data;
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  registrar(){
    this.message = {};
    this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi: ResponseApi) => {
      this.ticket = new Ticket('',0,'','','','',null, null,'',null);
      let ticketRet : Ticket = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registro ${ticketRet.title} adicionado com sucesso`
      });
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  onConverteImagemParaByte(event): void {
    if(event.target.files[0].size > 2000000){
      this.showMessage({
        type: 'error',
        text: 'Tamanho máximo para imagem é de 2 MB'
      })
    }else{
      this.ticket.imagem = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.ticket.imagem = reader.result as string;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group' : true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };

  }

}
