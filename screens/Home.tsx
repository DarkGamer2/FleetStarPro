import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {onAuthStateChanged, User} from 'firebase/auth';
import {app_auth} from '../FirebaseConfig';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const HomeScreen = () => {
  const auth = app_auth;
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log(user);
    });
  }, [auth]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg',
            }} // Replace with actual user image URL
            style={styles.profileImage}
          />
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Hello!</Text>
            <Text style={styles.userName}>{user?.email}</Text>
            <Text style={styles.vehicleInfo}>Manager</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="truck" size={40} color="#4F8EF7" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Trucks</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="account" size={40} color="#4F8EF7" />
            <Text style={styles.statNumber}>08</Text>
            <Text style={styles.statLabel}>Drivers</Text>
          </View>
        </View>
        <View style={styles.companyInfo}>
          <MaterialCommunityIcons
            name="office-building"
            size={50}
            color="#4F8EF7"
          />
          <Text style={styles.companyName}>EuroCorp Logistics</Text>
          <Text style={styles.missionStatement}>
            Our mission is to provide the best transportation solutions.
          </Text>
          <MaterialCommunityIcons name="email" size={30} color="#4F8EF7" />
          <Text style={styles.contactInfo}>
            Contact us: eurocorp@logistics.com
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    color: '#888',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  vehicleInfo: {
    fontSize: 16,
    color: '#888',
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
    color: '#888',
  },
  companyInfo: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  missionStatement: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 16,
    color: '#555',
  },
});
