const { Client, Collection } = require('discord.js');
const fs = require('fs-nextra');

class ExtendedClient extends Client {
    constructor(info) {
        super(info);

        this.commands = new Collection();
    }

    registerCommands() {
        fs.ensureDir('./commands').then(() => {
            fs.readdir('./commands').then(cmds => {
                cmds.filter(file => file.endsWith('.js')).forEach(cmd => {
                    const command = require(`./commands/${cmd}`);
                    this.commands.set(command.name, command);
                });
            });
        });
        return this;
    }

    registerStructures() {
        fs.ensureDir('./structures').then(() => {
            fs.readdir('./structures').then(structures => {
                structures.filter(file => file.endsWith('.js')).forEach(structure => {
                    require(`./structures/${structure}`);
                });
            });
        });
        return this;
    }
}

module.exports = ExtendedClient;