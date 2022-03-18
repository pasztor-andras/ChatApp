import { View, Text, StyleSheet, KeyboardAvoidingView, StatusBar } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //---confirm password feature----//

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
          authUser.user.updateProfile({
              displayName: name
          })
      })
      .catch(error => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

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
