import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const CustomListItem = ({ id, chatName, accessChat, deleteChat }) => {
  const [lastMessages, setLastMessages] = useState([]);

  return (
    <ListItem key={id} onPress={() => accessChat(id, chatName)} style={styles.messagesContainer} bottomDivider>
      <FontAwesome name="user-circle" size={24} color="black" />
      <ListItem.Content>
        <ListItem.Title style={styles.chatsTitle}>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>hello</ListItem.Subtitle>
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
