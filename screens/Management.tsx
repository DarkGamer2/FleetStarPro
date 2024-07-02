import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import Trucks from '../data/Trucks.json';
import Drivers from '../data/Drivers.json';
const Management = () => {
  return (
    <View>
      <Text style={styles.appTitle}>Management</Text>
      <Text style={styles.sectionHeader}>Your Trucks</Text>
      <View>
        <FlatList
          data={Trucks}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Image
                source={{uri: item.image}}
                style={{width: 200, height: 100}}
                resizeMode="contain"
              />
              <Text style={styles.text}>
                {item.brand} {item.model}
              </Text>
            </View>
          )}
          numColumns={3}
        />
      </View>
      <View>
        <Text style={styles.sectionHeader}>Your Drivers</Text>
        <View>
          <FlatList
            data={Drivers}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Image
                  source={{uri: item.image}}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.text}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Management;

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 20,

    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  flatlist: {
    alignItems: 'center',
  },
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#ffff',
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '90%',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 200, // Adjust height as needed
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionHeader: {
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
   
  },
});