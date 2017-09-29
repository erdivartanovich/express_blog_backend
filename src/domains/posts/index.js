'use strict'

const chance = new require('chance')();

function splitString (string, size) {
	var re = new RegExp('.{1,' + size + '}', 'g');
	return string.match(re);
}

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

class Posts {
    constructor() {
        this.posts = this.get();
    }
    get() {
            var data = [];
            for (let i = 1; i <= 100; i++) {
                var post = {
                    id: i,
                    body: (function(){
                        var p = '';
                        [1,2,3,4,5,6,7,8,9,10].map(()=>{
                            p += `<p> ${chance.paragraph()} </p>`;
                            return p;
                        });
                        return p
                    })(),
                    title: chance.sentence({words: 5}),
                    subtitle: chance.sentence({words: 5}),
                    by: chance.name(),
                    post_date: chance.date(),
                    tags: chance.pickset((function(){
                        const arr = [];
                        for (let index = 0; index < 50; index++) {
                            let tag = chance.word();
                            arr.push(tag);
                        }
                        return arr;
                    })(), chance.integer({min: 1, max: 5})),
                    thumbnail: '/static/' + chance.word() + '.jpg'
                }
                post.chunk = splitString(post.body, 200)[0];
                data.push(post);
            }
            return data;
    }
    show(id) {
        const post = this.posts.filter((item)=>item['id']==id);
        return post 
    }
    update(id, payloads) {
        var idx = -1;
        this.posts.map((item, index)=>{
            if (item['id']==id) {
                idx = index;
                return
            }
        });
        this.posts[idx] = payloads;
        return this.posts[idx];
    };
    
}


module.exports = Posts;