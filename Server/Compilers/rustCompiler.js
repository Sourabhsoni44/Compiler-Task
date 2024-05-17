const util = require('util');
const exec = util.promisify(require('child_process').exec);

const compileRust = async (code) => {
    try {
        // Write the Rust code to a temporary file
        const fs = require('fs');
        const tmpFile = 'temp.rs';
        fs.writeFileSync(tmpFile, code);

        // Compile the Rust code using rustc
        const { stdout, stderr } = await exec(`rustc ${tmpFile}`);
        if (stderr) {
            throw new Error(stderr);
        }

        // Read the compiled binary file
        const compiledOutput = fs.readFileSync('./temp');
        return compiledOutput.toString();
    } catch (error) {
        throw new Error(`Rust compilation error: ${error.message}`);
    }
};

module.exports = { compileRust };
