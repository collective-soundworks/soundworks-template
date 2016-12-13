# CHANGELOG

1.1.2
- updated sass files (removed `basic-controllers` overrides) (92299b48fc5807db798f8679af1e39c6bcabc8d8 and f0ba6980d48c32b6df52126cf0630c5cfe4ac3c8)
  + copy `sass/*` except `sass/_override.scss`

- updated `auth` template and content (commit e637fec2a681f89e1d9f41d71161b3e3aff7456c):
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
