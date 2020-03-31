module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
