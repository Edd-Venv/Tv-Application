import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App.js";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (props = {}, state = null) => {
  return shallow(<App {...props} />);
};
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};
describe("APP TESTS", () => {
  it("RENDERS WITHOUT CRASHING", () => {
    const wrapper = setUp();
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
  });
});
