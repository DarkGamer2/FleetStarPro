import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import Trucks from '../data/Trucks.json';
import Drivers from '../data/Drivers.json';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../theme/Colors';
import {useTheme} from '../theme/ThemeContext';
type ThemeType = keyof typeof Colors;
import {NavigationProp, ParamListBase} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};
const Management = ({navigation}: Props) => {
  const {theme} = useTheme();

  const styles = styling(theme);
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.appTitle}>Management</Text>
        <Text style={styles.sectionHeader}>Your Trucks</Text>
        <View>
          <FlatList
            data={Trucks}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Pressable
                  onPress={() => navigation.navigate('Details', {truck: item})}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </Pressable>
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
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Driver Details', {driver: item})
                    }>
                    <Image
                      source={{uri: item.image}}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </Pressable>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
              )}
              numColumns={3}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Management;

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    appTitle: {
      fontSize: 20,
      color: Colors[theme]?.textColor,
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
      backgroundColor: Colors[theme]?.backgroundColor,
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
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: Colors[theme]?.textColor,
    },
    sectionHeader: {
      textAlign: 'center',
      fontFamily: 'Lato-Regular',
      fontSize: 18,
      color: Colors[theme]?.textColor,
      marginBottom: 10,
    },
  });
