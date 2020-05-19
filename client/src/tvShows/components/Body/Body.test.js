import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../../../test/testUtils.js";
import Body from "./Body.js";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setUp = (props, state) => {
  return shallow(<Body {...props} />);
};
describe("BODY TEST", () => {
  it("RENDERS WITHOUT ERROR", () => {
    const wrapper = setUp();
    const bodyComponent = findByTestAttr(wrapper, "body-component");
    expect(bodyComponent.length).toBe(1);
  });
});
