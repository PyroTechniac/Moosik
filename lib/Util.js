const zws = String.fromCharCode(8203);
class Util {
    constructor() {
        throw new Error(`The class ${this.constructor.name} cannot be initialized`);
    }
    static codeBlock(lang, expression) {
        return `\`\`\`${lang}\n${expression || zws}\`\`\``;
    }
}

module.exports = Util;