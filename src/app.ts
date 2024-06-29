import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import cookieParser from 'cookie-parser'
import express, {
  type Application,
  type RequestHandler,
  type ErrorRequestHandler,
} from 'express'
import 'express-async-handler'
import helmet from 'helmet'
import createError from 'http-errors'
import logger from 'morgan'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const app: Application = express()

// Replace CommonJS __dirname with an ESM alternative
// eslint-disable-next-line no-underscore-dangle
const __dirname: string = dirname(fileURLToPath(import.meta.url))

// Initialise helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      // Define as strict CSP rules as possible where the defaults are relaxed
      useDefaults: true,
      directives: {
        'img-src': ["'self'"],
        'style-src': ["'self'"],
        'style-src-elem': ["'self'"],
        'font-src': ["'self'"],
        ...(process.env.LOCALHOST === 'true'
          ? // Stop webkit/safari asking for https assets on an http localhost
            { upgradeInsecureRequests: null }
          : // Otherwise, don't set the option
            {}),
      },
    },
  })
)

// View engine setup
app.set('view engine', 'ejs')
app.set('views', resolve(__dirname, 'views'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// Configure express to search for assets in public
app.use(express.static(resolve(__dirname, 'public')))

// Routes
app.use('/', indexRouter)
app.use('/users', usersRouter)

// Catch 404 and forward to error handler
const handle404: RequestHandler = (_req, _res, next): void => {
  next(createError(404))
}
app.use(handle404)

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleError: ErrorRequestHandler = (err, _req, res, _next): void => {
  // Set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error')
}
app.use(handleError)

export default app
