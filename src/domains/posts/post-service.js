'use strict'

const Post = require('./post');

class PostService {
    get() {
       return Post
            .fetchAll({
                withRelated: [
                    {
                        'user': function(qb) {
                            qb.select('users.id', 'users.username');
                        }
                    }
                ]
            })
            .then(function(result){
                var data;
                if (result.models) {
                    data = result;
                }
                return Promise.resolve(data);
            });
    }
    show(id) {
        return Post.where('id', id)
            .fetch({
                withRelated: [
                    {
                        'user': function(qb) {
                            qb.select('users.id', 'users.username');
                        }
                    }
                ]
            })
            .then(function(result){
                var data = result ? result : {};
                return Promise.resolve(data);
            });
    }
    update(id, payloads) {
        return Post.where('id', id)
            .fetch({
                withRelated: [
                    {
                        'user': function(qb) {
                            qb.select('users.id', 'users.username');
                        }
                    }
                ]
            })
            .then(function(post){
                var newPost = {};
                for (var key in payloads) {
                    if (key in post.attributes) {
                        newPost[key] = payloads[key];
                    }
                }
                newPost['updated_at'] = (new Date).toISOString();
                return post
                    .save(newPost)
                    .then(function(result){
                        return Promise.resolve(result);
                    })
                    .catch(function(error){
                        return Promise.reject(error);
                    });
            });
    };
    
    create(payloads) {
        var newPost = {};
        for (var key in payloads) {
            newPost[key] = payloads[key];
        }
        newPost['created_at'] = (new Date).toISOString();
        newPost['updated_at'] = (new Date).toISOString();
        
        return new Post(newPost)
            .save()
            .then(function(post){
                return Promise.resolve(post);
            })
            .catch(function(error){
                return Promise.reject(error);
            })
    }
}

module.exports = PostService;
