const { Client, Collection } = require('discord.js');
const fs = require('fs-nextra');

class ExtendedClient extends Client {
    constructor(info) {
        super(info);

        this.commands = new Collection();

        this.structures = new Collection();
    }

    async login(token) {
        await this
            .registerCommands()
            .registerStructures();
        return super.login(token);
    }

    registerCommands() {
        fs.ensureDir('./commands').then(() => {
            fs.readdir('./commands').then(cmds => {
                cmds.filter(file => file.endsWith('.js')).map(name => name.slice(0, -3)).forEach(cmd => {
                    const command = require(`./commands/${cmd}`);
                    this.emit('log', `Loaded command ${command.name}`);
                    this.commands.set(command.name, command);
                });
            });
        });
        this.emit('commandsRegistered', this.commands);
        return this;
    }

    registerStructures() {
        fs.ensureDir('./structures').then(() => {
            fs.readdir('./structures').then(structures => {
                structures.filter(file => file.endsWith('.js')).forEach(name => name.slice(0, -3)).forEach(structure => {
                    const struct = require(`./structures/${structure}`);
                    this.structures.set(struct.constructor.name, struct);
                });
            });
        });
        return this;
    }
}

module.exports = ExtendedClient;