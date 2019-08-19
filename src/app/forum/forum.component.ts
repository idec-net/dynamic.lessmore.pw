import { Component, OnInit } from '@angular/core';

import { EchoService } from '../echo.service';
import { PostService } from '../post.service';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

    answerError = {};

    posts: Array<any> = [];

    closeErrorPanel() {
        this.answerError = {};
    }
    
    constructor(
        public postService: PostService,
    ) {}

    ngOnInit() {
        this.postService.getForumPosts().subscribe(
            posts => {
                this.posts = posts.aggregations.topics.buckets;
                console.log(this.posts);
            }
        );
    }
}
