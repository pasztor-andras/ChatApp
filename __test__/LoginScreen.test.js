import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { shallow } from "@wojtekmaj/enzyme-adapter-react-17";

import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer.create(
        <LoginScreen/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

