import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {onAuthStateChanged, User} from 'firebase/auth';
import {auth} from '../FirebaseConfig';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../theme/Colors';
import {useTheme} from '../theme/ThemeContext';
import Trucks from '../data/Trucks.json';
import Drivers from '../data/Drivers.json';
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

const HomeScreen = ({navigation}: Props) => {
  const {theme} = useTheme();
  const authenticator = auth;
  const [user, setUser] = useState<User | null>(null);
  const [companyDetails, setCompanyDetails] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    });

    fetch(
      'https://fleetstarpro-5e5f5-default-rtdb.firebaseio.com/companies.json',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data) {
          const companyArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setCompanyDetails(companyArray);
        }
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setIsLoaded(true); // still set to true to stop loading indicator
      });
  }, [authenticator]);

  const styles = styling(theme as ThemeType);

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg',
            }} // Replace with actual user image URL
            style={styles.profileImage}
          />
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Hello {user?.email}!</Text>
            <Text style={styles.vehicleInfo}>Manager</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="truck" size={40} color="#4F8EF7" />
            <Text style={styles.statNumber}>{Object.keys(Trucks).length}</Text>
            <Text style={styles.statLabel}>Trucks</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="account" size={40} color="#4F8EF7" />
            <Text style={styles.statNumber}>{Object.keys(Drivers).length}</Text>
            <Text style={styles.statLabel}>Drivers</Text>
          </View>
        </View>
        <View style={styles.companyInfo}>
          {isLoaded ? (
            companyDetails.map(company => (
              <View key={company.id} style={styles.companyDetails}>
                <MaterialCommunityIcons
                  name="office-building"
                  size={50}
                  color="#4F8EF7"
                />
                <Text style={styles.companyName}>{company.companyName}</Text>
                <Text style={styles.companyAddress}>
                  {company.companyAddress}
                </Text>
                <Text style={styles.missionStatement}>
                  Our mission is to provide the best transportation solutions.
                </Text>
                <MaterialCommunityIcons
                  name="email"
                  size={30}
                  color="#4F8EF7"
                />
                <Text style={styles.contactInfo}>
                  Contact us: {company.companyEmail}
                </Text>
              </View>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
        <View>
          <Pressable
            style={styles.addCompanyButton}
            onPress={() => navigation.navigate('Add Company')}>
            <Text style={styles.addCompanyButtonText}>Add Company</Text>
          </Pressable>
          <Pressable
            style={styles.viewAllCompaniesButton}
            onPress={() => navigation.navigate('All Companies')}>
            <Text style={styles.viewAllCompaniesButtonText}>
              View All Companies
            </Text>
          </Pressable>
          <Pressable
            style={styles.editCompanyButton}
            onPress={() => navigation.navigate('Manage Company')}>
            <Text style={styles.editCompanyButtonText}>
              Manage{' '}
              {companyDetails.map(company => {
                return company.companyName;
              })}
            </Text>
          </Pressable>
          {/* <Pressable
            style={styles.editCompanyButton}
            onPress={() => navigation.navigate('Edit Company')}>
            <Text style={styles.editCompanyButtonText}>Edit Company</Text>
          </Pressable> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors[theme]?.backgroundColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    welcomeTextContainer: {
      marginLeft: 20,
    },
    welcomeText: {
      fontSize: 18,
      color: Colors[theme]?.textColor,
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors[theme]?.textColor,
    },
    vehicleInfo: {
      fontSize: 16,
      color: Colors[theme]?.textColor,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
    },
    statBox: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FF0000',
    },
    statLabel: {
      fontSize: 16,
      color: Colors[theme]?.textColor,
    },
    companyInfo: {
      marginVertical: 20,
      padding: 20,
      borderRadius: 10,
      backgroundColor: Colors[theme]?.backgroundColor,
      alignItems: 'center',
    },
    companyDetails: {
      marginBottom: 20,
    },
    companyName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors[theme]?.textColor,
      marginBottom: 10,
    },
    companyAddress: {
      fontSize: 18,
      color: Colors[theme]?.textColor,
      marginBottom: 10,
    },
    missionStatement: {
      fontSize: 16,
      color: Colors[theme]?.textColor,
      textAlign: 'center',
      marginBottom: 10,
    },
    contactInfo: {
      fontSize: 16,
      color: Colors[theme]?.textColor,
    },
    safeView: {
      flex: 1,
    },
    addCompanyButton: {
      backgroundColor: '#4F8EF7',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addCompanyButtonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold',
    },
    editCompanyButton: {
      backgroundColor: '#FF0000',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    editCompanyButtonText: {
      fontSize: 18,
      color: Colors[theme]?.textColor,
      fontWeight: 'bold',
    },
    viewAllCompaniesButton: {
      backgroundColor: '#4F8EF7',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewAllCompaniesButtonText: {
      fontSize: 18,
      color: Colors[theme]?.textColor,
      fontWeight: 'bold',
    },
  });
