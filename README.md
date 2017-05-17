#postman-to-loadimpact

Converts Postman collections to Load Impact user scenarios. Given a Postman collection, the transformer will auto-generate a [Lua script](http://support.loadimpact.com/knowledgebase/topics/117699-user-scenario-scripting) to be imported as user scenario for your load tests.

The transformer converts Postman requests and [variables](http://blog.getpostman.com/2014/02/20/using-variables-inside-postman-and-collection-runner/)  into Lua requests and variables respectively.

Postman [pre-requests](https://www.getpostman.com/docs/pre_request_scripts) and [tests](https://www.getpostman.com/docs/writing_tests) are appended as comments before and after its respective Lua request. The pre-request and test behaviour could easily be replicated with the [Load Impact scripting API](https://loadimpact.com/load-script-api).

The Postman Collection Format v1 and v2 are supported.

## Installation and usage

As npm global package:
 - npm install -g postman-to-loadimpact
 - postman-to-loadimpact path/file.json

As local repository:
 - git clone git@github.com:loadimpact/postman-to-loadimpact.git
 - cd postman-to-loadimpact
 - npm install
 - bin/postman-to-loadimpact.js examples/postman/v1/echo.json

## Options

The transformer provides a command line interface with different options.

      Usage: postman-to-loadimpact <filePath> [options]
    
      Convert a Postman collection to Load Impact Lua user scenario
    
      Options:
    
        -h, --help                    output usage information
        -V, --version                 output the version number
        -j --input-version <version>  Input version. Options `2.0.0` or `1.0.0`. Default `2.0.0`.
        -o --output <path>            Target file path where the converted collection will be written. Default `console`

## Examples

A collection of Postman examples are located under `./examples/postman`.

The user scenario will be auto-generated when running:

    $ postman-to-loadimpact examples/postman/v2/echo.json

    $ postman-to-loadimpact examples/postman/v1/echo.json -j 1.0.0


Please, use the [issue tracker](https://github.com/loadimpact/postman-to-loadimpact/issues) to open a discussion or bug report.


Happy load testing!
