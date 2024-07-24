import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../theme/Colors';
import {useTheme} from '../theme/ThemeContext';
import {Image} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {auth} from '../FirebaseConfig';
type ThemeType = keyof typeof Colors;
import {User, onAuthStateChanged} from '@firebase/auth';
const Profile = ({navigation}: {navigation: NavigationProp<any, any>}) => {
  const authenticator = auth;
  const {theme} = useTheme();
  const styles = styling(theme as ThemeType);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
  }, [authenticator]);
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text style={styles.appTitle}>Profile</Text>
      </View>
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={{
            uri: 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg',
          }}
        />
      </View>
      <ScrollView>
        <Text style={styles.profileDetail}>Name: {user?.displayName}</Text>
        <Text style={styles.profileDetail}>Email: {user?.email}</Text>
        <Text style={styles.profileDetail}>Username: </Text>
        <View style={styles.profilePicContainer}>
          <Pressable style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View>
        <Text style={styles.appTitle}>Danger Zone</Text>
        <View style={styles.deleteButtonContainer}>
          <Pressable style={styles.deleteAccountButton}>
            <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    appTitle: {
      textAlign: 'center',
      fontFamily: 'Inter-Bold',
      color: Colors[theme]?.textColor,
      fontSize: 20,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors[theme]?.themeColor,
    },
    text: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
      color: Colors[theme]?.textColor,
    },
    safeView: {
      flex: 1,
    },
    profilePic: {
      borderRadius: 10,
      width: 200,
      height: 200,
      marginBottom: 20,
      borderColor: '#000000',
      borderWidth: 1,
    },
    profilePicContainer: {
      alignItems: 'center',
    },
    profileDetail: {
      color: Colors[theme]?.textColor,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Lato-Regular',
    },
    editButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      width: 200,
      marginBottom: 10,
    },
    editButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'Lato-Regular',
      textAlign: 'center',
    },
    backButton: {
      backgroundColor: '#4287f5',
      padding: 10,
      borderRadius: 5,
      width: 200,
    },
    backButtonText: {
      color: 'white',
      fontFamily: 'Lato-Regular',
      textAlign: 'center',
    },
    deleteAccountButton: {
      backgroundColor: '#f5409d',
      padding: 10,
      borderRadius: 5,
      width: 200,
      marginTop: 10,
    },
    deleteAccountButtonText: {
      color: Colors[theme]?.textColor,
      fontWeight: 'bold',
      textAlign: 'center',
      //   #f5409d
      //   #f218b8
    },
    deleteButtonContainer: {
      alignItems: 'center',
    },
  });
