import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { format, addDays, parse } from 'date-fns';

const startDate = parse('2024-05-12', 'yyyy-MM-dd', new Date());
const dates = Array.from({ length: 14 }).map((_, index) => addDays(startDate, index));
const today = parse('2024-05-20', 'yyyy-MM-dd', new Date());

const TableRow: React.FC<{ date: Date; isToday: boolean }> = ({ date, isToday }) => {
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

const App: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.dateHeader]}>Date</Text>
          <Text style={[styles.headerText, styles.hoursHeader]}>Hours (Decimal)</Text>
          <Text style={[styles.headerText, styles.amountHeader]}>Amount</Text>
          <Text style={[styles.headerText, styles.notesHeader]}>Work Notes</Text>
        </View>
        {dates.map((date, index) => (
          <TableRow key={index} date={date} isToday={format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  },

  table: {
    minWidth: '70%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
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


  dateHeader: {
    textAlign: 'left',
    paddingLeft: 10,
    flex: 2,
  },
  hoursHeader: {
    textAlign: 'center',
    paddingRight: 10,
    flex: 1.1,
  },
  amountHeader: {
    textAlign: 'center',
    flex: 1,
  },
  notesHeader: {
    textAlign: 'center',
    flex: 7,
  },


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

export default App;
