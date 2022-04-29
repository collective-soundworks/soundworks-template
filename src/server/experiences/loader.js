import camelcase from 'camelcase';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// the goal of this file is to be able to create new clients programmatically
// without impacting existing user code
export default {
  _experiences: new Map(),

  /**
   * dynamically instanciate and all client experiences declared in `config/application.json`
   * @param {Object} config - application config
   * @param {Object} [context={}] - user defined object to be passed the experiences
   */
  async init(server, config, context = {}) {
    for (let clientType in config.app.clients) {
      // console.log(clientType);
      const className = camelcase(`${clientType}Experience`, { pascalCase: true });

      if (!fs.existsSync(path.join(__dirname, `${className}.js`))) {
        throw new Error(`[soundworks] client "${clientType}" declared in application config file but Experience file ("src/server/experiences/${className}.js") not found`);
      }

      const module = await import(`./${className}.js`);
      // allow default export and named export
      const ctor = module.default ? module.default : module[className];

      const experience = new ctor(server, clientType, context);
      this._experiences.set(clientType, experience);
    }
  },

  /**
   * start all instanciated experiences
   */
  async start() {
    this._experiences.forEach(async experience => await experience.start());
  },

  /**
   * return an experience associated to the client type
   */
  get(clientType) {
    return this._experiences.get(clientType);
  },
};
