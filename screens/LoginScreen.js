import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth"

const LoginScreen = ({ navigation }) => {
  //-----to input fields----//
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    console.log("Klikk signIn");
    signInWithEmailAndPassword(auth, email, password)
    .catch(error => alert(error));
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
        <Input testID="email" placeholder="Email" autofocus type="email" value={email} onChangeText={text => setEmail(text)} />
        <Input
        testID="password"
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
