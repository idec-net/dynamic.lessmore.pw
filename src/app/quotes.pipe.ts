import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'QuotesPipe',
})
export class QuotesPipe implements PipeTransform {
    post: string = '';
    flag: boolean = false;
    codeFlag: boolean = false;
    transform(input: string) {
        if (input) {
            this.post = '';
            for (let line of input.split("\n")) {
                if (line.match(/====/i) && !this.codeFlag) {
                    this.codeFlag = true;
                } else if (line.match(/====/i) && this.codeFlag) {
                    this.codeFlag = false;
                }
                if (!this.codeFlag) {
                    if (line.match(/^>(\s)?.*$/i)) {
                        this.post += '<div class="quote">' + line + '</div>' + "\n";
                        continue;
                    }
                    if (line.match(/^(\w+)(>)?(>)?> .*$/i) && !this.flag) {
                        this.flag = true;
                        this.post += '<div class="quote">';
                    } else if (!line.match(/^(>)?(>)?> .*$/i) && this.flag) {
                        this.flag = false;
                        this.post += '</div>';
                    }
                }
                this.post += line + "\n";
            }
        }
        return this.post;
    }
}
