import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { registerUser } from '../../../services/authService';
import { RegisterRequestModel } from '../../../models/requestModels/user/registerModel';

type RootStackParamList = {
  Login: any;
  Register: any;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
};

const RegisterScreen: FC<Props> = ({ navigation }) => {
  const [registerRequestModel, setRegisterRequestModel] = useState<RegisterRequestModel>(new RegisterRequestModel());

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordAgainVisible, setIsPasswordAgainVisible] = useState<boolean>(false);

  const handleRegisterRequestModelChanges = (value: string, type: string) => {
    switch (type){
      case 'password':
        registerRequestModel.password = value;
        break;
      case 'passwordAgn':
        registerRequestModel.passwordAgn = value;
        break;
      case 'phoneNumber':
        registerRequestModel.phoneNumber = value;
        break;
      case 'email':
        registerRequestModel.email = value;
        break;
      case 'name':
        registerRequestModel.name = value;
        break;
      case 'surname':
        registerRequestModel.surname = value;
        break;
      default:
        setRegisterRequestModel(registerRequestModel);
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordAgainVisibility = () => {
    setIsPasswordAgainVisible(!isPasswordAgainVisible);
  };


  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor');
    }
    else {
      const registerUserResponse = await registerUser(registerRequestModel);
      if (!registerUserResponse.succeeded){
        Alert.alert(registerUserResponse.err.title, registerUserResponse.err.message);
      }
      else{
        Alert.alert("İşlem Başarılı", "Lütfen giriş yapın");
        navigation.navigate('Login');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Kayıt Ol</Text>
        
        <View style={styles.flexInput}>
            <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="İsim"
            value={firstName}
            onChangeText={(text) => { handleRegisterRequestModelChanges(text, 'name') }}
            placeholderTextColor="#999"
            />
            
            <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Soyisim"
            value={lastName}
            onChangeText={(text) => { handleRegisterRequestModelChanges(text, 'surname') }}
            placeholderTextColor="#999"
            />
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Telefon Numarası"
          value={phone}
          onChangeText={(text) => { handleRegisterRequestModelChanges(text, 'phoneNumber') }}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={(text) => { handleRegisterRequestModelChanges(text, 'email') }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Şifre"
            value={password}
            onChangeText={(text) => { handleRegisterRequestModelChanges(text, 'password') }}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#3396ff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.passwordContainer}>
            <TextInput
            style={styles.passwordInput}
            placeholder="Şifreyi Tekrar Girin"
            value={confirmPassword}
            onChangeText={(text) => { handleRegisterRequestModelChanges(text, 'passwordAgn') }}
            secureTextEntry={!isPasswordAgainVisible}
            placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={togglePasswordAgainVisibility} style={styles.eyeIcon}>
                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#3396ff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Zaten bir hesabın var mı? Giriş yap</Text>
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
    backgroundColor: '#FFF',
  },
  flexInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3396ff',
    marginBottom: 40,
    textAlign: 'center',
  },
  halfInput: {
    width: '48%',
  },
  input: {
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
  eyeIcon: {
    marginLeft: -40,
    padding: 10,
    marginBottom: 15
  },
  registerButton: {
    height: 50,
    backgroundColor: '#3396ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RegisterScreen;
