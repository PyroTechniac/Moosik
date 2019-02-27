const { Structures } = require('discord.js');
const MusicManager = require('../lib/MusicManager');

module.exports = Structures.extend('Guild', Guild => {
    class MusicGuild extends Guild {
        constructor(...args) {
            super(...args);
            this.music = new MusicManager(this);
        }
    }
    return MusicGuild;
});