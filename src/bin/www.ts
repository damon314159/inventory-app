#!/usr/bin/env node

import http from 'node:http'
import Debug from 'debug'
import app from '../app.js'
import type { HttpError } from 'http-errors'
import type { AddressInfo } from 'node:net'

// Mock Debug with an empty function whenever mode is not development
const debug =
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  process.env.NODE_ENV === 'development' ? Debug('app:server') : (): void => {}

// Normalize a port into a number, string, or false.
function normalizePort(val: string): number | string | false {
  const port: number = parseInt(val, 10)

  if (Number.isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  // Else
  return false
}

// Get port from environment and store in Express.
const port: number | string | false = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// Create HTTP server.
const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app)

// Event listener for HTTP server "error" event.
function onError(error: HttpError): never {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind: string =
    typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

// Event listener for HTTP server "listening" event.
function onListening(): void {
  const addr: string | AddressInfo | null = server.address()
  if (addr === null) {
    debug('No address found')
    return
  }
  const bind: string =
    typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

// Listen on provided port, on all network interfaces.
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
