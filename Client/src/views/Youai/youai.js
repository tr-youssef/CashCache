import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { callAPI } from "../../utils/fetch/callAPI";

const Bot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (newMessages = []) => {
    try {
      //gets user msg
      const userMessage = newMessages[0];

      //add the users msg
      setMessages((previousMessage) =>
        GiftedChat.append(previousMessage, userMessage)
      );
      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        "budget",
        "budgeting",
        "money",
        "save",
        "$",
        "savings",
        "saving",
        "investment",
      ];

      //add more keywords as needed
      if (!keywords.some((keyword) => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I am a budget bot, please ask me anything related to budgeting questions and savings :)",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Budget Bot",
          },
        };
        setMessages((previousMessage) =>
          GiftedChat.append(previousMessage, botMessage)
        );
        return;
      }
      //if messsage has keywords
      const response = await callAPI(
        "/api/chat",
        "POST",
        {
          prompt: messageText,
        },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyLnlvdXNzZWZAZ21haWwuY29tIiwiaWQiOiI2NDdlZDUxNzY1YTY1YmRmMDhmMWJkZmUiLCJpYXQiOjE2ODkxOTA0NTgsImV4cCI6MTY4OTIzMzY1OH0.YbuvIYBfh3gBh3OyKJ8-p6-kbtgG4DynX4zYEIVMpqQ"
      );
      console.log(response);
      //const budget = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: response.bot,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Budget Bot",
        },
      };

      setMessages((previousMessage) =>
        GiftedChat.append(previousMessage, botMessage)
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#050A05",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          maginTop: 40,
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          Budget Bot
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
};

export default Bot;
