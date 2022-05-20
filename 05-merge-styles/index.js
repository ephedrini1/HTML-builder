const path = require('path');
const { readdir, readFile, writeFile } = require('fs').promises;

const pathTo = path.join(__dirname, 'project-dist', 'bundle.css');
const pathFrom = path.join(__dirname, 'styles');
let allStyles = [];

(async () => {
  const files = await readdir(pathFrom, { withFileTypes: true });
  for (let file of files) {
    const pathToFile = path.join(pathFrom, file.name);
    const fileType = path.extname(pathToFile);
    const content = await readFile(pathToFile, 'utf8');

    if (fileType === '.css') {
      allStyles.push(content);
    }
  }
  await writeFile(pathTo, allStyles.join('\n'), 'utf8');
})();
