import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Body from "./Body.js";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setUp = (state) => {
  return shallow(<Body {...props} />);
};
describe("BODY TEST", () => {});
