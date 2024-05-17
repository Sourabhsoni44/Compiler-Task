const express = require('express');
const bodyParser = require('body-parser');
const { compileSolidity } = require('./Compilers/solidityCompiler');
const { compileRust } = require('./Compilers/rustCompiler');
const { compileMotoko } = require('./Compilers/motokoCompiler');
const { hashOutput, getExpectedOutputHash } = require('./Utils/hashUtils');
const { questionsCollection, usersCollection } = require('./Database/database');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const pointsMap = { easy: 1, medium: 2, hard: 3 };

app.post('/api/compile', async (req, res) => {
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

    const expectedHash = await getExpectedOutputHash(language, difficulty, questionsCollection);
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
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
