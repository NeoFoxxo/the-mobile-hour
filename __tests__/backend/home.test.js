const supertest = require('supertest');
const app = require("../../app");
const { db } = require('../../dbconnection');

describe('Home page', () => {
  let response;
  const DBSpy = jest.spyOn(db, 'query');

  beforeAll(async () => {
    response = await supertest(app).get('/');
  });

  test('Responds to GET request with HTML', () => {
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('SQL query to obtain all products is executed', async () => {
    expect(DBSpy).toHaveBeenCalledWith("SELECT * FROM product", expect.any(Function));
  });
})