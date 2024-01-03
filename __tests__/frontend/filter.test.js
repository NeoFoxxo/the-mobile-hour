/**
 * @jest-environment jsdom
 */

const filter = require("../../public/js/filter");

delete window.location;

describe("Filter products based on query parameters in the url", () => {

  it("Should updated the current url to include the provided filter parameter", () => {
    window.location = { href: "http://localhost/shop" };
    filter("lowhigh")
    expect(window.location.href).toBe("http://localhost/shop?filter=lowhigh")
  })

  it("Should keep the brand in the url if it is present", () => {
    window.location = { href: "http://localhost/shop?brand=samsung" };
    filter("highlow")
    expect(window.location.href).toBe("http://localhost/shop?brand=samsung&filter=highlow")
  })
});
