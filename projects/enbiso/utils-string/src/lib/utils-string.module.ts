import { NgModule } from '@angular/core';
import { StartCasePipe } from './startcase.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
    imports: [],
    exports: [StartCasePipe, TruncatePipe],
    declarations: [StartCasePipe, TruncatePipe],
    providers: [],
})
export class EbsUtilsStringModule { }
