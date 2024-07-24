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
import {useTheme} from '../theme/ThemeContext';
import Colors from '../theme/Colors';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
type ThemeType = keyof typeof Colors;

type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

type DriverType = {
  name: string;
  age: string;
  year: number;
  address: Object;
  state: string;
  image: string;
  requestlink?: string;
};
const RecruitmentDetails = ({route, navigation}: Props) => {
  const {driver} = route.params as {driver: DriverType};
  const [displayedItem, setDisplayedItem] = useState(driver.image);

  const {theme} = useTheme();
  const renderImage = ({item}: {item: string}) => (
    <Pressable onPress={() => setDisplayedItem(item)}>
      <Image source={{uri: item}} style={styles.gridImage} />
    </Pressable>
  );

  const handleRequestQuote = () => {
    if (driver.requestlink) {
      console.log(`Navigating to: ${driver.requestlink}`);
      if (driver.requestlink.startsWith('http')) {
        Linking.openURL(driver.requestlink).catch(err =>
          console.error("Couldn't load page", err),
        );
      } else {
        navigation.navigate(driver.requestlink);
      }
    } else {
      console.log('No request link available for this truck.');
      Alert.alert('Request link not available.');
    }
  };

  // const handlePurchaseVehicle = () => {
  //   Alert.alert('Purchase Vehicle', 'Coming soon!');
  // };
  const styles = styling(theme);
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
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
          <Text style={styles.detail}>Year: {driver.year}</Text>
          <Text style={styles.detail}>State: {driver.address.state}</Text>
        </View>
        <Pressable style={styles.quoteButton} onPress={handleRequestQuote}>
          <Text style={styles.buttonText}>Hire Driver</Text>
        </Pressable>
        {/* <Pressable
            style={styles.purchaseButton}
            onPress={handlePurchaseVehicle}>
            <Text style={styles.purchaseButtonText}>Purchase Vehicle</Text>
          </Pressable> */}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('FleetStar Pro')}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RecruitmentDetails;

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
      color: Colors[theme]?.textColor,
      marginBottom: 5, // Adjusted marginBottom for tighter spacing
    },
    detail: {
      fontSize: 16,
      color: Colors[theme]?.textColor,
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
    safeView: {
      flex: 1,
    },
    // purchaseButton: {
    //   backgroundColor: '#4F8EF7',
    //   padding: 10,
    //   borderRadius: 5,
    //   marginBottom: 10,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // purchaseButtonText: {
    //   fontSize: 18,
    //   color: Colors[theme]?.textColor,
    // },
  });
