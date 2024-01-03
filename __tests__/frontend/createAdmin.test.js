/**
 * @jest-environment jsdom
 */

const createAdmin = require("../../admin_public/dist/js/createAdmin");
const { fetchMock, fetchMockFail } = require("../../__mocks__/fetch");

delete window.location;

const data = {
  "firstname": "James",
  "lastname": "Lastname",
  "username": "james.lastname",
  "radio-stacked": "0",
  "password": "password"
}

describe("Create a new admin user through submitting a form", () => {
  it("Should navigate to the ?register=success url on success", async () => {

    window.location = { href: "http://localhost/admin/addadmin" };

    fetchMock({ success: true });

    await createAdmin(data);

    expect(window.location.href).toBe("addadmin?register=success")
  })

  it("Should catch an error and not throw if one is encountered", async () => {
    fetchMockFail();
    await expect(createAdmin(data)).resolves.not.toThrow();
  })
})