import React, { useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage, Send } from 'react-native-gifted-chat';
import { Entypo, FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputText, setInputText] = useState<string>('d'); 

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    setInputText(''); 
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          {inputText.trim().length > 1   ? (
            <Entypo name="paper-plane" size={24} color="red" />
          ) : (
            <FontAwesome name="microphone" size={24} color="red" />
          )}
        </View>
      </Send>
    );
  }

  return (
    <>
        <GiftedChat
      messages={messages}
      onInputTextChanged={text => setInputText(text)}
      onSend={messages => onSend(messages)}
      renderSend={renderSend}
      user={{ _id: 1 }}

    />
    </>
    
  );
}
