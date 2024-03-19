import { useEffect, useState } from 'react';
import { auth, provider } from './config';
import { signInWithPopup, GoogleAuthProvider, UserCredential } from '@firebase/auth';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';

export default function App() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider); //всплывающее окно

      if (result.user && result.user.email) {
        setUserEmail(result.user.email);
        await AsyncStorage.setItem('email', result.user.email);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail) {
          setUserEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error getting stored email:', error);
      }
    };

    getEmailFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      {userEmail ? (
        <Home userEmail={userEmail} />
      ) : (
        <Button title="Sign in With Google" onPress={handleSignIn} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});