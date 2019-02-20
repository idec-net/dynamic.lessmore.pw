import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
    selector: 'app-threads',
    templateUrl: './threads.component.html',
    styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {

    id: string;
    posts = [];
    private sub: any;

    favsEnabled = true;
    favorites = JSON.parse(localStorage.getItem("favorites"));

    msgPopupToggle: boolean = false;
    msgPopup = [];

    constructor(
        private route: ActivatedRoute,
        public postService: PostService,
    ) { }

    addToFavorites(post: object) {
        this.favorites = JSON.parse(localStorage.getItem("favorites"));
        if (!this.favorites) {
            this.favorites = {};
            this.favorites[post["msgid"]] = post;
            localStorage.setItem("favorites", JSON.stringify(this.favorites));
        } else {
            if (!this.favorites[post["msgid"]]) {
                this.favorites[post["msgid"]] = post;
                localStorage.setItem("favorites", JSON.stringify(this.favorites));
            }
        }
    }

    removeFromFavorites(msg: string): void {
        this.favorites = JSON.parse(localStorage.getItem("favorites"));
        if (this.favorites[msg]) {
            delete this.favorites[msg];
            localStorage.setItem("favorites", JSON.stringify(this.favorites))
        }
    }

    showMsgPopup(id: string) {
        console.log(this.postService.popup);
        if (this.postService.popup[0] && this.postService.popup[0]["_source"]["msgid"] == id) {
            console.log("Get from cache");
            console.log(this.msgPopup[0]);
            this.msgPopupToggle = true;
        } else {
            console.log("Get from elastic");
            this.postService.getMessageByID(id).subscribe(msgPopup => this.postService.popup = msgPopup.hits.hits);
            this.msgPopupToggle = true;
        }
    }

    closeMsgPopup() {
        this.msgPopupToggle = false;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.postService.getThreadPosts(this.id).subscribe(
            posts => {
                this.posts = posts.hits.hits;
                console.log(this.posts);
            });
        console.log(this.id);
    }

}
