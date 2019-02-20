import { Component, OnInit } from '@angular/core';

import { Echo } from '../echo';
import { EchoService } from '../echo.service';
import { PostService } from '../post.service';
import { ESResponse } from '../search';

// Pipes
import { FilterPipe } from '../filter.pipe';

@Component({
    selector: 'app-echo',
    templateUrl: './echo.component.html',
    styleUrls: ['./echo.component.css']
})

export class EchoComponent implements OnInit {
    public echoes: ESResponse;
    hideSidebar: boolean = true;
    queryString;

    toggleSidebar() {
        if (this.hideSidebar) {
            console.log("Toggle sidebar on");
            this.hideSidebar = false;
        } else {
            console.log("Toggle sidebar off");
            this.hideSidebar = true;
        }
    }

    constructor(
        public echoService: EchoService,
        private postService: PostService,
    ) { }

    ngOnInit() {
        this.echoService.selectedEcho = JSON.parse(localStorage.getItem("selectedEcho"));
        this.getEchoes();
    }

    getEchoes(): void {
        this.echoService.getEchoes().subscribe(echoes => this.echoes = echoes.aggregations.my_fields.buckets);
    }

    // Set select class and get posts from selected echo
    onSelect(echo: Echo): void {
        if (!this.echoService.selectedEcho) {
            this.echoService.selectedEcho = {};
        }
        if (this.echoService.selectedEcho[echo.key]) {
            // Delete key from hashmap
            delete this.echoService.selectedEcho[echo.key];
            localStorage.setItem("selectedEcho", JSON.stringify(this.echoService.selectedEcho));
        } else {
            this.echoService.selectedEcho[echo.key] = echo;
            localStorage.setItem("selectedEcho", JSON.stringify(this.echoService.selectedEcho));
        }
        this.postService.getEchoPosts().subscribe(posts => this.postService.posts = posts.hits.hits);
    }
}
