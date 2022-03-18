import React, { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CustomListItem from "../components/CustomListItem";
import { auth } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Let's Chat",
      headerStyle: { backgroundColor: "#eee" },
      headerTitleStyle: { color: "#000" },
      headerTintColor: "#000",
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={signOut}>
            <Entypo name="user" size={24} color="black" />
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
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
