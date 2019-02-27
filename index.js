require('dotenv').config();
const ExtendedClient = require('./lib/Client');

new ExtendedClient({ disableEveryone: true })
    .registerCommands()
    .registerStructures()
    .registerEvents()
    .login(process.env.TOKEN);