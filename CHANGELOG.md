# CHANGELOG

2.0.0
- moved services' views from soundworks to template

Migating From 1.1.1 to 2.0.0

- copy `bin` directory
  + transpiled files are now transpiled into `dist/client` and `dist/server` directories
  + the existing `client` and `server` can be safely deleted
- copy `.babelrc` file
- update `dependencies` and `devDependencies` in `package.json`
- copy `src/client/shared` directory
- update `src/client/**/index.js`

```
- import viewTemplates from '../shared/viewTemplates';
- import viewContent from '../shared/viewContent';
+ import serviceViews from '../shared/serviceViews';

...

- const config  = window.soundworksConfig;
+ const config = Object.assign({ 
+   appContainer: '#container' 
+ }, window.soundworksConfig);
soundworks.client.init(config.clientType, config);

... 

- soundworks.client.setViewContentDefinitions(viewContent);
- soundworks.client.setViewTemplateDefinitions(viewTemplates);
+ soundworks.client.setServiceInstanciationHook((id, instance) => {
+   if (serviceViews.has(id))
+     instance.view = serviceViews.get(id, config);
+ });
```


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
