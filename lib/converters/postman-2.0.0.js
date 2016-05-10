
var Collection = require('postman-collection').Collection,
    LUAGenerator = require('../postman/lua-generator');

module.exports = {

  convert: function(content, callback) {

    try {
      var collection = new Collection(content);
      var result = LUAGenerator.convert(collection)
      callback(null, result);
    } catch(error) {
      callback(error);
    }

  }

}
