import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import CommentInput from './components/CommentInput ';

export default function App() {
  return (
    <>
      <ImageBackground
        style={{ flex: 1, opacity: 0.2, backgroundColor: 'black' }}
        source={{
          
        }}
      >
      <ScrollView></ScrollView>
      </ImageBackground>
      <CommentInput/>
    </>
  );
}
