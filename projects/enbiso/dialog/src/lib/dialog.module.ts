import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm.component';
import { IFrameDialogComponent } from './iframe.component';
import { InputDialogComponent } from './input.component';
import { MatInputModule } from '@angular/material/input';
import { DialogService } from './dialog.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    InputDialogComponent,
    IFrameDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //MAT
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [],
  providers: [DialogService]
})
export class DialogModule { }
