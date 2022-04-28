/* eslint-disable global-require */

const {
  describe, expect, test,
} = global;

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

describe('Unit tests for fs.js', () => {
  afterEach(() => {
    consoleErrorSpy.mockClear();
    consoleLogSpy.mockClear();
  });

  test('readFile valid', async () => {
    // Given
    // dependence
    // mock
    const fs = require('fs');
    jest.mock('fs');
    const expected = 'I read that file';
    fs.readFileSync.mockReturnValue(expected);

    // When
    // test
    const { readFile } = require('./fs');
    const fileContent = readFile('filename.txt');

    // Then
    // assertions
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(fileContent).toBe(expected);
  });

  test('readFile exception', async () => {
    // Given
    const fs = require('fs');
    jest.mock('fs');
    const error = new Error('a very specific error');
    fs.readFileSync.mockImplementation(() => {
      throw error;
    });

    // When
    const { readFile } = require('./fs');
    const fileContent = readFile('filename.txt');

    // Then
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith(error);
    expect(fileContent).toBe('');
  });

  test('writeFile valid', async () => {
    // Given
    const fs = require('fs');
    jest.mock('fs');
    fs.writeFileSync.mockImplementation();

    // When
    const { writeFile } = require('./fs');
    writeFile('./dist/test.txt', 'I should never be written');

    // Then
    expect(fs.writeFileSync).toBeCalledTimes(1);
  });

  test('writeFile exception', async () => {
    // Given
    const fs = require('fs');
    jest.mock('fs');
    const error = new Error('a very specific error');
    fs.writeFileSync.mockImplementation(() => {
      throw error;
    });

    // When
    const { writeFile } = require('./fs');
    writeFile('./dist/test.txt', 'I ll crash anyway');

    // Then
    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toHaveBeenLastCalledWith(error);
  });

  test('createDir folder doesn\'t exist', async () => {
    // Given
    const fs = require('fs');
    jest.mock('fs');
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation();

    // When
    const { createDir } = require('./fs');
    createDir('./dist');

    // Then
    expect(fs.existsSync).toBeCalledTimes(1);
    expect(fs.mkdirSync).toBeCalledTimes(1);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('Creating directory : ./dist');
  });

  test('createDir folder exist', async () => {
    // Given
    const fs = require('fs');
    jest.mock('fs');
    fs.existsSync.mockClear();
    fs.existsSync.mockReturnValue(true);

    // When
    const { createDir } = require('./fs');
    createDir('./dist');

    // Then
    expect(fs.existsSync).toBeCalledTimes(1);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toHaveBeenLastCalledWith('Directory ./dist already exist, skipping');
  });

  test('createDir Integration tests', async () => {
    // Given
    const fs = require('fs');
    const { createDir } = require('./fs');
    const fsSpy = jest.spyOn(fs, 'existsSync');

    // When
    createDir('./dist-fs-int');

    // Then
    expect(console.log).toBeCalledTimes(1);
    expect(fs.existsSync('./dist-fs-int')).toBe(true);
    expect(console.log).toHaveBeenLastCalledWith('Directory ./dist-fs-int already exist, skipping');

    fsSpy.mockClear();
  });

  const data = [
    {
      type: 'equilateral',
      sides: [1, 1, 1],
    },
    {
      type: 'isosceles',
      sides: [1, 1, 2],
    },
    {
      type: 'scalene',
      sides: [1, 2, 3],
    },
  ];

  describe.each(data)('A triangle', (triangle) => {
    it(`whose sides are ${triangle.sides} should be ${triangle.type}`, () => {
      console.log(triangle.sides);
      const { type } = triangle;

      expect(type).toBe(triangle.type);
    });
  });
});
