import { AbstractComponent } from './../../abstractComponent';
import { UserService } from './../../services/user/user.service';
import { DialogService } from './../../dialog.service';
import { SharedService } from 'src/app/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends AbstractComponent implements OnInit {

  page: number=0;
  count: number=5;
  pages: Array<number>;
  shared: SharedService;
  listUser= [];

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router
  ) { 
    super();
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }

  editar(id:string){
    this.router.navigate(['/user-new', id]);
  }

  deletar(id:string){
    this.dialogService.confirma('Você deseja realmente deletar o usuário ?')
    .then((candelete:boolean) => {
      if(candelete){
        this.message = {};
        this.userService.delete(id).subscribe((responseApi: ResponseApi)=>{
          this.showMessage({
            type: 'success',
            text: 'Usuário deletado com sucesso'
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

  findAll(page:number, count:number){
    this.userService.findAll(page,count).subscribe((responseApi: ResponseApi) => {
      this.listUser = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, error => {
      this.showMessage({
        type: 'error',
        text: error['error']['errors'][0]
      });
    });
  }

}
