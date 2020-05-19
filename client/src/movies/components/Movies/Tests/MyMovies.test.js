import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttr, checkProps } from "../../../../../test/testUtils.js";
import MyMovies from "../MyMovies.js";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = { logOutCallback: () => {} };

const setUp = (props = {}) => {
  const setUpProps = { ...defaultProps, ...props };
  return shallow(<MyMovies {...setUpProps} />);
};

describe("MOVIES APP, MYMOVIES COMPONENT", () => {
  /*let wrapper;
    beforeEach(()=>{
        wrapper = setUp({ logOutCallback: () => {} });
    })*/
  /*it("RENDERS WITHOUT ERROR", () => {
    const wrapper = setUp({ logOutCallback: () => {} });
    const myMoviesComponent = findByTestAttr(wrapper, "my-movies-component");
    expect(myMoviesComponent.length).toBe(1);
  });*/
  it("DOES NOT THROW WARNING WITH EXPECTED PROPS", () => {
    const expectedProps = { logOutCallback: () => {} };
    const propError = checkProps(MyMovies, expectedProps);
    expect(propError).toBeUndefined();
  });
});
