const chai = require('chai');
const expect = chai.expect;

let testString = 'pass';
let testPass = 'pass';

// simple assert test to test jest + chai
it('test pass', () => {
    expect(testPass).to.equal(testString);
});
