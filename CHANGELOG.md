# CHANGELOG

1.1.2
- updated `auth` template and content:
  + `client/shared/viewContent.js`
  + `client/shared/viewTemplates.js`

- renamed `config.socketIO` to `config.websockets`, impacted files:
  + `server/config/*.js`
  + `server/index.js`
  + `client/*/index.js`

- moved transpiled files to dist and server index declaration in runner 
  (see commit c5356fda5a3be617262db8a3df30b798d94577b8)
- updated `watch` to 1.0.1
- removed `ora` 
- fixed issues with build script
