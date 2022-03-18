import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";


const CustomListItem = ({ id, chatName, accesChat}) => {
  return (
    <ListItem onPress={() => accesChat(id, chatName)} style={styles.messagesContainer} key={id} bottomDivider>
        <Avatar 
        rounded 
        source={{ uri: "https://cdn-icons.flaticon.com/png/512/552/premium/552721.png?token=exp=1647603541~hmac=4e846ae54db9f77517df3417781b5b3f"}}/>
        <ListItem.Content>
            <ListItem.Title style={styles.chatsTitle}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1}>
                valami
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
    chatsTitle: {
        fontWeight: 700,
    },
});
