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
import { Entypo } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import firebase from "firebase/compat";
import { FontAwesome } from "@expo/vector-icons";

//import { updateDoc, serverTimestamp } from "firebase/firestore";

const ChatScreen = ({ navigation, route: { params } }) => {
  //console.log(params.id)
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  //const docRef = doc(db, 'objects', 'some-id');

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
          <FontAwesome name="user-circle" size={24} color="black" />
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
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light"></StatusBar>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <ScrollView>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.reciever}>
                  <FontAwesome name="user-circle-o" size={24} color="black" style={{ marginLeft: 10 }} />
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <FontAwesome name="user-circle" size={24} color="black" style={{ marginRight: 10 }} />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
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
              <Entypo name="arrow-bold-right" size={24} color="#2b68e6" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    width: "80%",
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    color: "#eee",
    borderRadius: 30,
  },
  reciever: {
    position: "relative",
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "#cecece",
    borderRadius: 20,
    padding: 10,
    maxWidth: "80%",
  },
  recieverText: {},
  sender: {
    position: "relative",
    flexDirection: "row",
    alignSelf: "flex-start",
    margin: 15,
    maxHeight: "80%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "red",
    padding: 10,
    backgroundColor: "#2b68e6",
  },
  senderText: {},
  footer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
});
