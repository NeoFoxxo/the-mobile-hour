/**
 * @jest-environment jsdom
 */

const radio = require("../../public/js/brandfilter");

delete window.location;

describe("Filter products based on the radio button selected", () => {

  it("Should filter to brand if its radio is clicked", () => {
    window.location = { href: "http://localhost/shop" };
    radio("samsung")
    expect(window.location.href).toBe("http://localhost/shop?brand=samsung")
  })

  it("Should keep the filter in url if it is present", () => {
    window.location = { href: "http://localhost/shop?filter=lowhigh" };
    radio("apple")
    expect(window.location.href).toBe("http://localhost/shop?filter=lowhigh&brand=apple")
  })

  it("Should remove the brand from the url if the same brand is selected again", () => {
    window.location = { href: "http://localhost/shop?brand=samsung" };
    radio("samsung")
    expect(window.location.href).toBe("/shop")
  })
  it("Should replace the brand with the selected brand if it is present", () => {
    window.location = { href: "http://localhost/shop?brand=samsung" };
    radio("apple")
    expect(window.location.href).toBe("http://localhost/shop?brand=apple")
  })
});
