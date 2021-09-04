import { PipeTransform, Pipe } from '@angular/core';
import { startCase } from 'lodash-es'

@Pipe({ name: 'startcase' })
export class StartCasePipe implements PipeTransform {
    transform(value, args: string[]): any {
        return startCase(value);
    }
}