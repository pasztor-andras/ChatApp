import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';


const CustomListItem = ({ id, chatName, accesChat}) => {
  return (
    <ListItem onPress={() => accesChat(id, chatName)} style={styles.messagesContainer} key={id} bottomDivider>
        <FontAwesome name="user-circle" size={24} color="black" />
        <ListItem.Content>
            <ListItem.Title style={styles.chatsTitle}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1}>

            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
    chatsTitle: {
    },
});
