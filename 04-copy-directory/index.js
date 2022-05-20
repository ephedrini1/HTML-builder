const { readdir, copyFile, mkdir } = require('fs').promises;
const path = require('path');
const { stdout } = process;

const pathFrom = path.join(__dirname, 'files');
const pathTo = path.join(__dirname, 'files-copy');

async function copyDir(from, to) {
  try {
    const files = await readdir(from, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        await copyFile(path.join(from, file.name), path.join(to, file.name));
      } else if (file.isDirectory()) {
        await mkdir(path.join(to, file.name));
        await copyDir(path.join(from, file.name), path.join(to, file.name));
      }
    }
  } catch (error) {
    stdout.write(error.message);
  }
}

(async function () {
  await mkdir(pathTo, { recursive: true });
  await copyDir(pathFrom, pathTo);
})();