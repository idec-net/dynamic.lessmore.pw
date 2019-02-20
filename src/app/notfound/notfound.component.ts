import { Component, OnInit } from '@angular/core';
import { EchoService } from '../echo.service';
import { Echo } from '../echo';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
    echoes: Echo[];
    randEcho: any = {
        key: "not.found",
        doc_count: 0
    };

    constructor(private echoService: EchoService) {}

    ngOnInit() {
        this.echoService.getEchoes().subscribe(echoes => {
            this.echoes = echoes.aggregations.my_fields.buckets;
            this.randEcho = this.echoes[Math.floor(Math.random() * this.echoes.length)];
        });
    }
}
