import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

const ChatScreen = ({ navigation, route: { params } }) => {
    //console.log(params.id)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center"}}>
                    <Avatar rounded/>
                    <Text>{params.chatName}</Text>
                </View>
            )
        })
    }, [navigation])

  return (
    <View>
      <Text>{params.chatName}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
