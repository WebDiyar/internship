import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { format, addDays, startOfDay, isWithinInterval } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const periods = [
    { start: '2024-05-26', end: '2024-06-08' },
    { start: '2024-06-09', end: '2024-06-22' },
    { start: '2024-06-23', end: '2024-07-06' },
    { start: '2024-07-07', end: '2024-07-20' },
    { start: '2024-07-21', end: '2024-08-03' },
    { start: '2024-08-04', end: '2024-08-17' },
];

const HomePage = () => {
    const navigation = useNavigation<HomePageNavigationProp>();
    const today = startOfDay(new Date());

    const handlePress = (period: { start: string; end: string }) => {
        const periodStart = startOfDay(new Date(period.start));
        const periodEnd = startOfDay(new Date(period.end));
        if (isWithinInterval(today, { start: periodStart, end: periodEnd })) {
            navigation.navigate('Timesheet', { initialStartDate: periodStart });
        } else {
            Alert.alert('This period is overdue and cannot be accessed.');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, styles.periodHeader]}>Billing Period</Text>
                    <Text style={[styles.headerText, styles.statusHeader]}>Status</Text>
                    <Text style={[styles.headerText, styles.hoursHeader]}>Hours</Text>
                    <Text style={[styles.headerText, styles.amountHeader]}>Amount</Text>
                </View>
                {periods.map((period, index) => {
                    const periodStart = startOfDay(new Date(period.start));
                    const periodEnd = startOfDay(new Date(period.end));
                    const isCurrent = isWithinInterval(today, { start: periodStart, end: periodEnd });
                    const status = isCurrent ? 'Current' : 'Overdue';

                    return (
                        <View key={index} style={styles.row}>
                            <Text style={styles.period}>{`${format(periodStart, 'MMM d')} – ${format(periodEnd, 'MMM d')}`}</Text>
                            <Text style={[styles.status, { color: isCurrent ? 'blue' : 'red' }]}>{status}</Text>
                            <Text style={styles.hours}>0</Text>
                            <Text style={styles.amount}>$0.00</Text>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: 'green' }]}
                                onPress={() => handlePress(period)}
                                disabled={!isCurrent}
                            >
                                <Text style={[styles.buttonText, { color: 'white' }]}>Review</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    table: {
        width: '90%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        paddingVertical: 10,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    periodHeader: {
        flex: 2,
        textAlign: "left",
        paddingLeft: 15,
        marginRight: 40
        
    },
    statusHeader: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: 40
    },
    hoursHeader: {
        flex: 1,
        textAlign: 'left'
    },
    amountHeader: {
        flex: 1,
        // marginRight: 160
        textAlign: 'left',
        paddingRight: 20
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    period: {
        flex: 2,
        textAlign: 'left',
        paddingLeft: 10,
        color: 'black',
    },
    status: {
        flex: 1,
        textAlign: 'center',
    },
    hours: {
        flex: 1,
        textAlign: 'center',
    },
    amount: {
        flex: 1,
        textAlign: 'center',
    },
    button: {
        flex: 0.5,
        borderRadius: 5,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    buttonText: {
        textAlign: 'center',
    },
});

export default HomePage;
