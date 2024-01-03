/**
 * @jest-environment jsdom
 */

const orderProduct = require("../../public/js/orderproduct");
const { fetchMock, fetchMockFail } = require("../../__mocks__/fetch");
delete window.location;

const data = {
  "quantity": "1",
  "price": "250",
  "product_id": "2",
  "cust_id": "2",
  "product_name": "Apple iPhone 5s",
  "order_date": "2024-01-03",
  "shipping_date": "2024-01-10",
  "total_price": 250,
  "order_number": 19
}

describe('Order product functionality', () => {

  it('Should make a fetch request with the correct parameters', async () => {
    fetchMock({ success: true })
    await orderProduct(data);
    expect(fetch.mock.calls[0][0]).toBe("/order");
    expect(fetch.mock.calls[0][1].method).toBe("POST");
    expect(fetch.mock.calls[0][1].headers).toEqual({ "Accept": "application/json", "Content-Type": "application/json" });
  });

  it('Should redirect to the confirmation page on success', async () => {
    window.location = { href: "http://localhost/product/1" };
    fetchMock({ success: true });
    await orderProduct(data);
    expect(window.location.href).toBe("/confirmation");
  });

  it('Should redirect to the login page if the user is not logged in', async () => {
    window.location = { href: "http://localhost/product/1" };
    fetchMock({ success: false });
    await orderProduct(data);
    expect(window.location.href).toBe("/login.html?from=order");
  });

  it('Should catch and log errors', async () => {
    fetchMockFail();
    await expect(orderProduct(data)).resolves.not.toThrow();
  });
});