import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

import { NgForm } from '@angular/forms';

import { Answer, Post } from '../post';

@Component({
    selector: 'app-threads',
    templateUrl: './threads.component.html',
    styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {

    id: string;
    posts = [];
    private sub: any;

    answerForm = {};
    replySubg: string;
    answer = new Answer;
    public answerError = {};

    favsEnabled = true;
    favorites = JSON.parse(localStorage.getItem("favorites"));

    msgPopupToggle: boolean = false;
    msgPopup = [];

    constructor(
        private route: ActivatedRoute,
        public postService: PostService,
    ) { }

    closeErrorPanel() {
        this.answerError = {};
    }

    showAnswerForm(id: string, subg: string) {
        if (this.answerForm[id]) {
            this.answerForm[id] = false;
        } else {
            this.answerForm[id] = true;
            this.replySubg = this.postService.makeReplySubg(subg);
        }
    }

    postAnswer(form: NgForm, post: Post) {
        if (form.status !== "VALID") {
            this.answerError = {
                status: "Error",
                message: "Проверь заполненные поля!"
            };
            return
        } else {
            // Cleanup error
            this.answerError = {};
            let data = "pauth=" + form.value.authInput + "&tmsg=" + this.postService.makeIdecReptoMessage(form, post);
            console.log(this.postService.makeIdecReptoMessage(form, post));

            // return
            this.postService.postMessage(data).subscribe(
                ok => {
                    window.location.href = "/echo/" + post.echo;
                },
                err => {
                    console.log(err);
                    if (err.status != 200) {
                        this.answerError = {
                            status: "Error",
                            message: err.error
                        }
                    } else {
                        window.location.href = "/thread/" + post.topicid;
                    }
                }
            );
        }
    }

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
