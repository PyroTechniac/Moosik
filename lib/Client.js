const { Client, Collection } = require('discord.js');
const fs = require('fs-nextra');
const path = require('path');
class ExtendedClient extends Client {
    constructor(info) {
        super(info);

        this.commands = new Collection();

        this.baseDirectory = path.dirname(require.main.filename);

        this.events = new Collection();

        this.prefix = info.prefix || 'm!';
    }

    registerCommands() {
        fs.ensureDir(path.join(this.baseDirectory, 'commands')).then(() => {
            fs.readdir(path.join(this.baseDirectory, 'commands')).then(cmds => {
                cmds.filter(file => file.endsWith('.js')).map(name => name.slice(0, -3)).forEach(cmd => {
                    const command = require(path.join(this.baseDirectory, 'commands', cmd));
                    this.emit('debug', `Loaded command ${command.name}`);
                    this.commands.set(command.name, command);
                });
            });
        });
        console.log('Commands Loaded');
        return this;
    }

    registerEvents() {
        fs.ensureDir(path.join(this.baseDirectory, 'events')).then(() => {
            fs.readdir(path.join(this.baseDirectory, 'events')).then(events => {
                events.filter(file => file.endsWith('.js')).map(name => name.slice(0, -3)).forEach(eve => {
                    const event = require(path.join(this.baseDirectory, 'events', eve));
                    this.on(event.name, event.exec);
                });
            });
        });
        console.log('Events Loaded');
        return this;
    }

    registerStructures() {
        fs.ensureDir('./structures').then(() => {
            fs.readdir('./structures').then(structures => {
                structures.filter(file => file.endsWith('.js')).map(name => name.slice(0, -3)).forEach(structure => {
                    require(path.join(process.cwd(), 'structures', structure));
                });
            });
        });
        console.log('Structures Loaded');
        return this;
    }
}

module.exports = ExtendedClient;