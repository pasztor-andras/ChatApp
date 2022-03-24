import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { act, create } from "react-test-renderer";

const login = create(<LoginScreen />);

test("snapshot", () => {
  expect(login).toMatchSnapshot();
});


test("login button press", () => {
    const button = login.root.findAllByProps({ testID: "login-btn" }).props;
    act(() => button.onPress())
})