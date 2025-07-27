'use strict';

const fs = require('fs');
const path = require('path');

function copyFile() {
  const [currentLocation, locationToCopy] = process.argv.slice(2);

  if (currentLocation === undefined || locationToCopy === undefined) {
    console.error('Not enough parameters');

    return;
  }

  const resolvedSource = path.resolve(currentLocation);
  const resolvedDestination = path.resolve(locationToCopy);

  if (resolvedSource === resolvedDestination) {
    console.error('You wrote the same source as destination');

    return;
  }

  if (!fs.existsSync(currentLocation)) {
    console.error('No such file to copy');

    return;
  }

  if (
    fs.existsSync(currentLocation) &&
    fs.statSync(currentLocation).isDirectory()
  ) {
    console.error('Source is a directory');

    return;
  }

  if (
    fs.existsSync(locationToCopy) &&
    fs.statSync(locationToCopy).isDirectory()
  ) {
    console.error('Destination is a directory');

    return;
  }

  const content = fs.readFileSync(currentLocation, 'utf-8');

  fs.writeFileSync(locationToCopy, content);
}

copyFile();

module.exports = { copyFile };
