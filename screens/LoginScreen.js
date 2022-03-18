import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";

const LoginScreen = () => {


    //-----to input fields----
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signIn = () => {
        console.log("Klikk signIn")
    }

  return (
    <View>
      <StatusBar style="light"></StatusBar>
      <FontAwesome name="user-circle-o" size={100} color="black" />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autofocus type="email" value={email} onChangeText={(text) => setEmail(text)}/>
        <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)}/>
      </View>
      <Button title="Login" containerStyle={styles.button} onPress={signIn}/>
      <Button title="Sing Up" containerStyle={styles.button} type="outline"/>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputContainer: {},
  button:{
      margin: 20,
      alignSelf: "center",
      width: 100,
  },
});
