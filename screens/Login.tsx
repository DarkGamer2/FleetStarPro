import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import React from 'react';

const Login = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '80%', maxWidth: 400}}>
        <Text>Logo</Text>
        <Text style={styles.appTitle}>FleetStar Pro</Text>
        <View>
          <Text style={styles.formLabel}>Username: </Text>
          <TextInput placeholder="Username" style={styles.formInput} />
          <Text style={styles.formLabel}>Password: </Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.formInput}
          />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('BottomTab')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
