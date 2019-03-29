import { AbstractComponent } from './../../abstractComponent';
import { TicketService } from './../../services/ticket/ticket.service';
import { DialogService } from './../../dialog.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/model/ticket.model';
import { Router } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent extends AbstractComponent implements OnInit {

  assignedToMe: boolean = false;
  page:number=0;
  count:number=5;
  pages:Array<number>;
  shared: SharedService;
  listTicket=[];
  ticketFilter = new Ticket('',null,'','','','',null,null,'',null);

  constructor(
    private dialogService: DialogService,
    private ticketService: TicketService,
    private router: Router
  ) { 
    super();
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }
  
  findAll(page:number, count:number){
    this.ticketService.findAll(page,count).subscribe((responseApi: ResponseApi) => {
      this.listTicket = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, error => {
      super.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  consultar():void {
    this.page = 0;
    this.count = 5;
    this.ticketService.findByParams(this.page, this.count, this.assignedToMe, this.ticketFilter)
    .subscribe((responseApi: ResponseApi) => {
      this.ticketFilter.title = this.ticketFilter.title == 'uninformed' ? '' : this.ticketFilter.title; 
      this.ticketFilter.number = this.ticketFilter.number == 0 ? null : this.ticketFilter.number;
      this.listTicket = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, error => {
      super.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  deletar(id:string){
    this.dialogService.confirma('Você deseja realmente deletar o ticket ?')
    .then((candelete:boolean) => {
      if(candelete){
        this.message = {};
        this.ticketService.delete(id).subscribe((responseApi: ResponseApi)=>{
          this.showMessage({
            type: 'success',
            text: 'Ticket deletado com sucesso'
          });
          this.findAll(this.page, this.count);
        }, error => {
          this.showMessage({
            type: 'error',
            text: error['error']['errors'][0]
          });
        });
      }
    });
  }

  setPaginaPosterior(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page = this.page+1;
      this.findAll(this.page, this.count);
    }
  }

  setPaginaAnterior(event:any){
    event.preventDefault();
    if(this.page>0){
      this.page = this.page-1;
      this.findAll(this.page, this.count);
    }
  }

  setPagina(contador:number, event:any){
    event.preventDefault();
    this.page = contador;
    this.findAll(this.page, this.count);
  }

  editar(id:string){
    this.router.navigate(['/ticket-new',id]);
  }

  detalhar(id:string){
    this.router.navigate(['/ticket-detail',id]);
  }

  limpar():void {
    this.assignedToMe = false;
    this.page = 0;
    this.count = 5;
    this.ticketFilter = new Ticket('',null,'','','','',null,null,'',null);
    this.findAll(this.page, this.count);
  }

}
