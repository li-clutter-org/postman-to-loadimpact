var util = require('util');

module.exports = {
  enabled: true,
  header: function (request) {
    var params = request.auth['basic'];
    if (params) {
      return util.format("[\"Authorization\"]=\"Basic \"..base64.encode(\"%s:%s\")", params.username, params.password)
    }
  }

};
