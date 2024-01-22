import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type RadioType = {
    value: string,
    label: string
}
function activeColor(value: string) {
   return styles[value];
}
const RadioGroup = () => {
  const [plan, setPlan] = useState('startup');

  const RadioButton = ({value, label}: RadioType) => {
    return (
        <TouchableOpacity
        style={[styles.option, plan === value && activeColor(value)]}
        onPress={() => setPlan(value)}
      >
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.RadioGroup}>
      <Text style={styles.label}>Type</Text>
      <RadioButton value="todo" label="To Do" />
      <RadioButton value="inprogress" label="In Progress" />
      <RadioButton value="done" label="Done" />
    </View>
  );
};

const styles = StyleSheet.create({
    label: {
      fontWeight: 'bold',
      marginBottom: 10,
    },
    option: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fef8fa',
      borderRadius: 5,
      marginBottom: 10,
    },
    selectedOption: {
      backgroundColor: '#F0C756',
    },
    RadioGroup: {
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
    },
    todo: {
        backgroundColor: '#F47B78',
    },
    inprogress: {
        backgroundColor: '#F0C756',
    },
    done: { 
        backgroundColor: '#6FD48A',
    }
  });

export default RadioGroup;