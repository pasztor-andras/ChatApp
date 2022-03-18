import { View, Text, StyleSheet, KeyboardAvoidingView, StatusBar } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";

export default function RegisterScreen({ navigation }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(name)

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text>Create a Let's Chat account</Text>
      <View style={styles.inputContainer}>
          <Input placeholder="Name" autoFocus type="text" value={name} onChangeText={(text) => setName(text)}/>
          <Input placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text)}/>
          <Input placeholder="Password" secureTextEntry type="text" value={password} onChangeText={(text) => setPassword(text)}/>
      </View>
      <Button title="Sign Up" onPress={()=> console.log("sign up klikk")}></Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {},
});
