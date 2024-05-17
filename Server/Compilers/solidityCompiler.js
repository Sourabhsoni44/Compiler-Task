const solc = require('solc');

const compileSolidity = async (code) => {
  const input = {
    language: 'Solidity',
    sources: { 'Contract.sol': { content: code } },
    settings: { outputSelection: { '*': { '*': ['*'] } } }
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  if (output.errors) throw new Error(output.errors.map(e => e.message).join('\n'));
  return output.contracts['Contract.sol'];
};

module.exports = { compileSolidity };
