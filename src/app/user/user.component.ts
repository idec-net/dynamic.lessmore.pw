import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    authString: string = "";
    authEnabled: boolean = false;

    constructor() { }

    setAuthString(str: string) {
        localStorage.setItem("auth_string", str);
        this.authString = str;
    }

    delAuthString() {
        localStorage.setItem("auth_string", "");
        this.authString = "";
    }

    ngOnInit() {
        console.log(this.authString);
        this.authString = localStorage.getItem("auth_string");
        if (!this.authString) {
            this.authString = "";
        }
    }

}
