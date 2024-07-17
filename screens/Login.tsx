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
import React, {useState} from 'react';
import {signInWithEmailAndPassword} from '@firebase/auth';
import {useTheme} from '../theme/ThemeContext';
import Colors from '../theme/Colors';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {app_auth} from '../FirebaseConfig';

type ThemeType = keyof typeof Colors;
type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Login = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {theme} = useTheme();

  const handleLogin = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(app_auth, email, password);
      navigation.navigate('FleetStar Pro');
    } catch (error) {
      Alert.alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const styles = styling(theme);
  return (
    <View style={styles.topView}>
      <View style={styles.bottomView}>
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

const styling = (theme: ThemeType) =>
  StyleSheet.create({
    appTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily: 'Inter-Regular',
      color: Colors[theme]?.textColor,
      textAlign: 'center',
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
      color: Colors[theme]?.textColor,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    topView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    bottomView: {width: '80%', maxWidth: 400},
  });
