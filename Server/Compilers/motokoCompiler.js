const util = require('util');
const exec = util.promisify(require('child_process').exec);

const compileMotoko = async (code) => {
    try {
        // Write the Motoko code to a temporary file
        const fs = require('fs');
        const tmpFile = 'temp.mo';
        fs.writeFileSync(tmpFile, code);

        // Compile the Motoko code using motoko compiler
        const { stdout, stderr } = await exec(`motoko ${tmpFile}`);
        if (stderr) {
            throw new Error(stderr);
        }

        // Return the compiled Motoko output
        return stdout;
    } catch (error) {
        throw new Error(`Motoko compilation error: ${error.message}`);
    }
};

module.exports = { compileMotoko };
