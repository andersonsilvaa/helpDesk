import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    confirma(message?: string){
        return new Promise(resolve => {
            return resolve(window.confirm(message || 'Confirm ?'));
        })
    }
}