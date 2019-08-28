import { html, render } from 'lit-html';
import platformView from '@soundworks/service-platform/src/view';
import syncView from '@soundworks/service-sync/src/view';
// import other services views here...


function switchServices(serviceManager, globals) {
  const statuses = serviceManager.getValues(); // serviceManager.getStatus()

  const idleView = html`
    <section>
      <div class="flex-middle" style="height: 30vh">
        <h1>${globals.appName ? globals.appName : ''}</h1>
      </div>
      <div class="flex-center" style="height: 50vh">loading, please wait...</div>
      <div class="flex-middle" style="height: 20vh"></div>
    </section>
  `;

  if (statuses.platform && statuses.platform === 'started') {
    return platformView(html, serviceManager.get('platform'), globals);
  } else if (statuses.sync && statuses.sync === 'started') {
    // ???
    return syncView(html, serviceManager.get('sync'), globals);
  } else {
    return idleView; // default to idle view
  }
}

function createInitViews(serviceManager, globals = {}, $container = document.body) {
  // observe `serviceManager` state, the manager triggers an event each time a
  // service that is between the start and ready state updates its internal state
  const unsubscribe = serviceManager.observe(() => {
    render(switchServices(serviceManager, globals), $container);
  });
  // stop listening when ready
  serviceManager.ready.then(() => unsubscribe());
  // init
  // console.log('init', switchServices(serviceManager, globals));
  render(switchServices(serviceManager, globals), $container);
}

export default createInitViews;
