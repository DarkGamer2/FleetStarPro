import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import Colors from '../theme/Colors';
import React, {useState} from 'react';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {getDatabase, ref, push, serverTimestamp} from 'firebase/database';
import {app} from '../FirebaseConfig';

type ThemeType = keyof typeof Colors;
type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

const AddCompany = ({navigation}: Props) => {
  const [companyName, setCompanyName] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [companyEmail, setCompanyEmail] = useState<string>('');
  const [driversCount, setDriversCount] = useState<number>(0);
  const [vehiclesCount, setVehiclesCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const {theme} = useTheme();

  const addCompany = () => {
    setLoading(true);
    const db = getDatabase(app);
    const companyInfoRef = ref(db, 'companies');
    push(companyInfoRef, {
      companyName,
      companyAddress,
      companyEmail,
      driversCount,
      vehiclesCount,
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

    console.log('Company added');
  };

  const styles = styling(theme as ThemeType);

  return (
    <View style={styles.topView}>
      <View style={styles.bottomView}>
        <Text style={styles.appTitle}>Add Company</Text>
        <View>
          <Text style={styles.formLabel}>Company Name </Text>
          <TextInput
            style={styles.formInput}
            placeholder="Company Name"
            value={companyName}
            onChangeText={name => setCompanyName(name)}
          />
          <Text style={styles.formLabel}>Company Address: </Text>
          <TextInput
            style={styles.formInput}
            placeholder="Company Address"
            value={companyAddress}
            onChangeText={address => setCompanyAddress(address)}
          />
          <Text style={styles.formLabel}>Company Email: </Text>
          <TextInput
            style={styles.formInput}
            placeholder="Company Email"
            value={companyEmail}
            onChangeText={newEmail => setCompanyEmail(newEmail)}
          />
          <Text style={styles.formLabel}>Number Of Drivers: </Text>
          <TextInput
            style={styles.formInput}
            value={driversCount.toString()}
            onChangeText={drivers => setDriversCount(parseInt(drivers, 10))}
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>Number Of Vehicles</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Vehicle Number"
            value={vehiclesCount.toString()}
            onChangeText={number => setVehiclesCount(parseInt(number, 10))}
            keyboardType="numeric"
          />
          <View style={styles.addButtonContainer}>
            <Pressable style={styles.addCompanyButton} onPress={addCompany}>
              {loading ? (
                <Text style={styles.addCompanyButtonText}>
                  <ActivityIndicator
                    color={Colors[theme as ThemeType]?.textColor}
                  />{' '}
                  Adding Company...
                </Text>
              ) : (
                <Text style={styles.addCompanyButtonText}>Add Company</Text>
              )}
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => navigation.navigate('FleetStar Pro')}>
              <Text style={styles.cancelButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddCompany;

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors[theme]?.backgroundColor,
      flex: 1,
      width: '80%',
      maxWidth: 400,
    },
    appTitle: {
      fontSize: 20,
      color: Colors[theme]?.textColor,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
      marginBottom: 20,
    },
    safeView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
      width: '100%',
      color: Colors[theme]?.textColor,
    },
    addCompanyButton: {
      backgroundColor: 'red',
      padding: 10,
      width: 200,
      marginBottom: 10,
    },
    addCompanyButtonText: {
      fontWeight: 'bold',
      color: Colors[theme]?.textColor,
      textAlign: 'center',
    },
    addButtonContainer: {
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: 'red',
      padding: 10,
      width: 200,
    },
    cancelButtonText: {
      fontWeight: 'bold',
      color: Colors[theme]?.textColor,
      textAlign: 'center',
    },
    topView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    bottomView: {width: '80%', maxWidth: 400},
  });
