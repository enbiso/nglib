import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'ebs-core-dialog-confirm',
    template: `
<div mat-dialog-content>
    <div class="mat-title">{{title}}</div>
    <div class="mat-subheading-1">{{message}}</div>
</div>
<div mat-dialog-actions class="mb-1">
    <button mat-raised-button data-test="yes" color="primary" (click)="onConfirm()">Yes</button>
    <button mat-button data-test="no" (click)="onDismiss()">No</button>
</div>
    `
})

export class ConfirmDialogComponent {
    title: string;
    message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
        this.title = data.title;
        this.message = data.message;
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}

export class ConfirmDialogModel {
    constructor(public title: string, public message: string) { }
}