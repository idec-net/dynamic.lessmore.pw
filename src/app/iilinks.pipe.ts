import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'iiLinks',
})
export class iiLinks implements PipeTransform {
    post: string = '';
    flag: boolean = false;
    result: any;

    re = new RegExp('^ii:\/\/(.*)$');
    newWord: string = '';
    newLine: string = '';
    
    transform(input: string) {
        if (input) {
            this.post = '';
            for (let line of input.split("\n")) {
                this.newLine = '';
                for (let word of line.split(" ")) {
                    this.newWord = '';
                    if (word.match(/^ii:\/\/(.*)/i)) {
                        this.result = this.re.exec(word);
                        if (this.result) {
                            if (this.result[1].match(/.{20}(\.)?$/i)) {
                                this.newWord = '<a href="/msg/' + this.result[1] + '">ii://' + this.result[1] + '</a>';
                            } else if (this.result[1].match(/.*\..*(\.)?$/i)) {
                                this.newWord = '<a href="/echo/' + this.result[1] + '">ii://' + this.result[1] + '</a>';
                            }
                        }
                    } else {
                        this.newWord = word;
                    }
                    this.newLine += this.newWord + " ";
                }
                this.post += this.newLine + "\n";
            }
        }
        return this.post;
    }
}
