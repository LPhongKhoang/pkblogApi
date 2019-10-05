const regexEqualIgnorecase = (str) => new RegExp(`^${str}[\?\.!]?$`, "i");

module.exports = {
  regexEqualIgnorecase
}
