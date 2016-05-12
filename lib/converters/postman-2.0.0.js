
var Collection = require('postman-collection').Collection,
    LuaGenerator = require('../postman/lua-generator');

module.exports = {

  convert: function(content, callback) {

    try {
      var collection = new Collection(content);
      var result = LuaGenerator.convert(collection)
      callback(null, result);
    } catch(error) {
      callback(error);
    }

  }

}
