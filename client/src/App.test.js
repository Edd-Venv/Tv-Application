import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

import { findByTestAttr } from "../test/testUtils.js";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (props = {}) => {
  return shallow(<App {...props} />);
};

describe("APP TESTS", () => {
  it("RENDERS WITHOUT CRASHING", () => {
    const wrapper = setUp();
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
  });
});
