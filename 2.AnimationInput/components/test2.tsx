// import React, { useRef } from 'react';
// import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

// const App: React.FC = () => {
//     const size = useRef<Animated.Value>(new Animated.Value(100)).current;
//     const borderRadius = useRef<Animated.Value>(new Animated.Value(50)).current;

//     const handleLongPress = () => {
//         Animated.parallel([
//             Animated.timing(size, {
//                 toValue: 140,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(borderRadius, {
//                 toValue: 70,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//         ]).start();
//     };

//     const handlePressOut = () => {
//         Animated.parallel([
//             Animated.timing(size, {
//                 toValue: 100,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(borderRadius, {
//                 toValue: 50,
//                 duration: 300,
//                 useNativeDriver: false,
//             }),
//         ]).start();
//     };

//     return (
//         <View style={styles.container}>
//             <Animated.View
//                 style={[
//                     styles.button,
//                     {
//                         width: size,
//                         height: size,
//                         borderRadius: borderRadius,
//                     },
//                 ]}
//             >
//                 <TouchableOpacity
//                     onPressIn={handleLongPress}
//                     onPressOut={handlePressOut}
//                     style={styles.touchable}
//                 >
//                     <Text style={styles.text}>Press Me</Text>
//                 </TouchableOpacity>
//             </Animated.View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: 'dodgerblue',
//         justifyContent: 'center',
//         alignItems: 'center',
//         overflow: 'hidden',
//     },
//     touchable: {
//         width: '100%',
//         height: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         color: '#fff',
//     },
// });

// export default App;
