import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const accessChat = (id, chatName) => {
    navigation.navigate("Chat", {
        id: id,
        chatName: chatName
    })
  }

  const deleteChat = (id) => {
    //console.log("Delete")
    db
    .collection("chats")
    .doc(id)
    .delete()
  } 

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot(snapshot =>
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Let's Chat",
      headerStyle: { backgroundColor: "#eee" },
      headerTitleStyle: { color: "#000" },
      headerTintColor: "#000",
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={signOut} style={{ alignItems: "center" }}>
            <Entypo name="user" size={24} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcons} onPress={() => navigation.navigate("AddChat")}>
            <Entypo name="pencil" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcons}>
            <Entypo name="dots-three-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.chatRoomContainer}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} accessChat={accessChat} deleteChat={deleteChat}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  chatRoomContainer: {
    height: "100%"
  },
  headerLeft: {
    marginLeft: 40,
  },
  headerRight: {
    flexDirection: "row",
    marginRight: 40,
  },
  headerIcons: {
    margin: 5,
  },
});
