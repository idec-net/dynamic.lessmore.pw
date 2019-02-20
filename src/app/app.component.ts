import { Component } from '@angular/core';
import { EchoService } from './echo.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'dynamic | less';

    constructor(
        private echoService: EchoService,
    ) { }

    ngOnInit() {
        this.echoService.selectedEcho = JSON.parse(localStorage.getItem("selectedEcho"));
    }
}
