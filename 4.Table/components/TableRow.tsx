import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { format } from 'date-fns';

interface TableRowProps {
    date: Date;
    isToday: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ date, isToday }) => {
    return (
        <View style={styles.row}>
            <View style={styles.dateCell}>
                <Text style={styles.dateText}>{format(date, 'MMM d, EEE')}</Text>
                {isToday && <View style={styles.circle} />}
            </View>
            <TextInput style={styles.input} placeholder="0.00" keyboardType="decimal-pad" />
            <Text style={styles.amount}>$0.00</Text>
            <TextInput style={styles.workNotes} />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    dateCell: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        textAlign: 'left',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        marginLeft: 5,
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginLeft: 30,
        textAlign: 'center',
        marginHorizontal: 10,
        maxWidth: 60,
    },
    amount: {
        flex: 1,
        color: 'rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        marginHorizontal: 10,
        maxWidth: 70,
    },
    workNotes: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        textAlign: 'left',
        marginHorizontal: 10,
    },
});

export default TableRow;
