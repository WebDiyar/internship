import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function CommentInput() {
    const [value, setValue] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recordingDuration, setRecordingDuration] = useState<number>(0);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [permission, setPermission] = useState<boolean | null>(null);
    const { width } = Dimensions.get('window');

    const animatedSendScale = useRef(new Animated.Value(0)).current;
    const animatedMicScale = useRef(new Animated.Value(1)).current;
    const animatedRecordingScale = useRef(new Animated.Value(1)).current;

    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        animateIcons(value.trim() === '');
    }, [value]);

    useEffect(() => {
        return () => {
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
            }
        };
    }, []);

    const animateRecording = () => {
        Animated.timing(animatedRecordingScale, {
            toValue: isRecording ? 0 : 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const animateIcons = (isEmpty: boolean) => {
        if (isEmpty) {
            Animated.timing(animatedMicScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }).start(() => animatedSendScale.setValue(0));
        } else {
            Animated.timing(animatedSendScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }).start(() => animatedMicScale.setValue(0));
        }
    };

    const handleChange = (text: string) => {
        setValue(text);
    };

    const startRecording = async () => {
        if (!permission) {
            console.log('Permission to access microphone is required!');
            return;
        }

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);

        recordingIntervalRef.current = setInterval(() => {
            setRecordingDuration((prevDuration) => prevDuration + 1);
        }, 1000);

        setIsRecording(true);
        animateRecording();
    };

    const stopRecording = async () => {
        if (!recording) return;

        setIsRecording(false);
        animateRecording();

        clearInterval(recordingIntervalRef.current);
        setRecordingDuration(0);

        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setRecording(null);
    };

    const handleRecord = startRecording;

    const handleStopRecording = stopRecording;

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                left: 0,
                bottom: 0,
                maxHeight: 100,
                padding: 5,
                width,
            }}
        >
            {isRecording ? (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 25,
                        elevation: 2,
                        width: 200,
                        flex: 1,
                        paddingHorizontal: 10,
                        height: 50
                    }}
                >
                    <MaterialIcons name="cancel" size={24} color="red" onPress={handleStopRecording} />
                    <Text
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            paddingHorizontal: 10,
                        }}
                    >
                        {`0:${recordingDuration.toString().padStart(2, '0')}`}
                    </Text>
                </View>
            ) : (
                <TextInput
                    value={value}
                    onChangeText={handleChange}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 25,
                        elevation: 2,
                        flex: 1,
                        paddingHorizontal: 10,
                        width: width - 60,
                        height: 50,
                    }}
                    placeholder="Enter message..."
                />
            )}

            <TouchableOpacity
                onPress={() => {
                    if (isRecording) {
                        handleStopRecording();
                    } else {
                        if (value.trim().length > 0) {
                            console.log('Message sent');
                        } else {
                            handleRecord();
                        }
                    }
                }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'green',
                    borderRadius: 24,
                    elevation: 2,
                    width: 45,
                    height: 45,
                    marginLeft: 10,
                }}
            >
                {value.trim().length > 0 ? (
                    <Animated.View style={{ transform: [{ scale: animatedSendScale }] }}>
                        <Entypo name="paper-plane" size={24} color="white" />
                    </Animated.View>
                ) : isRecording ? (
                    <Animated.View style={{ transform: [{ scale: animatedRecordingScale }] }}>
                        <Entypo name="paper-plane" size={24} color="white" />
                    </Animated.View>
                ) : (
                    <Animated.View style={{ transform: [{ scale: animatedMicScale }] }}>
                        <FontAwesome name="microphone" size={24} color="white" />
                    </Animated.View>
                )}
            </TouchableOpacity>
        </View>
    );
}
