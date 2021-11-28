import { MonoTypeOperatorFunction } from 'rxjs'
import { filter } from 'rxjs/operators'

export function filterNil<T>(): MonoTypeOperatorFunction<T> {
    return filter(value => value !== undefined && value !== null)
}