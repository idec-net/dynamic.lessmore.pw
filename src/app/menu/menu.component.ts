import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    hideMenu: boolean = true;
    toggleMenu() {
        if (this.hideMenu) {
            this.hideMenu = false;
        } else {
            this.hideMenu = true;
        }
    }

    hideFAQ: boolean = true;
    toggleFAQ() {
        if (this.hideFAQ) {
            this.hideFAQ = false;
        } else {
            this.hideFAQ = true;
        }
    }
    
    constructor() { }

    ngOnInit() {
    }

}
