# Ciri Callback

[![Greenkeeper badge](https://badges.greenkeeper.io/winfield/ciri-callback.svg)](https://greenkeeper.io/)

## Why a separated callback service

This service acts as the redirect uri of Ciri Auth service. After auth service redirect with authorization code to callback service, the callback service uses the authorization code to exchange an access token, then set the access token in cookie.

So why a separated callback service? That's because we want to the App be a pure SPA, to be easier for deployment(update the built files to CDN and it's done).

Currently, this service still doesn't support refresh token. To make refresh token work, we need to maintain a session between SPA and this service. we can make it work by store the session with access token and refresh token, but that's a TODO for now.
