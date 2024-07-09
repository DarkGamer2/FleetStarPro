import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const Details = ({route, navigation}) => {
  const {truck} = route.params;
  const [displayedItem, setDisplayedItem] = useState(truck.image);

  const renderImage = ({item}) => (
    <Pressable onPress={() => setDisplayedItem(item)}>
      <Image source={{uri: item}} style={styles.gridImage} />
    </Pressable>
  );

  const handleRequestQuote = () => {
    if (truck.requestlink) {
      console.log(`Navigating to: ${truck.requestlink}`);
      if (truck.requestlink.startsWith('http')) {
        Linking.openURL(truck.requestlink).catch(err =>
          console.error("Couldn't load page", err),
        );
      } else {
        navigation.navigate(truck.requestlink);
      }
    } else {
      console.log('No request link available for this truck.');
      Alert('Request link not available.');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.appTitle}>Details</Text>
        <Image
          source={{uri: displayedItem}}
          style={styles.image}
          resizeMode="contain"
        />
        <FlatList
          data={truck.images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderImage}
          horizontal
          contentContainerStyle={styles.gridContainer}
        />
        <View style={styles.row}>
          <Text style={styles.title}>Brand: {truck.brand}</Text>
          <Text style={styles.title}>Model: {truck.model}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detail}>Year: {truck.year}</Text>
          <Text style={styles.detail}>Color: {truck.color}</Text>
        </View>
        <Pressable style={styles.quoteButton} onPress={handleRequestQuote}>
          <Text style={styles.buttonText}>Request Quote</Text>
        </Pressable>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('FleetStar Pro')}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10, // Reduced marginBottom
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    marginBottom: 5, // Adjusted marginBottom for tighter spacing
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  quoteButton: {
    backgroundColor: '#037ffc',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#ff1100',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  gridContainer: {
    marginBottom: 10, // Reduced marginBottom
    flexDirection: 'row',
  },
  gridImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 80, // Adjusted marginBottom for tighter spacing
  },
});
