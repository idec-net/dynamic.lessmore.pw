import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Rx"

import { EchoService } from '../echo.service';
import { PostService } from '../post.service';
import { ESResponse } from '../search';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
    posts = [];
    offsetPosts: any;
    size: number = 10;
    order: string = localStorage.getItem("postsOrder");
    msgPopupToggle: boolean = false;
    msgPopup = [];
    orderNames = {
        "desc": "от свежих к старым",
        "asc": "от старых к свежим"
    };

    // We can receive parameters from /msg/:id router
    id: string;
    echo: string;
    private sub: any;

    favsEnabled = true;
    favorites = JSON.parse(localStorage.getItem("favorites"));

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

   closeMsgPopup(){
       console.log('mouse leave');
       this.msgPopupToggle = false;
   }
    
    changeOrder(){
        
        if (this.echo) {
            if (this.order === "desc") {
                console.log("Toggle asc order");
                localStorage.setItem("postsOrder", "asc");
                this.zone.runOutsideAngular(() => {
                    location.reload();
                });
            } else {
                console.log("Toggle desc order");
                localStorage.setItem("postsOrder", "desc");
                this.zone.runOutsideAngular(() => {
                    location.reload();
                });
            }
        }
    }

    constructor(
        public postService: PostService,
        private route: ActivatedRoute,
        private zone: NgZone
    ) { }

    ngOnInit() {
        // Get favorites
        this.favorites = JSON.parse(localStorage.getItem("favorites"));
        if (!this.favorites) {
            this.favorites = {};
        }
        if (!localStorage.getItem("postsOrder")) {
            localStorage.setItem("postsOrder", "desc")
            this.order = "desc";
        }
        this.postService.settings.offset = 0;
        this.postService.settings.size = 0;
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.sub = this.route.params.subscribe(params => {
            this.echo = params['echo'];
        });
        if (this.id) {
            this.postService.getMessageByID(this.id).subscribe(posts => this.postService.posts = posts.hits.hits);
        } else if (this.echo) {
            this.postService.settings.size = this.size;
            this.postService.getSingleEcho(this.echo, this.order).subscribe(posts => this.postService.posts = posts.hits.hits);
        } else {
            if (this.postService.echoesList() != "") {
                this.postService.getEchoPosts().subscribe(posts => this.postService.posts = posts.hits.hits);
            } else {
                this.getPosts();
            }
        }
    }

    getPosts(): void {
        this.postService.getPosts().subscribe(posts => this.postService.posts = posts.hits.hits);
    }

    onScrollDown () {
        if (!this.id && !this.echo) {
            // add another 10 items
            this.offsetPosts = [];
            this.postService.settings.offset += 10;
            this.postService.settings.size = this.size;
            this.postService.getPostsOffset().subscribe(scrolled => {
                this.offsetPosts = scrolled.hits.hits;
                for (let post of this.offsetPosts) {
                    this.postService.posts.push(post);
                }
            });
        } else if (this.echo) {
            console.log("Loading " + this.echo);
            // add another 10 items
            this.offsetPosts = [];
            this.postService.settings.offset += 10;
            this.postService.settings.size = this.size;
            this.postService.getSingleEcho(this.echo, this.order).subscribe(scrolled => {
                this.offsetPosts = scrolled.hits.hits;
                for (let post of this.offsetPosts) {
                    this.postService.posts.push(post);
                }
            });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
