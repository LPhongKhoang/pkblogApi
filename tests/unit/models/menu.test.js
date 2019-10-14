const { expect } = require('chai');
const { validate } = require("../../../models/menu");

describe("Test validation function", () => {
  it("should be return error if name is a numercial value", () => {
    const menu = {
      name: 44,
      slug: "typescript1",
      order: 4
    };

    const { error } = validate(menu);
    expect(error).to.not.be.undefined;
  });
});