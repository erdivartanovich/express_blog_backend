var db = require('../../../connection');
var bookshelf = require('bookshelf')(db);
var Post = require('../posts/post');

var User = bookshelf.Model.extend({
    tableName: 'users',
    posts: function() {
      return this.hasMany(Post);
    }
});

module.exports = User;