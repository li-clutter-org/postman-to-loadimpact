var util = require('util');

module.exports = {

  buildLUARequest: function(options) {

    var url = options.url,
        method = options.method,
        headers = options.headers,
        data = options.data,
        preRequest = options.preRequest,
        postRequest = options.postRequest,
        sleepTime = options.sleepTime,
        variable = options.variable,
        shouldReplaceVariables = true,
        result = '';

    if (preRequest) {
      result += util.format("%s", preRequest);
    }

    if (variable) {
      result += util.format("%s = ", variable);
    }

    if (shouldReplaceVariables) {
      url = replaceCurlyBrackets(url);
    }

    result += util.format("http.request({\n");
    result += util.format("  url=\"%s\",\n", url);
    result += util.format("  method=\"%s\"", method);

    if (headers.length) {

      if (shouldReplaceVariables) {
        headers = replaceCurlyBrackets(headers.join(', '));
      }
      result += util.format(",\n  headers={ %s }", headers);
    }
    if (data) {
      result += util.format(",\n  data=\"%s\"", data);
    }
    result += util.format(",\n  response_body_bytes=%s", 200000);
    result += util.format("\n})\n");
    if (postRequest) {
      result += util.format("%s", postRequest);
    }
    if (sleepTime) {
      result += util.format("client.sleep(%s)\n", sleepTime);
    }
    result += util.format("\n");

    return result;

  },

  escapeContent: function(input) {
    if (input) {

      //copied from loadimpact-chrome-extension

      // " --> \" (escape doublequote)
      input = input.replace(/"/g, '\\\"');

      //  This replace fixes content which contains a doublequote string
      //  \"  - (first replace) -> \\" - (second replace to work in LUA) -> \\\"
      input = input.replace(/\\\\"/g, '\\\\\\\"');
      input = input.replace(/[\r\n]/g, "");
    }
    return input;

  }



}

function replaceCurlyBrackets(input) {

  return input.replace(/{{/g,"\"..").replace(/}}/g,"..\"");

}
