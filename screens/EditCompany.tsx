import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../theme/Colors';
import {useTheme} from '../theme/ThemeContext';
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
const EditCompany = ({navigation}: Props) => {
  const {theme} = useTheme();
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [driversCount, setDriversCount] = useState('');
  const [vehiclesCount, setVehiclesCount] = useState('');
  const styles = styling(theme as ThemeType);

  const updateCompanyInfo = async () => {
    const companyInfo = {
      companyName,
      companyAddress,
      companyEmail,
      driversCount: parseInt(driversCount),
      vehiclesCount: parseInt(vehiclesCount),
    };
    await fetch(
      'https://fleetstarpro-5e5f5-default-rtdb.firebaseio.com/companies.json',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyInfo),
      },
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>Edit Company</Text>
      <ScrollView>
        <Text>Edit Company Information</Text>
        <View>
          <Text style={styles.formLabel}>Company Name </Text>
          <TextInput
            style={styles.formInput}
            placeholder="Company Name"
            onChangeText={name => setCompanyName(name)}
          />
          <Text style={styles.formLabel}>Company Address</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Company Address"
            onChangeText={address => setCompanyAddress(address)}
          />
          <Text style={styles.formLabel}>Company Email</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Company Email"
            onChangeText={email => setCompanyEmail(email)}
          />
          <Text style={styles.formLabel}>Number Of Drivers</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Number of Drivers"
            keyboardType="numeric"
            onChangeText={driverNum => setDriversCount(driverNum)}
          />
          <Text style={styles.formLabel}>Number Of Vehicles</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Number of Vehicles"
            keyboardType="numeric"
            onChangeText={vehicleNum => setVehiclesCount(vehicleNum)}
          />
        </View>
        <View>
          <Pressable
            style={styles.backButton}
            onPress={() => updateCompanyInfo}>
            <Text style={styles.goBackButtonText}>
              Update Company Information
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Manage Company')}
            style={styles.backButton}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditCompany;

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    appTitle: {
      fontSize: 20,
      color: Colors[theme]?.textColor,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
    },
    container: {
      flex: 1,
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
    goBackButtonText: {
      color: Colors[theme]?.textColor,
    },
    formLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      fontFamily: 'Lato-Regular',
      color: Colors[theme]?.textColor,
    },
    formInput: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      marginBottom: 10,
      width: '100%',
      color: Colors[theme]?.textColor,
    },
  });
