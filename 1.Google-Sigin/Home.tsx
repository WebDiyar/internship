import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HomeProps {
    userEmail: string | null;
}

export default function Home({ userEmail }: HomeProps) {
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('email');
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Home Page</Text>
            {userEmail && (
                <Text style={{ marginTop: 20 }}>Logged in as: {userEmail}</Text>
            )}
            <Button title="Logout" onPress={logout} />
        </View>
    );
}