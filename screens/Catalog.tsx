import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import NewTrucks from '../data/NewTrucks.json';
const Catalog = ({navigation}) => {
  return (
    <View>
      <Text style={styles.appTitle}>Catalog</Text>
      <View>
        <FlatList
          data={NewTrucks}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Image
                source={{uri: item.image}}
                style={styles.image}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.brandtext}>{item.brand}</Text>
                <Text style={styles.modeltext}>{item.model}</Text>
              </View>
              <Pressable
                style={styles.viewDetailsButton}
                onPress={() => navigation.navigate('Details', {truck: item})}>
                <Text style={styles.viewDetailsText}>Details</Text>
              </Pressable>
            </View>
          )}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default Catalog;

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
    height: 150, // Adjust height as needed
    marginBottom: 10,
    borderRadius: 10,
  },
  brandtext: {
    fontSize: 13,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
  },
  modeltext: {
    fontSize: 10,
    marginBottom: 10,
    fontFamily: 'Lato-Regular',
  },
  sectionHeader: {
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
  },
  viewDetailsButton: {
    backgroundColor: '#ff1100',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDetailsText: {
    color: 'white',
  },
});
