import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
