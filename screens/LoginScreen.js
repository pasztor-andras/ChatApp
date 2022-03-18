import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";

const LoginScreen = () => {


    //-----to input fields----//
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signIn = () => {
        console.log("Klikk signIn")
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="light"></StatusBar>
      <FontAwesome name="user-circle-o" size={100} color="black" />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autofocus type="email" value={email} onChangeText={(text) => setEmail(text)}/>
        <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)}/>
      </View>
      <Button title="Login" containerStyle={styles.button} onPress={signIn}/>
      <Button title="Sing Up" containerStyle={styles.button} type="outline"/>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
  inputContainer: {
      width: 200,
  },
  button:{
      marginTop: 10,
      width: 100,
  },
});
