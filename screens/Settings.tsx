import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {app_auth} from '../FirebaseConfig';
import {SafeAreaView} from 'react-native-safe-area-context';
const Settings = ({navigation}) => {
  const auth = app_auth;
  const [setting1, setSetting1] = useState<boolean>(false);

  const logOut = async () => {
    await auth.signOut().then(() => {
      navigation.navigate('Login');
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.appTitle}>Settings</Text>
        <View style={styles.separator} />
        <View style={styles.row}>
          <View style={styles.option}>
            <Text style={styles.text}>Dark Mode</Text>
            <Pressable>
              <MaterialCommunityIcons
                name={setting1 ? 'toggle-switch' : 'toggle-switch-off'}
                color={setting1 ? 'green' : 'grey'}
                size={30}
                onPress={() => setSetting1(!setting1)}
              />
            </Pressable>
          </View>
          <View style={styles.option}>
            <Text style={styles.text}>Font</Text>
            <MaterialCommunityIcons
              name={setting1 ? 'toggle-switch' : 'toggle-switch-off'}
              size={30}
              onPress={() => setSetting1(!setting1)}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.text}>Profile</Text>
            <MaterialCommunityIcons
              name={setting1 ? 'toggle-switch' : 'toggle-switch-off'}
              size={30}
              onPress={() => setSetting1(!setting1)}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.text}>Logout</Text>
            <Pressable onPress={logOut}>
              <Text>Logout</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'column', // Changed from 'row' to 'column' to stack options vertically
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});
