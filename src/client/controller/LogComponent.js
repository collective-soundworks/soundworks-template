import { View } from 'soundworks/client';

const template = `
  <% logs.forEach(function(log) { %>
    <pre class="error"><%= log %></pre>
  <% }); %>
`;

class LogComponent {
  constructor(experience) {
    this.experience = experience;

    this.stackSize = 20;
    this.stack = [];
  }

  enter() {
    const $container = this.experience.view.$el.querySelector('#log');

    this.view = new View(template, { logs: this.stack });
    this.view.render();
    this.view.appendTo($container);
  }

  exit() {
    this.view.remove();
  }

  error(file, line, col, msg, userAgent) {
    // if (this.stack.length == this.stackSize)
    //   this.stack.shift();

    const logView = `
${userAgent}
${file}:${line}:${col}  ${msg}
    `;
    this.stack.unshift(logView);

    this.view.render();
  }
}

export default LogComponent;
