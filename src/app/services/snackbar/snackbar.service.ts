import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  snackBarEvent = new EventEmitter();

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(msg: string) { 
    this.snackBar.open(msg, 'Ok', { duration: 2000 });
    // this.snackBarEvent.emit(this.snackBar, msg);
  }
}
