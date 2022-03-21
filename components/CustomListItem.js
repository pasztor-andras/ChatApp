import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';
import { db } from "../firebase";


const CustomListItem = ({ id, chatName, accesChat}) => {

  const [lastMessages, setLastMessages] = useState([]);



  return (
    <ListItem key={id} onPress={() => accesChat(id, chatName)} style={styles.messagesContainer} bottomDivider>
        <FontAwesome name="user-circle" size={24} color="black" />
        <ListItem.Content>
            <ListItem.Title style={styles.chatsTitle}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1}>
              hello
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
    chatsTitle: {
      fontSize: 24,
    },
});
