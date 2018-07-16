import oauth2 from 'simple-oauth2'

const client = oauth2.create({
  client: {
    id: process.env.AUTH_CLIENT_ID,
    secret: process.env.AUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST,
    tokenPath: process.env.TOKEN_PATH,
    authorizePath: process.env.AUTHORIZE_PATH,
  },
})

export default () => {
  return async (ctx, next) => {
    const code = ctx.query.code
    const options = {
      code,
      redirect_uri: process.env.REDIRECT_URI,
    }

    try {
      const result = await client.authorizationCode.getToken(options)
      const { token } = client.accessToken.create(result)
      ctx.cookies.set('access_token', token.access_token, {
        domain: process.domain,
        signed: false,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development' ? true : false,
      })
      ctx.redirect(process.env.APP_URL)
    } catch (e) {
      console.error(e)
    }
  }
}
