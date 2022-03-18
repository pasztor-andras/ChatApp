import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {


    //-----to input fields----//
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signIn = () => {
        console.log("Klikk signIn")
        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error))
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if(authUser) {
                navigation.navigate("Home")
            }
        });
        return () => {
            unsubscribe()
        }
    }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <StatusBar style="light"></StatusBar>
      <FontAwesome name="user-circle-o" size={100} color="black" />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autofocus type="email" value={email} onChangeText={(text) => setEmail(text)}/>
        <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn}/>
      </View>
      <Button title="Login" containerStyle={styles.button} onPress={signIn}/>
      <Button title="Sign Up" containerStyle={styles.button} type="outline" onPress={() => navigation.navigate("Register")}/>
      <View style={{ height: 100 }}></View>
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
      width: 300,
  },
  button:{
      marginTop: 10,
      width: 100,
  },
});
