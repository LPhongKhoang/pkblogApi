const { expect } = require('chai');
const { validate } = require("../../../models/menu");

describe('Test validation function', () => {
  it('should be return error if name is a numercial value', () => {
    const menu = {
      name: 44,
      slug: "typescript1",
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if the name is less than 3', () => {
    const menu = {
      name: 'hi',
      slug: 'typescript1',
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if the name is longer than 30', () => {
    const menu = {
      name: 'longerthan300000000000000000000',
      slug: 'typescript1',
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if menu do not have name feild', () => {
    const menu = {
      slug: 'typescript1',
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if slug is a numercial value', () => {
    const menu = {
      name: 'Nestjs',
      slug: 1,
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if slug is less than 5', () => {
    const menu = {
      name: 'Typescript',
      slug: 'less',
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if slug is longer than 50', () => {
    const menu = {
      name: 'longerthan50000000000000000000000000000000000000000',
      slug: 'typescript1',
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if menu do not have slug feild', () => {
    const menu = {
      name: 'Typescript',
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if order is a string value', () => {
    const menu = {
      name: 'Nestjs',
      slug: 'nestjs1',
      order: 'String'
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if order is less than 1', () => {
    const menu = {
      name: 'Typescript',
      slug: 'typescript1',
      order: 0
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if order is longer than 10', () => {
    const menu = {
      name: 'Typescript',
      slug: 'typescript1',
      order: 11
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });

  it('should be return error if menu do not have order feild', () => {
    const menu = {
      name: 'Typescript',
      slug: 'typescript1'
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });
});