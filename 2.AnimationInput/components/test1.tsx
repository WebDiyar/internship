// import React, { useEffect, useRef, useState } from 'react';
// import { Animated, Dimensions, TextInput, TouchableOpacity, View, Text } from 'react-native';
// import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import { Audio } from 'expo-av';

// export default function CommentInput() {
//     const [value, setValue] = useState<string>('');
//     const [isRecording, setIsRecording] = useState<boolean>(false);
//     const [recordingDuration, setRecordingDuration] = useState<number>(0);
//     const [recording, setRecording] = useState<Audio.Recording | null>(null);
//     const [permission, setPermission] = useState<Audio.PermissionStatus | null>(null);
//     const { width } = Dimensions.get('window');

//     const animatedSendScale = useRef<Animated.Value>(new Animated.Value(1)).current;
//     const animatedMicScale = useRef<Animated.Value>(new Animated.Value(1)).current;
//     const animatedButtonWidth = useRef<Animated.Value>(new Animated.Value(45)).current;
//     const animatedButtonHeight = useRef<Animated.Value>(new Animated.Value(45)).current;
//     const animatedButtonRadius = useRef<Animated.Value>(new Animated.Value(24)).current;
//     const animatedButtonY = useRef<Animated.Value>(new Animated.Value(0)).current;

//     const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         (async () => {
//             const { status } = await Audio.requestPermissionsAsync();
//             setPermission(status === 'granted' ? status : null);
//         })();
//     }, []);

//     useEffect(() => {
//         if (value.trim().length > 0) {
//             Animated.spring(animatedSendScale, {
//                 toValue: 1,
//                 useNativeDriver: true,
//             }).start();
//         }
//     }, [value]);

//     const animateButtonExpansion = () => {
//         Animated.parallel([
//             Animated.timing(animatedButtonWidth, {
//                 toValue: 50,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(animatedButtonHeight, {
//                 toValue: 50,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(animatedButtonRadius, {
//                 toValue: 25,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(animatedButtonY, {
//                 toValue: -25,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//         ]).start();
//     };

//     const startRecording = async () => {
//         if (!permission) {
//             console.log('Permission to access microphone is required!');
//             return;
//         }

//         await Audio.setAudioModeAsync({
//             allowsRecordingIOS: true,
//             playsInSilentModeIOS: true,
//         });

//         const newRecording = await Audio.Recording.createAsync(
//             Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//         );
//         setRecording(newRecording.recording!);

//         recordingIntervalRef.current = setInterval(() => {
//             setRecordingDuration(prevDuration => prevDuration + 1);
//         }, 1000);

//         setIsRecording(true);
//         animateButtonExpansion();
//     };

//     const stopRecording = async () => {
//         if (!recording) return;

//         clearInterval(recordingIntervalRef.current!);
//         setRecordingDuration(0);
//         await recording.stopAndUnloadAsync();
//         const uri = recording.getURI();
//         console.log('Recording stopped and stored at', uri);

//         setIsRecording(false);
//         setRecording(null);
//         resetButtonSize();
//     };

//     const resetButtonSize = () => {
//         Animated.parallel([
//             Animated.timing(animatedButtonWidth, {
//                 toValue: 45,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(animatedButtonHeight, {
//                 toValue: 45,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(animatedButtonRadius, {
//                 toValue: 24,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(animatedButtonY, {
//                 toValue: 0,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//         ]).start();
//     };

//     return (
//         <View
//             style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 position: 'absolute',
//                 left: 0,
//                 bottom: 0,
//                 maxHeight: 100,
//                 padding: 5,
//                 width,
//             }}
//         >
//             {isRecording ? (
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         backgroundColor: 'white',
//                         borderRadius: 25,
//                         elevation: 2,
//                         width: 200,
//                         flex: 1,
//                         paddingHorizontal: 10,
//                         height: 50,
//                     }}
//                 >
//                     <MaterialIcons name="cancel" size={24} color="red" onPress={stopRecording} />
//                     <Text
//                         style={{
//                             flex: 1,
//                             textAlign: 'center',
//                             paddingHorizontal: 10,
//                         }}
//                     >
//                         {`0:${recordingDuration.toString().padStart(2, '0')}`}
//                     </Text>
//                 </View>
//             ) : (
//                 <TextInput
//                     value={value}
//                     onChangeText={text => setValue(text)}
//                     style={{
//                         backgroundColor: 'white',
//                         borderRadius: 25,
//                         elevation: 2,
//                         flex: 1,
//                         paddingHorizontal: 10,
//                         width: width - 60,
//                         height: 50,
//                     }}
//                     placeholder="Enter message..."
//                 />
//             )}

//             <Animated.View
//                 style={{
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     backgroundColor: 'green',
//                     borderRadius: animatedButtonRadius,
//                     elevation: 2,
//                     width: animatedButtonWidth,
//                     height: animatedButtonHeight,
//                     marginLeft: 10,
//                     transform: [{ translateY: animatedButtonY }],
//                 }}
//             >
//                 <TouchableOpacity
//                     onPress={() => {
//                         if (isRecording) {
//                             stopRecording();
//                         } else {
//                             if (value.trim().length > 0) {
//                                 console.log('Message sent');
//                             } else {
//                                 startRecording();
//                             }
//                         }
//                     }}
//                     style={{
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         width: '100%',
//                         height: '100%',
//                     }}
//                 >
//                     {value.trim().length > 0 ? (
//                         <Animated.View style={{ transform: [{ scale: animatedSendScale }] }}>
//                             <Entypo name="paper-plane" size={24} color="white" />
//                         </Animated.View>
//                     ) : (
//                         <Animated.View style={{ transform: [{ scale: animatedMicScale }] }}>
//                             <FontAwesome name="microphone" size={24} color="white" />
//                         </Animated.View>
//                     )}
//                 </TouchableOpacity>
//             </Animated.View>
//         </View>
//     );
// }
