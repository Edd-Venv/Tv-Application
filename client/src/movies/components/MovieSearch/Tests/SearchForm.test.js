import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { findByTestAttr, checkProps } from "../../../../../test/testUtils.js";
import SearchForm from "../SearchForm.js";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const defaultProps = { onAddSearch: () => {} };

const setUp = (props = {}) => {
  const setUpProps = { ...defaultProps, ...props };
  return shallow(<SearchForm {...setUpProps} />);
};

describe("MOVIES APP, SEARCHFORM COMPONENT", () => {
  let mockSetText = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetText.mockClear();
    React.useState = jest.fn(() => ["", mockSetText]);
    wrapper = setUp();
  });

  it("RENDERS WITHOUT ERROR", () => {
    const searchFormComponent = findByTestAttr(
      wrapper,
      "search-form-component"
    );
    expect(searchFormComponent.length).toBe(1);
  });

  it("DOES NOT THROW WARNING WITH EXPECTED PROPS", () => {
    const expectedProps = { onAddSearch: () => {} };
    const propError = checkProps(SearchForm, expectedProps);
    expect(propError).toBeUndefined();
  });

  it("SHOULD UPDATE STATE WITH VALUE OF INPUT BOX UNPON CHANGE", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "venom" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetText).toHaveBeenCalledWith("venom");
  });

  /*it("SHOULD CLEAR INPUT FIELD UPON SUBMIT BUTTON CLICK", () => {
    const submitButton = findByTestAttr(wrapper, "search-form");
    submitButton.simulate("click", { preventDefault() {} });

    expect(mockSetText).toHaveBeenCalledWith("");
  });*/
});
