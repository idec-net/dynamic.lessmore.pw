import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

    error = {};

    constructor(
        private postService: PostService,
    ) { }

    closeErrorPanel() {
        this.error = {};
    }

    post(form: NgForm) {
        if (form.status !== "VALID") {
            this.error = {
                status: "Error",
                message: "Проверь заполненные поля!"
            };
            return
        } else {
            // Cleanup error
            this.error = {};
            let data = "pauth=" + form.value.authInput + "&tmsg=" + this.postService.makeIdecNewMessage(form);
            this.postService.postMessage(data).subscribe(
                ok => {
                    window.location.href = "/echo/" + form.value.echoInput;
                },
                err => {
                    console.log(err);
                    if (err.status != 200) {
                        this.error = {
                            status: "Error",
                            message: err.error
                        }
                    } else {
                        window.location.href = "/echo/" + form.value.echoInput;
                    }
                }
            );
        }
    }

    ngOnInit() {
    }

}
