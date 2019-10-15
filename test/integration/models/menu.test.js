const app = require('../../../index');
const { expect } = require('chai');
const request = require('supertest');

describe('Menu API Integration Tests', () => {
  describe('#GET /api/menu ', () => {
    it('should get all menus', () => {
      request(app).get('/api/menu')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.empty;;
        });
    });
  });
});