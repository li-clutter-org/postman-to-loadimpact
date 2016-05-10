#postman-to-loadimpact

Converts Postman collections to Load Impact user scenarios. Given a Postman collection, the transformer will auto-generate a [LUA script](http://support.loadimpact.com/knowledgebase/topics/117699-user-scenario-scripting) to be imported as user scenario for your load tests.

The transformer converts Postman requests and [variables](http://blog.getpostman.com/2014/02/20/using-variables-inside-postman-and-collection-runner/)  into LUA requests and variables respectively.

Postman [pre-requests](https://www.getpostman.com/docs/pre_request_scripts) and [tests](https://www.getpostman.com/docs/writing_tests) are appended as comments before and after its respective LUA request. The pre-request and test behaviour could easily be replicated with the [Load Impact scripting API](https://loadimpact.com/load-script-api).

The Postman Collection Format v1 and v2 are supported.

## Installation

 - git clone git@github.com:loadimpact/postman-to-loadimpact.git
 - cd postman-to-loadimpact
 - npm install

## Usage

The transformer provides a Command line interface with different options.

    $ bin/postman-to-loadimpact examples/v1/postman/echo.json

All the options:

      Usage: postman-to-loadimpact <filePath> [options]
    
      Convert a Postman collection to Load Impact LUA user scenario
    
      Options:
    
        -h, --help                    output usage information
        -V, --version                 output the version number
        -j --input-version <version>  Input version. Options `1.0.0` or `2.0.0`. Default `1.0.0`.
        -o --output <path>            Target file path where the converted collection will be written. Default `console`

## TODOs

 - Auto variable definition. The scenario validation will fail until the variable is created.
 - npm package.




Please, use the [issue tracker](https://github.com/loadimpact/postman-to-loadimpact/issues) to open a discussion or bug report.


Happy load testing!
