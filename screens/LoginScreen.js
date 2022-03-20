import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  //-----to input fields----//
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    console.log("Klikk signIn");
    auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
  };

  {
    /*
  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
    </TouchableWithoutFeedback>
    );
  */
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      if (authUser) {
        navigation.navigate("Home");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={1}>
      <StatusBar style="light"></StatusBar>
      <Fontisto name="hipchat" size={100} color="black" />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autofocus type="email" value={email} onChangeText={text => setEmail(text)} />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <View stlye={styles.buttonContainer}>
        <Button title="Login" containerStyle={styles.button} onPress={signIn} />
        <Button title="Sign Up" containerStyle={styles.button} type="outline" onPress={() => navigation.navigate("Register")} />
      </View>
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  buttonContainer: {},
  button: {
    marginTop: 10,
    width: 100,
  },
});
