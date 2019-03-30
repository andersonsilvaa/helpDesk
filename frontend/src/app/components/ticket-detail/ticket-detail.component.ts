import { AbstractComponent } from './../../abstractComponent';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Ticket } from 'src/app/model/ticket.model';
import { DialogService } from 'src/app/dialog.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent extends AbstractComponent implements OnInit {

  page:number=0;
  count:number=5;
  shared: SharedService;
  ticket = new Ticket('',null,'','','','',null,null,'',null);

  constructor(
    private ticketService: TicketService,
    private router: ActivatedRoute
  ) { 
    super();
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id:string  = this.router.snapshot.params['id'];
    if(id!=undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    this.ticketService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.ticket = responseApi.data;
      this.ticket.data = new Date(this.ticket.data).toISOString();
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

  changeStatus(status:string): void{
    this.ticketService.changeStatus(status, this.ticket).subscribe((responseApi: ResponseApi) => {
      this.ticket = responseApi.data;
      this.ticket.data = new Date(this.ticket.data).toISOString();
      this.showMessage({
        type: 'success',
        text: 'Status modificado com sucesso'
      });
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

}
