import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View>
      <Text style={styles.welcomeText}>Welcome User</Text>
      <Text style={styles.catalogText}>Vehicle Catalog</Text>
      <View></View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'green',
  },
  catalogText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'blue',
  },
});
