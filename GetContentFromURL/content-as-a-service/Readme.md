# Website content as a Service

A simple web service to fetch website content powered by [Express](http://expressjs.com) and [Hget](https://github.com/bevacqua/hget).

## Setup

```
$ npm install
```

Run the app:

```
$ node app
Express server listening on port 6000
```

## Usage

For a quick test with the command line, type:

```sh
$ curl http://localhost:6000/?url=www.google.com > google.txt
```

Here is the complete usage documentation, also accessible on `/usage.html`:

```
# Get website content
GET /?url=www.google.com
# Return content of the www.google.com homepage

```

## Configuration

Create a `config/development.yaml` or a `config/production.yaml` to override any of the settings found in the `config/default.yaml`:

```yml
content:
  command: hget        # hget cli tool [not in use]
  path: '/tmp/'        # where content files are stored [to-do]
cache:
  lifetime: 60000      # one minute, set to 0 for no cache
server:
  port: 6000           # main service port
```

## TODO

* Allow to cache content in files

## License

(The MIT License)

Copyright (c) 2016 Nelson Neves

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
