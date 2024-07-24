import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  ScrollView,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '../theme/ThemeContext';
import Colors from '../theme/Colors';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

type ThemeType = keyof typeof Colors;

type Props = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

type Truck = {
  brand: string;
  model: string;
  year: number;
  color: string;
  image: string;
};
const ManageCompany = ({navigation}: Props) => {
  const {theme} = useTheme();
  const [companyDetails, setCompanyDetails] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [truckCount, setTruckCount] = useState<any[]>([]);
  const [driverCount, setDriverCount] = useState<any[]>([]);
  const [isTruckModalVisible, setTruckModalVisible] = useState(false);
  const [isDriverModalVisible, setDriverModalVisible] = useState(false);

  useEffect(() => {
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

    fetch(
      'https://fleetstarpro-5e5f5-default-rtdb.firebaseio.com/ownedTrucks.json',
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
          const truckArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setTruckCount(truckArray);
        }
      });

    fetch(
      'https://fleetstarpro-5e5f5-default-rtdb.firebaseio.com/hiredDrivers.json',
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
          const driverArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setDriverCount(driverArray);
        }
      });
  }, []);

  const styles = styling(theme as ThemeType);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>Manage Company</Text>
      <ScrollView>
        <Text>Manage Company Information</Text>
        {isLoaded ? (
          companyDetails.map(company => (
            <View key={company.id}>
              <Text style={styles.companyInfoText}>
                Company Name: {company.companyName}
              </Text>
              <Text style={styles.companyInfoText}>
                Company Address: {company.companyAddress}
              </Text>
              <Text>Driver Count: </Text>
            </View>
          ))
        ) : (
          <ActivityIndicator size={'small'} />
        )}
        <Pressable
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Edit Company')}>
          <Text style={styles.cancelButtonText}>Edit Company Information</Text>
        </Pressable>
      </ScrollView>
      <View>
        <Text style={styles.sectionTitle}>Trucks</Text>
        <View>
          {isLoaded ? (
            <FlatList
              data={truckCount}
              renderItem={({item: truck}) => (
                <View>
                  <Image
                    source={{uri: truck.image}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <Text style={styles.companyInfoText}>
                    Brand: {truck.brand}
                  </Text>
                  <Text style={styles.companyInfoText}>
                    Model: {truck.model}
                  </Text>
                  <Text style={styles.companyInfoText}>Year: {truck.year}</Text>
                  <Text style={styles.companyInfoText}>
                    Color: {truck.color}
                  </Text>
                </View>
              )}
              numColumns={3}
            />
          ) : (
            <ActivityIndicator size={'small'} color={'red'} />
          )}
          <Pressable
            style={styles.addTruckButton}
            onPress={() => setTruckModalVisible(true)}>
            <Text style={styles.addTruckButtonText}>Add Truck</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={styles.sectionTitle}>Drivers</Text>
        {isLoaded ? (
          <FlatList
            data={driverCount}
            renderItem={({item: driver}) => (
              <View>
                <Image
                  source={{uri: driver.image}}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.companyInfoText}>
                  Name: {driver.fullName}
                </Text>
                <Text style={styles.companyInfoText}>Age: {driver.age}</Text>
                <Text style={styles.companyInfoText}>
                  Address Line 1: {driver.addressLine1}
                </Text>
                <Text style={styles.companyInfoText}>
                  Address Line 2: {driver.addressLine2}
                </Text>
              </View>
            )}
            numColumns={3}
          />
        ) : (
          <ActivityIndicator size={'small'} color={'red'} />
        )}
        <Pressable
          style={styles.addTruckButton}
          onPress={() => setDriverModalVisible(true)}>
          <Text style={styles.addTruckButtonText}>Add Driver</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={styles.cancelButton}
          onPress={() => navigation.navigate('FleetStar Pro')}>
          <Text style={styles.cancelButtonText}>Go Back</Text>
        </Pressable>
      </View>

      {/* Truck Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTruckModalVisible}
        onRequestClose={() => setTruckModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Truck</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setTruckModalVisible(false);
                navigation.navigate('Catalog');
              }}>
              <Text style={styles.modalButtonText}>Add New Truck</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setTruckModalVisible(false);
                navigation.navigate('Add Truck');
              }}>
              <Text style={styles.modalButtonText}>Add Truck Details</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setTruckModalVisible(false)}>
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Driver Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDriverModalVisible}
        onRequestClose={() => setDriverModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Driver</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setDriverModalVisible(false);
                navigation.navigate('Add Driver');
              }}>
              <Text style={styles.modalButtonText}>Add New Driver</Text>
            </Pressable>
            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setDriverModalVisible(false);
                navigation.navigate('Add Driver');
              }}>
              <Text style={styles.modalButtonText}>Add Driver Details</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setDriverModalVisible(false)}>
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ManageCompany;

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    appTitle: {
      fontSize: 20,
      color: Colors[theme]?.textColor,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
    },
    sectionTitle: {
      fontSize: 20,
      color: Colors[theme]?.textColor,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
    },
    container: {
      flex: 1,
    },
    cancelButton: {
      backgroundColor: 'red',
      padding: 10,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center', // Add this line
    },
    cancelButtonText: {
      fontWeight: 'bold',
      color: Colors[theme]?.textColor,
      textAlign: 'center',
    },
    companyInfoText: {
      color: Colors[theme]?.textColor,
      fontFamily: 'Lato-Regular',
      textAlign: 'center',
      marginBottom: 5,
    },
    truckText: {
      color: Colors[theme]?.textColor,
      fontFamily: 'Lato-Regular',
      textAlign: 'center',
      marginBottom: 5,
    },
    addTruckButton: {
      backgroundColor: '#007bff',
      padding: 10,
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center', // Add this line
    },
    addTruckButtonText: {
      fontWeight: 'bold',
      color: Colors[theme]?.textColor,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 15,
      textAlign: 'center',
    },
    modalButton: {
      backgroundColor: '#007bff',
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      width: '100%',
      alignItems: 'center',
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalCancelButton: {
      backgroundColor: 'red',
    },
    modalCancelButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      height: 150, // Adjust height as needed
      marginBottom: 10,
      borderRadius: 10,
    },
  });
