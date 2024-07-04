import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Details = ({route}) => {
  const {truck} = route.params;
  return (
    <View>
      <Text>Details</Text>
      <View>
        <Image
          source={{uri: truck.image}}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          {truck.brand}
          {truck.model}
        </Text>
        <Text style={styles.detail}>Year: {truck.year}</Text>
        <Text style={styles.detail}>Color: {truck.color}</Text>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
});
