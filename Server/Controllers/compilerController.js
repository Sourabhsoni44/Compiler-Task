const { compileSolidity, compileRust, compileMotoko } = require('../Compilers');
const { getExpectedOutputHash } = require('../Utils/hashUtils');
const { Question } = require('../models/questionModel');

const compileCode = async (req, res) => {
    const { language, code, difficulty } = req.body;
    let output, success = false;
  
    try {
      if (language === 'solidity') {
        output = await compileSolidity(code);
      } else if (language === 'rust') {
        output = await compileRust(code);
      } else if (language === 'motoko') {
        output = await compileMotoko(code);
      }
  
      const expectedHash = await getExpectedOutputHash(language, difficulty);
      if (hashOutput(output) === expectedHash) {
        success = true;
      }
    } catch (error) {
      output = error.message;
    }
  
    res.json({
      output,
      success,
      points: success ? pointsMap[difficulty] : 0
    });
  };

module.exports = {
    compileCode
};
