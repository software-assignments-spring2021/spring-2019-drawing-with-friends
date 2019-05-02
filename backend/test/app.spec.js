import { describe } from 'mocha'
import { expect } from 'chai'
let app = require('../src/app')
let io = require('socket.io-client')

let socketURL = 'http://0.0.0.0:3000'

let options = {
  transports: ['websocket'],
  'force new connection': true,
  'reopen delay': 0,
  'reconnection delay': 0
}

describe('Backend suite of unit tests', function() {
  let socket;
  let socket2;

  beforeEach(function(done) {
    socket = io.connect(socketURL, options)
    socket.on('connect', function() {
      //console.log('socket connection initialized')
      done()
    })
    socket.on('disconnect', function() {
      //console.log('socket connection terminated')
    })
  })

  afterEach(function(done) {
    if(socket.connected) {
      socket.disconnect()
    }
    done()
  })

  describe('app.js', function () {
    it('creates a socket io server', function (done) {
      expect(socket).to.not.be.null
      done()
    })
  
    it('creates a room', function(done) {
      socket.emit('create-room', 'TEST')
      socket.on('confirm-valid-room-code', function() {
        done()
      })
    })

    it('joins a room', function(done) {
      socket.emit('create-room', 'TEST')
      socket2 = io.connect(socketURL, options)
      socket2.emit('join-room', 'TEST')
      socket2.on('confirm-valid-room-code', function() {
        done()
      })
    })
  })
})