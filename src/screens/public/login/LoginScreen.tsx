import React, { FC, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { loginAsync } from '../../../services/authService';
import { useDispatch, useSelector } from "react-redux";
import { checkAuthToken } from '../../../redux/reducers/authReducer';
import { AppDispatch } from '../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: any;
  Register: any;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const LoginScreen: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    if (email && password) {
      const loginUserResponse = await loginAsync(email, password);
      if (!loginUserResponse.succeeded){
        Alert.alert(loginUserResponse.err.title, loginUserResponse.err.message);
      }
      else{
        dispatch(checkAuthToken());
      }
    } 
    else {
      Alert.alert('Hata', 'Lütfen e-posta ve şifre girin');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Giriş Yap</Text>
        
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder="Şifre"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#3396ff" />
            </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Henüz hesabın yok mu? Kayıt ol</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#3396ff'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#3396ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eyeIcon: {
    marginLeft: -40,
    padding: 10,
    marginBottom: 15
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
export default LoginScreen;
