import { View, Text, StyleSheet, KeyboardAvoidingView, StatusBar } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //---confirm password feature----//

  console.log(name);

  const register = () => {
    console.log("register klikk");
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar style="light" />
      <Text>Create a Let's Chat account</Text>
      <View style={styles.inputContainer}>
        <Input placeholder="Name" autoFocus type="text" value={name} onChangeText={text => setName(text)} />
        <Input placeholder="Email" type="email" value={email} onChangeText={text => setEmail(text)} />
        <Input
          placeholder="Password"
          secureTextEntry
          type="text"
          value={password}
          onSubmitEditing={register}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Button style={styles.button} title="Sign Up" onPress={register}></Button>
      <View style={{ height: 200 }}></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: 200,
  },
  button: {
    width: 100,
  },
});
