import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {app_auth} from '../FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
const CreateAccount = ({navigation}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const auth = app_auth;

  const createAccount = async () => {
    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '80%', maxWidth: 400}}>
        <Text style={styles.appTitle}>Create Account</Text>
        <View>
          <Text style={styles.formLabel}>First Name: </Text>
          <TextInput
            style={styles.formInput}
            placeholder="First Name"
            value={firstName}
            onChangeText={newFirstName => setFirstName(newFirstName)}
          />
          <Text style={styles.formLabel}>Last Name: </Text>
          <TextInput
            style={styles.formInput}
            placeholder="Last Name"
            value={lastName}
            onChangeText={newLastName => setLastName(newLastName)}
          />
          <Text style={styles.formLabel}>Email: </Text>
          <TextInput
            style={styles.formInput}
            placeholder="Email"
            value={email}
            onChangeText={newEmail => setEmail(newEmail)}
          />
          <Text style={styles.formLabel}>Password: </Text>
          <TextInput
            style={styles.formInput}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={newPassword => setPassword(newPassword)}
          />
          <Text style={styles.formLabel}>Company Name</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Company Name"
            value={companyName}
            onChangeText={newCompanyName => setCompanyName(newCompanyName)}
          />
          <View>
            <Pressable style={styles.button} onPress={createAccount}>
              {loading ? (
                <Text style={styles.buttonText}>
                  <ActivityIndicator /> Creating Account...
                </Text>
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Go Back</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
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
