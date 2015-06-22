#Plugin - ViewPhpErrorLog#

##About##
A Brackets IDE extension which watches a php log and outputs log entries to a brackets panel. The extension uses Node.js's Tail command to monitoring, see : git://github.com/lucagrulla/node-tail.git.

##Build Dependencies##
* **NPM**: Node and its NPM package manager are required, should already be installed as a prerequisite of Brackets.
* **Tail** A node module, installed using npm intall node, which uses node to monitor files. Version 0.40 installed for development and testing. Find on git hub here: git://github.com/lucagrulla/node-tail.git.

##Directory Structure##
- **Node**: This is the node.js directory. A package.json should be included listing dependencies. All node modules will and should be installed locally to the node_modules directory. This is brackets plugin convention.
- **Resources**: Zip files, tools and other files which are used to develop the project. Should not be checked in to Github without careful consideration.


###Node Debugging###
It isn't obvious how to debugging **Node** code inside Brackets to begin with. You can debug the standard javascript, like main.js, file (brackets client) using the F12 "show developer tools" standard brackets debug tool, which is fine, but it won't let you debug node modules like tail.js for this you'll need to:

- **Install Node-Inspector**:  This needs to be installed (globally?) in order to debug the tail.js module. Use npm install node-inspector -g.

- ** Start brackets and Enable Node Debugger** This will let brackets talk to the node inspector.

- ** Run node=inspector**: On the command line, inside the plugin's directory, type node-inspector. This will provide you with a local web url.

- ** Run Chromse** and browse to the web url. You should be able to set break points and debug node code.

One gotcha, brackets may start complaining about too many connections, if so find node.exe using the task manager and kill it.






