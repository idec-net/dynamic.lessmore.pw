import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

    favorites = {};
    favKeys = [];

    removeFromFavorites(msg: string): void {
        this.favorites = JSON.parse(localStorage.getItem("favorites"));
        if (this.favorites[msg]) {
            delete this.favorites[msg];
            localStorage.setItem("favorites", JSON.stringify(this.favorites))
        }
    }
    
    constructor() { }

    ngOnInit() {
        this.favorites = JSON.parse(localStorage.getItem("favorites"));
        if (this.favorites) {
            this.favKeys = Object.keys(this.favorites);
        }
    }

}
