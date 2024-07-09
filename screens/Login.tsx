import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import React from 'react';
import {app_auth} from '../FirebaseConfig';
import {useState} from 'react';
import {signInWithEmailAndPassword} from '@firebase/auth';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = app_auth;
  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('FleetStar Pro');
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '80%', maxWidth: 400}}>
        <Text>Logo</Text>
        <Text style={styles.appTitle}>FleetStar Pro</Text>
        <View>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.formLabel}>Email: </Text>
            <TextInput
              value={email}
              placeholder="Email"
              style={styles.formInput}
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.formLabel}>Password: </Text>
            <TextInput
              secureTextEntry={true}
              value={password}
              placeholder="Password"
              style={styles.formInput}
              onChangeText={text => setPassword(text)}
            />
            <Pressable style={styles.button} onPress={handleLogin}>
              {loading ? (
                <Text style={styles.buttonText}>
                  <ActivityIndicator size={'small'} color={'white'} /> Signing
                  In...
                </Text>
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Create Account')}>
              <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>
          </KeyboardAvoidingView>
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
