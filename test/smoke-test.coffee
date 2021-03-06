should = require('chai').should();
get = require('./helper-get');
post = require('./helper-post');

describe 'Server:', ->
  
  it 'GET /info - returns info about the running server instance', (done) ->
    get '/info', (response, body) ->
      response.statusCode.should.equal(200)
      body.should.have.property('name').equals('hackday-node-server')
      body.should.have.property('version')
      done()

  it 'POST /testpayload - pulls out body text', (done) ->
    post '/testpayload', "This is a test", (response, body) ->
      response.statusCode.should.equal(200)
      response.body.should.equal("This is a test")
      done()

  it 'POST /reverse - returns a reversed version of the body text', (done) ->
    post '/reverse', "Hello", (response, body) ->
      response.statusCode.should.equal(200)
      response.body.should.equal('olleH')
      done()

  it 'POST /uppercase - returns an uppercase version of the body text', (done) ->
    post '/uppercase', "Hello", (response, body) ->
      response.statusCode.should.equal(200)
      response.body.should.equal('HELLO')
      done()

