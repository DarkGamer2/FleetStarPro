import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import NewTrucks from '../data/NewTrucks.json';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../theme/ThemeContext';
import Colors from '../theme/Colors';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
type ThemeType = keyof typeof Colors;

type Props = {
  navigation: NavigationProp<ParamListBase>;
};
const Catalog = ({navigation}: Props) => {
  const {theme} = useTheme();

  const styles = styling(theme);
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default Catalog;

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
    brandtext: {
      fontSize: 13,
      marginBottom: 10,
      color: Colors[theme]?.textColor,
      fontFamily: 'Inter-Regular',
    },
    modeltext: {
      fontSize: 10,
      marginBottom: 10,
      color: Colors[theme]?.textColor,
      fontFamily: 'Lato-Regular',
    },
    sectionHeader: {
      textAlign: 'center',
      color: Colors[theme]?.textColor,
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
