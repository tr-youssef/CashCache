// import React, { useState, useEffect } from "react";
// import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import { callAPI } from "../../utils/fetch/callAPI";

// const Bot = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingDots, setLoadingDots] = useState("");
//   const [forceRender, setForceRender] = useState(false);

//   const handleSend = async (newMessages = []) => {
//     try {
//       setLoading(true);
//       const userMessage = newMessages[0];
//       setMessages((previousMessage) =>
//         GiftedChat.append(previousMessage, userMessage)
//       );
//       const messageText = userMessage.text.toLowerCase();
//       const keywords = [
//         "budget",
//         "budgeting",
//         "money",
//         "save",
//         "$",
//         "savings",
//         "saving",
//         "investment",
//       ];

//       if (!keywords.some((keyword) => messageText.includes(keyword))) {
//         const botMessage = {
//           _id: new Date().getTime() + 1,
//           text: "I am a budget bot, please ask me anything related to budgeting questions and savings :)",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "Budget Bot",
//           },
//         };
//         setMessages((previousMessage) =>
//           GiftedChat.append(previousMessage, botMessage)
//         );
//         return;
//       }

//       const response = await callAPI(
//         "/api/chat",
//         "POST",
//         {
//           prompt: messageText,
//         },
//         "YOUR_API_KEY"
//       );
//       const botMessage = {
//         _id: new Date().getTime() + 1,
//         text: response.bot,
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "Budget Bot",
//         },
//       };
//       setMessages((previousMessage) =>
//         GiftedChat.append(previousMessage, botMessage)
//       );
//       setLoading(false);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     let dots = "";
//     const interval = setInterval(() => {
//       dots = dots.length === 3 ? "" : dots + ".";
//       setLoadingDots(dots);
//     }, 500);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   useEffect(() => {
//     setForceRender((prev) => !prev);
//   }, [loading]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}></Text>
//       </View>
//       <GiftedChat
//         messages={messages}
//         onSend={(newMessages) => handleSend(newMessages)}
//         user={{ _id: 1 }}
//         isTyping={loading}
//         forceGetKeyboardHeight={forceRender}
//         renderLoading={() => {
//           if (loading) {
//             return (
//               <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="small" color="#00FF00" />
//                 <Text style={styles.loadingText}>Thinking{loadingDots}</Text>
//               </View>
//             );
//           }
//           return null;
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#050A05",
//   },
//   header: {
//     backgroundColor: "#050A05",
//     padding: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     borderBottomWidth: 1,
//     marginTop: 40,
//     marginBottom: 5,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#00FF00",
//   },
//   loadingContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//   },
//   loadingText: {
//     marginLeft: 5,
//     color: "#00FF00",
//   },
// });

// export default Bot;

import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { callAPI } from "../../utils/fetch/callAPI";

const Bot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [forceRender, setForceRender] = useState(false);

  const handleSend = async (newMessages = []) => {
    try {
      setLoading(true);
      const userMessage = newMessages[0];
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

      const response = await callAPI(
        "/api/chat",
        "POST",
        {
          prompt: messageText,
        },
        "YOUR_API_KEY"
      );
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
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    let dots = "";
    const interval = setInterval(() => {
      dots = dots.length === 3 ? "" : dots + ".";
      setLoadingDots(dots);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setForceRender((prev) => !prev);
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}></Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
        isTyping={loading}
        forceGetKeyboardHeight={forceRender}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                borderWidth: 1,
                borderColor: "#00FF00",
                backgroundColor: "#000000",
                borderRadius: 15,
              },
              right: {
                borderWidth: 1,
                borderColor: "#00FF00",
                backgroundColor: "#000000",
                borderRadius: 15,
              },
            }}
            textStyle={{
              left: {
                color: "#FFFFFF",
              },
              right: {
                color: "#FFFFFF",
              },
            }}
          />
        )}
        renderLoading={() => {
          if (loading) {
            return (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#00FF00" />
                <Text style={styles.loadingText}>Thinking{loadingDots}</Text>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
  },
  header: {
    backgroundColor: "#050A05",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    marginTop: 40,
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00FF00",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loadingText: {
    marginLeft: 5,
    color: "#00FF00",
  },
});

export default Bot;
