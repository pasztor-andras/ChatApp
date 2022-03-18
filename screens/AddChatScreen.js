import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Input } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { db } from '../firebase';

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState("")

  
    const createChat = async () => {
        await db.collection("chats").add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error))
    }

  useLayoutEffect(() => {
    navigation.setOptions({
        title: "Add a new chat",
        headerBackTitle: "Chats"
    })
  }, [navigation]);

    return (
    <View style={styles.container}>
      <Input 
      placeholder='Enter chat name' 
      value={input} 
      onChangeText={(text) => setInput(text)}
      onSubmitEditing={createChat}
      leftIcon={
        <TouchableOpacity onPress={createChat}>
            <Entypo name="arrow-with-circle-left" size={24} color="black" />
        </TouchableOpacity>
      }
      ></Input>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {

    }
})