const crypto = require('crypto');

const hashOutput = (output) => {
  return crypto.createHash('sha256').update(output).digest('hex');
};

const getExpectedOutputHash = async (language, difficulty, questionsCollection) => {
  const question = await questionsCollection.findOne({ language, difficulty });
  return question ? question.expectedOutputHash : null;
};

module.exports = { hashOutput, getExpectedOutputHash };
