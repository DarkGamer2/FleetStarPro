import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {auth} from '../FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useTheme} from '../theme/ThemeContext';
import Colors from '../theme/Colors';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
type ThemeType = keyof typeof Colors;

type Props = {
  navigation: NavigationProp<ParamListBase>;
};
const CreateAccount = ({navigation}: Props) => {
  const {theme} = useTheme();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const authenticator = auth;

  const createAccount = async () => {
    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        authenticator,
        email,
        password,
      );
      console.log(response);
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = styling(theme);
  return (
    <View style={styles.topView}>
      <View style={styles.bottomView}>
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

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    appTitle: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
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
    button: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Inter-Regular',
      color: Colors[theme]?.textColor,
    },
    topView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    bottomView: {width: '80%', maxWidth: 400},
  });
