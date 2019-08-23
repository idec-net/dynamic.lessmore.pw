import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ReReplacePipe',
})
export class ReReplacePipe implements PipeTransform {
    transform(input: string) {
        if (input) {
            return input.replace(/Re: /, "");
        }
    }
}
