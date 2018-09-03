/*
 * NodeJS Master Class
 * Homework Assignment #1
 *
 * C. Daniel Chase <dan@cdchase.com>
 *
 */
/* eslint-disable standard/no-callback-literal */

const http = require('http')
const url = require('url')
const config = require('./config')

const httpServer = http.createServer(function (req, res) {
  server(req, res)
})

httpServer.listen(config.port, function () {
  console.log('The server is listening on port %i', config.port)
})

const server = function (req, res) {
  const parsedURL = url.parse(req.url, true)

  const path = parsedURL.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

  const data = {
    'trimmedPath': trimmedPath
  }

  // Route the request to the handler specified in the router
  chosenHandler(data, function (statusCode, payload) {
    statusCode = typeof (statusCode) === 'number' ? statusCode : 200

    payload = typeof (payload) === 'object' ? payload : {}

    const payloadString = JSON.stringify(payload)

    res.setHeader('Content-Type', 'application/json')
    res.writeHead(statusCode)
    res.end(payloadString)

    console.log('Returning this response: ', statusCode, payloadString)
  })
}

const handlers = {}

handlers.hello = function (data, callback) {
  const responseHello = { response: 'Welcome to Dan\'s API!' }
  callback(200, responseHello)
}

handlers.notFound = function (data, callback) {
  callback(404, { response: 'Not found' })
}

const router = {
  'hello': handlers.hello
}
