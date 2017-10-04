var db = require('../../../connection');
var bookshelf = require('bookshelf')(db);
var User = require('../users/user');

var Post = bookshelf.Model.extend({
    tableName: 'posts',
    user: function() {
      return this.belongsTo(User);
    }
});

module.exports = Post;