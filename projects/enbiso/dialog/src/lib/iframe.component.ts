import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'ebs-core-dialog-iframe',
    template: `
    <div class="flex flex-col">
        <div  class="flex flex-row">
            <h2 *ngIf="title">{{title}}</h2>
            <div class="pull-right">
                <a mat-icon-button [href]="url" target="blank"><mat-icon>open_in_new</mat-icon></a>
                <button mat-icon-button (click)="onDismiss()"><mat-icon>close</mat-icon></button>
            </div>
        </div>
        <iframe frameBorder="0" 
            [style.height]="height + 'px'"
            [src]="url" 
            [title]="title"></iframe>
    </div>
    `,
    styles: [`.pull-right {margin-left:auto}`]
})

export class IFrameDialogComponent {
    url: SafeResourceUrl
    title: string
    height: number = window.innerHeight - 200

    constructor(
        public dialogRef: MatDialogRef<IFrameDialogComponent>,
        sanitizer: DomSanitizer,
        @Inject(MAT_DIALOG_DATA) data: IFrameDialogModel) {

        this.url = sanitizer.bypassSecurityTrustResourceUrl(data.url)
        this.title = data.title
    }

    onDismiss(): void {
        this.dialogRef.close();
    }
}

export class IFrameDialogModel {
    constructor(public url: string, public title: string) { }
}