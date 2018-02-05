# CHANGELOG

## Migating From 1.1.1 to 2.0.0

- copy `.babelrc` file
- copy `bin` directory
  + transpiled files are now transpiled into `dist/client` and `dist/server` directories
  + the existing `client` and `server` directories can be safely deleted
- copy `sass` directory
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

- update `src/server/index.js`

```
+ import path from 'path';
- import defaultConfig from './config/default';
+ const configName = process.env.ENV || 'default';
+ const configPath = path.join(__dirname, 'config', configName);
let config = null;

- switch(process.env.ENV) {
-   default:
-     config = defaultConfig;
-     break;
- }

// rely on node `require` for synchronicity
+ try {
+   config = require(configPath).default;
+ } catch(err) {
+   console.error(`Invalid ENV "${configName}", file "${configPath}.js" not found`);
+   process.exit(1);
+ }

// configure express environment ('production' enables cache systems)
process.env.NODE_ENV = config.env;
// initialize application with configuration options
soundworks.server.init(config);

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition((clientType, config, httpRequest) => {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
-    socketIO: config.socketIO,
+    websockets: config.websockets,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain,
  };
});

```

- `soundworks.Renderer` renamed to `soundworks.Canvas2dRenderer`
- `soundworks.Experience.createView` removed, views must be created manually 
- `view.content` renamed to `view.model`
- `Activity.removeListener` (for sockets messages) renamed to `Activity.stopReceiving`
- view priority is now an option of the Activity (i.e. `this.options.viewPriority = 7`)
- initialization order between `Services` and `Experiences` has been introduced server-side, every service must now call `this.ready()` when fully initialized. 

- `Signal` and `SignalAll` moved from `soundworks/client` to `soundworks/utils`

## 1.1.2

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
