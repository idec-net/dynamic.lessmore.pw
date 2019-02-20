import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'PrePipe',
})
export class PrePipe implements PipeTransform {
    post: string = '';
    flag: boolean = false;
    transform(input: string) {
        if (input) {
            this.post = '';
            for (let line of input.split("\n")) {
                if (line.match(/^====/i) && !this.flag) {
                    this.flag = true;
                    this.post += '<pre>====<code>';
                    continue;
                }
                if (line.match(/^====/i) && this.flag) {
                    this.flag = false;
                    this.post += '</code>====</pre>';
                    continue;
                }
                if (line.match(/^\/\//i)) {
                    line = "<font color=\"#859900\">" + line + "</font>"
                }
                if (line.match(/^\+\+\+.*/i)) {
                    line = "<font color=\"#2aa198\">" + line + "</font>"
                }
                this.post += line + "\n";
            }
        }
        return this.post;
    }
}
