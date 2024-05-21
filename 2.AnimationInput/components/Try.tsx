import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, Send, InputToolbar, IMessage } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [textInput, setTextInput] = useState('');

    function onSend(newMessages: IMessage[] = []) {
        setMessages(GiftedChat.append(messages, newMessages));
        setTextInput('');
        console.log(textInput);
    }

    const renderSend = (props: any) => (
        <Send {...props}>
            {textInput.trim().length > 0 && (
                <View style={styles.sendingContainer}>
                    <MaterialIcons name="send" size={32} color="red" />
                </View>
            )}
        </Send>
    );

    const renderInputToolbar = (props: any) => (
        <InputToolbar
            {...props}
            containerStyle={styles.inputContainer}
            textInputProps={{
                onChangeText: (text: string) => setTextInput(text),
                value: textInput,
            }}
        />
    );

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{ _id: 1 }}
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                alwaysShowSend={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    inputContainer: {
        padding: 5,
    },
});
