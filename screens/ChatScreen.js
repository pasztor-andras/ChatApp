import React, { useLayoutEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import firebase from "firebase/compat";

const ChatScreen = ({ navigation, route: { params } }) => {
  //console.log(params.id)
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
    });
    setInput("");
  };

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

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [params]);

  return (
    <SafeAreaView>
      <StatusBar style="light"></StatusBar>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView>
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Entypo name="user" size={24} color="black" />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      rounded
                      source={{
                        uri: "https://cdn-icons.flaticon.com/png/512/552/premium/552721.png?token=exp=1647603541~hmac=4e846ae54db9f77517df3417781b5b3f",
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Let's Chat Message"
                value={input}
                onChangeText={text => setInput(text)}
                onSubmitEditing={sendMessage}
                style={styles.textInput}
              />
              <TouchableOpacity onPress={sendMessage}>
                <Entypo name="arrow-bold-right" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
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
    borderRadius: 30,
  },
  reciever: {
      position: "relative",
      alignSelf: "flex-end",
      marginRight: 15,
      marginBottom: 20,
      backgroundColor: "#cecece",
      borderRadius: 20,
      maxWidth: "80%"
  },
  recieverText: {},
  sender: {
      position: "relative",
      alignSelf: "flex-start",
      margin: 15,
      maxHeight: "80%",
      borderRadius: 20,
      backgroundColor: "#2b68e6",
  },
  senderText: {},
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
