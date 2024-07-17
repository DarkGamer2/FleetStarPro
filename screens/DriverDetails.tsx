import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '../theme/ThemeContext';
import Colors from '../theme/Colors';
type ThemeType = keyof typeof Colors;
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

type Driver = {
  name: string;
  age: number;
  address: {
    street: string;
  };
  image: string;
  images: string[];
};

type RouteParams = {
  DriverDetails: {
    driver: Driver;
  };
};
type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<RouteParams, 'DriverDetails'>;
};
const DriverDetails = ({route, navigation}: Props) => {
  const {theme} = useTheme();
  const {driver} = route.params;
  const [displayedItem, setDisplayedItem] = useState(driver.image);
  const [isDriverOnJob, setIsDriverOnJob] = useState<boolean>(false);

  const renderImage = ({item}: {item: string}) => (
    <Pressable onPress={() => setDisplayedItem(item)}>
      <Image source={{uri: item}} style={styles.gridImage} />
    </Pressable>
  );

  const styles = styling(theme);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>Details</Text>
      <Image
        source={{uri: displayedItem}}
        style={styles.image}
        resizeMode="contain"
      />
      <FlatList
        data={driver.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderImage}
        horizontal
        contentContainerStyle={styles.gridContainer}
      />
      <View style={styles.row}>
        <Text style={styles.title}>Name: {driver.name}</Text>
        <Text style={styles.title}>Age: {driver.age}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.detail}>Street: {driver.address.street}</Text>
        <Text>
          Job Status: {isDriverOnJob ? 'Currently On Job' : 'Driver Is Free'}
        </Text>
      </View>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('FleetStar Pro')}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default DriverDetails;

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    appTitle: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
      color: Colors[theme]?.textColor,
    },
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: Colors[theme]?.backgroundColor,
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
      color: Colors[theme]?.textColor,
    },
    detail: {
      fontSize: 16,
      marginBottom: 5,
      color: Colors[theme]?.textColor,
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
      color: Colors[theme]?.textColor,
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
