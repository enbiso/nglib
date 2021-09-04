import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'ebs-core-refresh-callback',
    template: ``
})

export class RefreshCallbackComponent implements OnInit {
    constructor(private store: Store) { }

    ngOnInit() {

    }
}