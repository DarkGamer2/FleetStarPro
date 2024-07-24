import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Colors from '../theme/Colors';
import {useTheme} from '../theme/ThemeContext';
import {getDatabase, ref, push, serverTimestamp} from 'firebase/database';
import {app} from '../FirebaseConfig';
type ThemeType = keyof typeof Colors;

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

// type truckInfo = {
//   brand: string;
//   model: string;
//   year: number;
//   color: string;
// };

const AddTruckDetails = ({navigation}: Props) => {
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {theme} = useTheme();

  const styles = styling(theme);

  const handleAddTruck = () => {
    setLoading(true);
    const db = getDatabase(app);
    const ownedtruckInfoRef = ref(db, 'ownedTrucks');
    push(ownedtruckInfoRef, {
      brand,
      model,
      year,
      color,
      image,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        console.log('Data posted successfully!');
        setLoading(false);
        navigation.navigate('FleetStar Pro');
      })
      .catch(error => {
        console.error('Error posting data: ', error);
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.appTitle}>Add Truck</Text>
      </View>
      <View>
        <Text style={styles.formLabel}>Brand: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Brand"
          onChangeText={truckBrand => setBrand(truckBrand)}
        />
        <Text style={styles.formLabel}>Model: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Model"
          onChangeText={truckModel => setModel(truckModel)}
        />
        <Text style={styles.formLabel}>Year: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Year"
          onChangeText={truckYear => setYear(truckYear)}
        />
        <Text style={styles.formLabel}>Color: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Color"
          onChangeText={truckColor => setColor(truckColor)}
        />
        <Text style={styles.formLabel}>Image: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Image URL"
          onChangeText={imageURL => setImage(imageURL)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.addButton} onPress={handleAddTruck}>
          {loading ? (
            <Text style={styles.addButtonText}>
              <ActivityIndicator
                color={Colors[theme as ThemeType]?.textColor}
              />{' '}
              Adding Truck...
            </Text>
          ) : (
            <Text style={styles.addButtonText}>Add Truck</Text>
          )}
        </Pressable>
        <View>
          <Pressable
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTruckDetails;

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    appTitle: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
      color: Colors[theme]?.textColor,
    },
    formLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      fontFamily: 'Lato-Regular',
      color: Colors[theme]?.textColor,
      textAlign: 'center',
    },
    formInput: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      margin: 10,
      width: '80%',
      color: Colors[theme]?.textColor,
    },
    buttonContainer: {
      marginBottom: 10,
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      width: 200,
      marginBottom: 10,
    },
    addButtonText: {
      fontWeight: 'bold',
      color: Colors[theme]?.textColor,
      textAlign: 'center',
    },
    cancelButton: {
      backgroundColor: 'red',
      padding: 10,
      width: 200,
      borderRadius: 5,
    },
    cancelButtonText: {
      fontWeight: 'bold',
      color: Colors[theme]?.textColor,
      textAlign: 'center',
    },
  });
