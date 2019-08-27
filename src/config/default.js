import path from 'path';
const cwd = process.cwd();

// @todo - move to JSON file

// configuration of the application
export default {
  // name of the environnement (development | production)
  env: 'development',

  // ip of the server, mandatory for `things` clients
  ip: '127.0.0.1',
  // ip: '192.168.2.1',
  // ip: '10.0.0.1',

  // port used to open the http server, in production this value is typically 80
  port: 8000,

  // define if the HTTP server should be launched using secure connections.
  // For development purposes when set to `true` and no certificates are given
  // (cf. `httpsInfos`), a self-signed certificate is created.
  useHttps: false,

  // paths to the key and certificate to be used in order to launch the https
  // server. Both entries are required otherwise a self-signed certificate
  // is generated.
  httpsInfos: {
    key: null,
    cert: null,
  },

  // websockets configuration
  websockets: {
    path: 'socket',
    url: '',
    pingInterval: 5000
  },

  // @todo - remove that... of course we want gzip compression
  // define if the server should use gzip compression for static files
  enableGZipCompression: true,

  // --------------------------------------------------------
  // @todo - move to `application.json`
  // --------------------------------------------------------
  // name of the default client type, i.e. the client that can access the
  // application at its root URL
  defaultClient: 'controller',

  // --------------------------------------------------------
  // @todo - remove that, go in index.js `setPublicDirectory`
  // --------------------------------------------------------
  // location of the public directory (accessible through http(s) requests)
  publicDirectory: path.join(cwd, 'public'),

  // --------------------------------------------------------
  // @todo - remove that, go in index.js `setHtmlTemplateDirectory`
  // --------------------------------------------------------
  // directory where the server templating system looks for the `ejs` templates
  templateDirectory: path.join(cwd, 'src', 'server', 'tmpl'),
}
