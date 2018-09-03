import Debug from 'debug'
import Koa from 'koa'

import callback from './callback'

const debug = Debug('auth:callback')
const app = new Koa()
const { PORT = 3000 } = process.env

app.proxy = app.env === 'development' ? false : true
app.keys = [process.env.SECRET]
app.use(callback())

app.listen(PORT)
debug(`Listening on PORT: ${PORT}`)
