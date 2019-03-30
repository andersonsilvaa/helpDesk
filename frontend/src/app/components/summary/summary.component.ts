import { AbstractComponent } from './../../abstractComponent';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Summary } from './../../model/summary.model';
import { Component, OnInit } from '@angular/core';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent extends AbstractComponent implements OnInit {

  summary = new Summary(0,0,0,0,0,0);

  constructor(
    private ticketService: TicketService
  ) {
    super();
  }

  ngOnInit() {
    this.ticketService.summary().subscribe((responseApi: ResponseApi) => {
      this.summary = responseApi.data;
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }
  
}
