import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { IMessage } from 'react-native-gifted-chat';

interface CommentInputProps {
    onSend: (messages: IMessage[]) => void;
}

export default function CommentInput({ onSend }: CommentInputProps) {
    const [value, setValue] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordingDuration, setRecordingDuration] = useState<number>(0);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [permission, setPermission] = useState<Audio.PermissionStatus | null>(null);
    const { width } = Dimensions.get('window');

    const animatedSendScale = useRef<Animated.Value>(new Animated.Value(1)).current;
    const animatedMicScale = useRef<Animated.Value>(new Animated.Value(1)).current;
    const animatedButtonWidth = useRef<Animated.Value>(new Animated.Value(45)).current;
    const animatedButtonHeight = useRef<Animated.Value>(new Animated.Value(45)).current;
    const animatedButtonRadius = useRef<Animated.Value>(new Animated.Value(24)).current;
    const animatedButtonY = useRef<Animated.Value>(new Animated.Value(0)).current;

    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            setPermission(status === 'granted' ? status : null);
        })();
    }, []);

    useEffect(() => {
        if (value.trim().length > 0) {
            Animated.spring(animatedSendScale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(animatedSendScale, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }, [value]);

    const startRecording = async () => {
        if (!permission) {
            console.log('Permission to access microphone is required!');
            return;
        }

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const newRecording = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(newRecording.recording!);

        recordingIntervalRef.current = setInterval(() => {
            setRecordingDuration(prevDuration => prevDuration + 1);
        }, 1000);

        setIsRecording(true);
        animateButtonExpansion();
    };

    const stopRecording = async () => {
        if (!recording) return;

        clearInterval(recordingIntervalRef.current!);
        setRecordingDuration(0);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);

        setIsRecording(false);
        setRecording(null);
        resetButtonSize();
    };

    const animateButtonExpansion = () => {
        Animated.parallel([
            Animated.timing(animatedButtonWidth, {
                toValue: 70,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animatedButtonHeight, {
                toValue: 70,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animatedButtonRadius, {
                toValue: 35,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const resetButtonSize = () => {
        Animated.parallel([
            Animated.timing(animatedButtonWidth, {
                toValue: 45,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animatedButtonHeight, {
                toValue: 45,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(animatedButtonRadius, {
                toValue: 24,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const sendTextMessage = () => {
        if (value.trim().length > 0) {
            onSend([{ _id: Math.random(), text: value, createdAt: new Date(), user: { _id: 1 } }]);
            setValue('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder="Enter message..."
                style={styles.input}
                onSubmitEditing={sendTextMessage}
            />
            <Animated.View style={[styles.button, {
                width: animatedButtonWidth,
                height: animatedButtonHeight,
                borderRadius: animatedButtonRadius,
            }]}>
                <TouchableOpacity
                    onLongPress={startRecording}
                    onPressOut={stopRecording}
                    onPress={sendTextMessage}
                    style={styles.touchable}
                >
                    {value.trim().length > 0 ? (
                        <Animated.View style={{ transform: [{ scale: animatedSendScale }] }}>
                            <Entypo name="paper-plane" size={24} color="white" />
                        </Animated.View>
                    ) : (
                        <Animated.View style={{ transform: [{ scale: animatedMicScale }] }}>
                            <FontAwesome name="microphone" size={24} color="white" />
                        </Animated.View>
                    )}
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 25,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
    },
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});
