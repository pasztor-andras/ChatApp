import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

const ChatScreen = ({ navigation, route: { params } }) => {
  //console.log(params.id)
  const [message, setMessage] = useState("");

  const sendMessage = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: "https://cdn-icons.flaticon.com/png/512/552/premium/552721.png?token=exp=1647603541~hmac=4e846ae54db9f77517df3417781b5b3f",
            }}
          />
          <Text style={styles.chatTitle}>{params.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Entypo name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView >
      <StatusBar style="light"></StatusBar>
      <KeyboardAvoidingView style={styles.container}>
        <>
          <ScrollView></ScrollView>
          <View style={styles.footer}>
            <TextInput placeholder="Let's Chat Message" value={message} onChangeText={text => setMessage(text)} style={styles.textInput} />
            <TouchableOpacity onPress={sendMessage}>
                <Entypo name="arrow-bold-right" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,

  },
  icon: {},
  chatTitle: {
    color: "#fff",
    // fontWeight: 800,
    marginLeft: 10,
  },
  textInput: {
      bottom: 0,
      height: 40,
      flex: 1,
      marginRight: 15,
      borderColor: "transparent",
      backgroundColor: "#ececec",
      borderWidth: 1,
      padding: 10,
      color: "#eee",
      borderRadius: 30
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
