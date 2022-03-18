import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";

const LoginScreen = () => {
  return (
    <View>
      <StatusBar style="light"></StatusBar>
      <FontAwesome name="user-circle-o" size={100} color="black" />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autofocus type="email"/>
        <Input placeholder="Password" secureTextEntry type="password"/>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {},
});
