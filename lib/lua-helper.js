var util = require('util');

module.exports = {

  buildLuaRequest: function(options) {

    var url = options.url,
        method = options.method,
        headers = options.headers,
        data = options.data,
        preRequest = options.preRequest,
        postRequest = options.postRequest,
        sleepTime = options.sleepTime,
        variable = options.variable,
        variables = [],
        tmpVariables,
        result = '';

    if (preRequest) {
      result += util.format("%s", preRequest);
    }

    if (variable) {
      result += util.format("%s = ", variable);
    }

    tmpVariables = getVariables(url);
    if (tmpVariables) {
      variables = variables.concat(tmpVariables);
    }
    url = replaceCurlyBrackets(url);

    result += util.format("http.request({\n");
    result += util.format("  url=\"%s\",\n", url);
    result += util.format("  method=\"%s\"", method);

    if (headers.length) {

      headers = headers.join(', ');

      tmpVariables = getVariables(headers);
      if (tmpVariables) {
        variables = variables.concat(tmpVariables);
      }
      headers = replaceCurlyBrackets(headers);
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

    return {
      result: result,
      variables: variables
    };

  },

  escapeContent: function(input) {
    if (input) {

      //copied from loadimpact-chrome-extension

      // " --> \" (escape doublequote)
      input = input.replace(/"/g, '\\\"');

      //  This replace fixes content which contains a doublequote string
      //  \"  - (first replace) -> \\" - (second replace to work in Lua) -> \\\"
      input = input.replace(/\\\\"/g, '\\\\\\\"');
      input = input.replace(/[\r\n]/g, "");
    }
    return input;

  }



};

function getVariables(input) {


  if (input) {
    var matches = input.match(/{{(.*?)}}/g);
    if (matches) {
      return matches.map(function(item) {
        return item.replace(/{{/g,"").replace(/}}/g,"");
      });
    }
  }

}

function replaceCurlyBrackets(input) {

  return input.replace(/{{/g,"\"..").replace(/}}/g,"..\"");

}
