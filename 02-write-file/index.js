const fs = require('fs');
const path = require('path');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const {stdin, stdout, exit} = process;

stdout.write('Пожалуйста, введите текст\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') exit();
  stream.write(data.toString());
});

process.on('exit', () => stdout.write('Файл был создан\n'));
process.on('SIGINT', exit);
