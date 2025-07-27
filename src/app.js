'use strict';

const fs = require('fs');
const path = require('path');

function copyFile() {
  const [currentLocation, locationToCopy] = process.argv.slice(2);

  const resolvedSource = path.dirname(path.resolve(currentLocation));
  const resolvedDestination = path.resolve(locationToCopy);

  if (!fs.existsSync(locationToCopy)) {
    console.error('Destination path does not exist!');
  }

  if (!fs.lstatSync(locationToCopy).isDirectory()) {
    console.error('Destination path is not a directory');
  }

  if (resolvedSource === resolvedDestination) {
    console.error('You wrote the same source as destination');
  }

  const content = fs.readFileSync(currentLocation, 'utf-8');
  const fileName = path.basename(currentLocation);

  fs.writeFileSync(path.join(locationToCopy, fileName), content);
}

copyFile();

module.exports = { copyFile };
