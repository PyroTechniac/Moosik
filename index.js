const ExtendedClient = require('./lib/Client');


const cli = new ExtendedClient({ disableEveryone: true });
cli.registerCommands().registerStructures();
console.log(cli);