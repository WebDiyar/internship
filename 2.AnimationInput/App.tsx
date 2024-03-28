import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import CommentInput from './components/CommentInput ';

export default function App() {
  return (
    <>
      <ImageBackground
        style={{ flex: 1, opacity: 0.2 }}
        source={{
          uri: 'https://image.freepik.com/free-vector/abstract-geometric-pattern-background_1319-242.jpg',
        }}
      >
        <ScrollView></ScrollView>
      </ImageBackground>
      <CommentInput/>
    </>
  );
}
