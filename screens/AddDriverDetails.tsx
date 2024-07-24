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

const AddDriverDetails = ({navigation}: Props) => {
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [addressLine2, setAddressLine2] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {theme} = useTheme();

  const styles = styling(theme);

  const handleAddTruck = () => {
    setLoading(true);
    const db = getDatabase(app);
    const ownedtruckInfoRef = ref(db, 'hiredDrivers');
    push(ownedtruckInfoRef, {
      fullName,
      age,
      addressLine1,
      addressLine2,
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
        <Text style={styles.appTitle}>Add Driver</Text>
      </View>
      <View>
        <Text style={styles.formLabel}>Full Name: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Full Name"
          onChangeText={name => setFullName(name)}
        />
        <Text style={styles.formLabel}>Age: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Age"
          onChangeText={driverAge => setAge(driverAge)}
        />
        <Text style={styles.formLabel}>Address Line 1: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Address Line 1"
          onChangeText={address1 => setAddressLine1(address1)}
        />
        <Text style={styles.formLabel}>Address Line 2: </Text>
        <TextInput
          style={styles.formInput}
          placeholder="Enter Address Line 2"
          onChangeText={address2 => setAddressLine2(address2)}
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
              Adding Driver...
            </Text>
          ) : (
            <Text style={styles.addButtonText}>Add Driver</Text>
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

export default AddDriverDetails;

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
