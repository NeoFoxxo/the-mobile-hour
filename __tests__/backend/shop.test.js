const supertest = require('supertest');
const app = require("../../app");
const { db } = require('../../dbconnection');

describe('Shop page', () => {
  let DBSpy;

  beforeEach(() => {
    DBSpy = jest.spyOn(db, 'query');
  });

  afterEach(() => {
    DBSpy.mockRestore();
  });

  test('Responds to GET request with HTML', async () => {
    const response = await supertest(app).get('/shop');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('Filter results from low to high if filter query is "lowhigh"', async () => {
    const response = await supertest(app).get('/shop').query({ filter: "lowhigh" });
    expect(response.statusCode).toBe(200);
    expect(DBSpy).toHaveBeenNthCalledWith(1, "SELECT * FROM product ORDER BY price", null, expect.any(Function));
  });

  test('Filter results from high to low if filter query is "highlow"', async () => {
    const response = await supertest(app).get('/shop').query({ filter: "highlow" });
    expect(response.statusCode).toBe(200);
    expect(DBSpy).toHaveBeenNthCalledWith(1, "SELECT * FROM product ORDER BY price DESC", null, expect.any(Function));
  });

  test('Only show products from the manufacturer provided in the selectedBrand query parameter', async () => {
    const response = await supertest(app).get('/shop').query({ brand: "samsung" });
    expect(response.statusCode).toBe(200);
    expect(DBSpy).toHaveBeenNthCalledWith(1, "SELECT * FROM product WHERE manufacturer = ?", "samsung", expect.any(Function));
  });

  test('Filter results from low to high for a specific brand', async () => {
    const response = await supertest(app).get('/shop').query({ filter: "lowhigh", brand: "apple" });
    expect(response.statusCode).toBe(200);
    expect(DBSpy).toHaveBeenNthCalledWith(1, "SELECT * FROM product WHERE manufacturer = ? ORDER BY price", "apple", expect.any(Function));
  });

  test('Filter results from high to low for a specific brand', async () => {
    const response = await supertest(app).get('/shop').query({ filter: "highlow", brand: "oneplus" });
    expect(response.statusCode).toBe(200);
    expect(DBSpy).toHaveBeenNthCalledWith(1, "SELECT * FROM product WHERE manufacturer = ? ORDER BY price DESC", "oneplus", expect.any(Function));
  });
})