import React from "react";
import RegisterScreen from "../screens/RegisterScreen";

import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer.create(
        <RegisterScreen/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})