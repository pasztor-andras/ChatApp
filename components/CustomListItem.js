import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, accessChat, deleteChat }) => {
  const [lastMessages, setLastMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setLastMessages(snapshot.docs.map(doc => doc.data()));
      });

    setTimeout(() => {
      unsubscribe();
    }, 1000);
  }, []);

  return (
    <ListItem key={id} onPress={() => accessChat(id, chatName)} style={styles.messagesContainer} bottomDivider>
      <FontAwesome name="user-circle" size={24} color="black" />
      <ListItem.Content>
        <ListItem.Title style={styles.chatsTitle}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>
          {lastMessages?.[0]?.displayName}: {lastMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
      <TouchableOpacity onPress={() => deleteChat(id)}>
        <AntDesign name="closecircleo" size={24} color="black" />
      </TouchableOpacity>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  chatsTitle: {
    fontSize: 24,
  },
});
