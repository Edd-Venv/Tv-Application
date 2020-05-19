import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../../../../test/testUtils.js";
import Movie from "../Movies.js";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setUp = (props) => {
  return shallow(<Movie {...props} />);
};

describe("MOVIES APP, MOVIE COMPONENT", () => {
  it("RENDERS WITHOUT ERROR", () => {
    const wrapper = setUp();
    const movieComponent = findByTestAttr(wrapper, "movie-component");
    expect(movieComponent.length).toBe(1);
  });
});
