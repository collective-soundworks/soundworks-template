# Soundworks Template

In this folder, you will find a template to build a scenario on Soundworks. The template implements the following very simple scenario: when a client connects to the server, it gets an index (*i.e.* a number we can refer to later on that corresponds to that client), and plays a sound.

The full documentation of Soundworks lies in the [*Soundworks* GitHub repository](https://github.com/collective-soundworks/soundworks). However, let's explain in short how this works.

## Project structure

The project structure is similar to an Express app. Please refer to [*How to write a scenario*](https://github.com/collective-soundworks/soundworks#how-to-write-a-scenario) in the documentation for more details.

## Architecture

A scenario based on *Soundworks* is made of a succession and combination of modules. Please refer to [*How to write a module*](https://github.com/collective-soundworks/soundworks#how-to-write-a-module) in the documentation for more details.

### Client side

Here are the important things to do on the client side.

- Initialize the client in the chosen namespace. Here, we are writing a file for a client that actually takes part in the performance (we refer to it as a `player`), so we use the namespace `'/player'` in the initialization: `client.init('/player');`.
- Create a module for the performance. This is the `class MyPerformance extends clientSide.Module { ... }` part.
- Initialize all the modules we'll need. Here, the `welcome`, `checkin`, `loader` and `performance modules.
- Start the scenario and link the modules. This is what happens in the `client.start(...)` method.

### Server side

Here are the important things to do on the server side.

- Create a module for the performance. This is the `class MyPerformance extends serverSide.Module { ... }` part.
- Initialize all the modules that serve the client. Here, the `checkin` and `performance` modules.
- Start the server and map the modules to the namespaces that require them. That is the `server.start(app)` and the `server.map(...)` part.

## Unleash your creativity!

With this template, you have a basis on which you can build any *Soundworks*-based scenario, and we can't wait to see what you come up with. You might find these resources helpful:

- [*Soundworks* documentation](https://github.com/collective-soundworks/soundworks)
- A few other scenario examples:
  - [*Drops*](https://github.com/collective-soundworks/soundworks-drops)
  - [*Paths*](https://github.com/collective-soundworks/soundworks-paths)
  - [*Wandering Sound*](https://github.com/collective-soundworks/soundworks-wanderingsound)
