export interface Post {
    author: string;
    to: string;
    address: string;
    echo: string;
    subg: string;
    id: string;
    msgid: string;
    date: number;
    tags: string;
    repto: string;
    body: string;
    topicid: string;
}

export class Answer {
    message: string;
    echo: string;
    to: string;
    repto: string;
    authstring: string;
}
