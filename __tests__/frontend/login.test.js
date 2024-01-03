/**
 * @jest-environment jsdom
 */

const Login = require("../../public/js/login");
const { fetchMock, fetchMockFail } = require("../../__mocks__/fetch");

delete window.location;

const data = {
  "email": "joe@gmail.com",
  "password": "password"
}

describe("Login functionality", () => {

  it("Should navigate to the /?login=success url on success", async () => {
    window.location = { href: "http://localhost/login" };
    fetchMock({ success: true });
    await Login(data);
    expect(window.location.href).toBe("/?login=success");
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it("Should show the invalid alert on errors", async () => {
    let invalidalert = { classList: { add: jest.fn() } };
    global.document.getElementById = jest.fn().mockReturnValue(invalidalert);

    fetchMock({ success: false });
    await Login(data);
    expect(invalidalert.classList.add).toHaveBeenCalledWith("show");
  })

  it('Should catch an error and not throw if one is encountered', async () => {
    fetchMockFail();
    await expect(Login(data)).resolves.not.toThrow();
  });
});
