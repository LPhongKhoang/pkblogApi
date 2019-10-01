require("../../../models/menu");
const { validate } = require("../../../models/topic");

describe("Test validate function", () => {
  it("Should be tested for menus id", () => {
    const topic = {
      name: "nodejs",
      menus: ["5d93228067a85d405092d89c", "5d93228067a85d405092d89c"],
      count: 3
    };

    const {error} = validate(topic);
    expect(error).toBeUndefined();
  });

  it("Should be pass if count is missed", () => {
    const topic = {
      name: "nodejs",
      menus: ["5d93228067a85d405092d89c"]
    };

    const {error} = validate(topic);
    expect(error).toBeUndefined();
  })

  it("Should reuturn error if count is nagative", () => {
    const topic = {
      name: "nodejs",
      menus: ["5d93228067a85d405092d89c"],
      count: -1
    };

    const {error} = validate(topic);
    expect(error).toBeDefined();
  })
})