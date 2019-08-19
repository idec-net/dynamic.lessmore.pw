export const url: string = "/search";

export const Searches: any = {
    echoesNames: "",
    lstestPosts: '{"sort": [{"date": {"order": "desc"}}, {"_score": {"order": "desc" }}], "size": 10}',
    offsetEchoRequestString: function(echoes: string, size: number, offset: number): string {
        return '{"sort": [{"date": {"order": "desc"}}, {"_score": { "order": "desc" }}], "query": {"query_string" : {"fields": ["echo"], "query": "' + echoes + '"}}, "size":' + size + ', "from":' + offset + '}'
    }
};

export class Search {
    Url: string;
}

class Shards {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
}

class Source {
    echo: string;
    subg: string;
    to: string;
    author: string;
    message: string;
    date: string;
    msgid: string;
    tags: string;
    repto: string;
    address: string;
    topicid: string;
    misplaced: string;
}

class Hits {
    total: number;
    max_score: number;
    hits: any;
}

// hits['hit']
class Hit {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: Source;
}

class Aggregations {
    my_fields?: MyFields;
    topics?: MyFields;
}

class MyFields {
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: Bucket[];
}

class Bucket {
    key: string;
    doc_count: number;
}

// Elasticsearch search response
export interface ESResponse {
    took: number;
    timed_out: boolean;
    _shards: Shards;
    hits: Hits;
    aggregations: any;
}
