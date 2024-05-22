import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { format, addDays, parse, isToday as checkIsToday, startOfDay } from 'date-fns';
import TableRow from './components/TableRow';
interface AppProps {
  initialStartDate?: Date;
}

const generateDates = (startDate: Date): Date[] => {
  return Array.from({ length: 14 }).map((_, index) => addDays(startDate, index));
};

const getInitialStartDate = (initialStartDate?: Date): Date => {
  const today = startOfDay(new Date());
  const initialDate = initialStartDate ?? parse('2024-05-12', 'yyyy-MM-dd', new Date());

  if (today >= initialDate && today <= addDays(initialDate, 13)) {
    return initialDate;
  }

  const diffInDays = Math.floor((today.getTime() - initialDate.getTime()) / (1000 * 60 * 60 * 24));
  const newStartDate = addDays(initialDate, Math.floor(diffInDays / 14) * 14);

  return newStartDate;
};

const App: React.FC<AppProps> = ({ initialStartDate }) => {
  const startDate = getInitialStartDate(initialStartDate);
  const dates = generateDates(startDate);

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
          <TableRow key={index} date={date} isToday={checkIsToday(date)} />
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
    justifyContent: 'center',
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
});

export default App;
