const server = require('node-static')
const port = process.env.PORT || 3000

const folder = new server.Server('./dist')

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    folder.serve(request, response)
  }).resume()
}).listen(port)
