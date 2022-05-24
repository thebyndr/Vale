import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth'
import Inputs from '../components/Inputs';
import Submit from '../components/Submit';
import Account from '../components/Account';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import {Touchable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';

import {API_URL} from '../config/system';
import axios from 'axios';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      hidePassword: true,
      text: '',
      onChangeText: '',
      number: null,
      onChangeNumber: null,
    };
  }

  // _handleSubmit = values => {
  //   axios.post(`${API_URL}/api/signin`, values)
  //     .then(res => {
  //       console.log(res);
  //       axios.get(`${API_URL}/api/current_user`, {
  //           headers: {authorization: res.data.data.token},
  //         })
  //         .then(res => {
  //           this.props.navigation.navigate('map');
  //         })
  //         .catch(e => {});
  //     })
      
  //     .catch(e => {
  //       if(e.response.data.code === 404) alert(e.response.data.message);
  //       console.log(e);
  //     });
  // };
 

  componentDidMount(){
  
  //   try{
  //     console.log('ahem')
  //     const {token} = this.props.route.params;
  //     console.log(token)
  //     if( this.props.route.params.token!=null){
  //        axios.get(`https://ieeevale.com/api/logout`,{
  //         headers:{
  //           'authorization':this.props.route.params.token
  //         }
  //       })
    
  //     .then(res =>{console.log(res)})
    
  //   }
    
  //     }
  //     catch(err){
  //   console.log(err)
  //     }
  // }
  // componentWillUnmount(){
  //   try{
  //     console.log('ahem')
  //     const {token} = this.props.route.params;
  //     console.log(token)
  //     if( this.props.route.params.token!=null){
  //        axios.get(`https://ieeevale.com/api/logout`,{
  //         headers:{
  //           'authorization':this.props.route.params.token
  //         }
  //       })
    
  //     .then(res =>{console.log(res)})
    
  //   }
    
  //     }
  //     catch(err){
  //   console.log(err)
  //     }
  }

  // _handleSubmit = values => {
  //   let token;
  //   axios.post(`${API_URL}/api/signin`, values)
  //     .then(res => {
  //       token = res.data.data.token;
  //       axios.get(`${API_URL}/api/current_user`,{
  //         headers:{
  //           'authorization':res.data.data.token
  //         }
  //         }).then(res => {
  //           // console.log(res.data.data)
  //           // console.log(res.data.data.reservation.state)
  //           if(res.data.data.reservation.state){ this.props.navigation.navigate('timer',{profile: res.data.data, token: token});}
  //           else this.props.navigation.navigate('map' ,{profile: res.data.data , token: token});

  //         })
  //       // console.log(res.data.data.token);
  //       // this.props.navigation.navigate('map' ,{profile: JSON.stringify(res.data.data.profile) , token: res.data.data.token});
  //     })
      
  //     .catch(e => {
  //       // if(e.response.data.code === 404) alert(e.response.data.message);
  //       alert(e.response.data.message);
  //       console.log(e);
  //     });
  // };

  render() {
  
   const checkRes=()=>{
     console.log(auth().currentUser)
    database()
    .ref('/Users'+'/'+auth().currentUser.uid)
    .on('value',snapshot => 
    {
     
if(snapshot.val().resStateUser==true){
  this.props.navigation.navigate('timer')
}
else  this.props.navigation.navigate('map');
})
     
    
   
   }
    const login =(values,{setSubmitting,resetForm})=>{
      // console.log(values)
  // setSubmitting(false)
  // resetForm({});
  
  try{
  auth().signInWithEmailAndPassword(values.email,values.password).then(() => {
  resetForm({})
  //Kullanıcı kayıt olduysa
  // database()
  // .ref('/Users'+'/'+auth().currentUser.uid)
  // .update({
  //   resStateUser:false
  // })
 checkRes()
  
  })
  .catch(error => {
    //Mail adresi kullanıldıysa
  if (error.code === 'auth/email-already-in-use') {
  alert('Daha önce kullanılmamış bir email giriniz')
  setSubmitting(false)
  }
  //mail geçerli değilse
  if (error.code === 'auth/invalid-email') {
   alert('Geçersiz Mail')
   setSubmitting(false)
  }
  if(error.code==='auth/weak-password'){
      alert('Şifre 6 karakterden daha uzun olmalı')
  }
  if(error.code==='auth/wrong-password'){
      alert('Hatalı Şifre')
  }
  if(error.code==='auth/user-not-found'){
  alert('Hatalı Mail')
  setSubmitting(false)
  }
  console.error(error);
  });
  
  }
  catch(e)
  {
  alert(e.message)
  }
  }
    return (
      <ScrollView style={{backgroundColor:'black'}}>
        <LinearGradient colors={['black','black']}style={styles.container}>
       
          <Image
            source={require('../assets/vale5.png')}
            resizeMode="center"
            style={styles.image}
          />

          <Text style={(styles.textBody, {color: 'white', fontSize: 25})}>
            Üye Girişi 
          </Text>
          <View style={{marginTop: 20}} />

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={login}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('*Lütfen Geçerli Bir Email Giriniz')
                .required('*Lütfen Mailiniz Giriniz.'),
              password: Yup.string().required('*Lütfen Şifrenizi Giriniz'),
            })}>
            {({values, handleSubmit, handleChange, errors}) => (
              <View>
                <View style={styles.item}>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder={'E-posta'}
                    style={styles.input}
                    keyboardType={'email-address'}></TextInput>

                  {errors.email && (
                    <Text style={{color: '#ab000d'}}> {errors.email} </Text>
                  )}
                </View>

                <View style={styles.icon}>
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-add' : 'mail-outline'}
                    //name={(this.state.hidePassword)?"eye-off-outlane:eye-outlane"}  şifre görünürlüğü açıp kapatma
                    color="#003e47"
                    size={30}
                  />
                </View>
                <View style={styles.item}>
                  <TextInput
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder={'Şifre'}
                    style={styles.input}
                    secureTextEntry={this.state.hidePassword}></TextInput>

                  <TouchableOpacity
                    onPress={() =>
                      this.setState({hidePassword: !this.state.hidePassword})
                    }
                    style={{position: 'absolute', right: 30, top:25}}>
                    <Icon
                      name={
                        this.state.hidePassword
                          ? 'eye-off-outline'
                          : 'eye-outline'
                      }
                      //name={(this.state.hidePassword)?"eye-off-outlane:eye-outlane"}  şifre görünürlüğü açıp kapatma
                      color="blue"
                      size={30}
                    />
                  </TouchableOpacity>
                  {errors.password && (
                    <Text style={{color: '#ab000d'}}> {errors.password} </Text>
                  )}
                </View>

                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}>
                    <Text style={{color: 'white',fontWeight:'700', fontSize: 20}}>Giriş</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    marginBottom: 20,
                    alignItems: 'center',
                    marginTop: 25,
                  }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('forgot')}>
                    <Text
                      style={{
                        color: '#c62828',
                        fontSize: 17,
                        fontWeight: '700',
                      }}>
                      Şifremi Unuttum
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>

          <Text style={styles.textBody}>Veya kullanarak bağlan</Text>
        
          <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={()=>alert("Facebook'la Bağlanıyorsunuz")} style={{position:'absolute',right:5,top:15}}>
          <Image
            source={require('../assets/face.png')}
            resizeMode="center"
            style={{marginTop:-5,width:85,height:65}}
          />
</TouchableOpacity>
<TouchableOpacity onPress={()=>alert("Google'la Bağlanıyorsunuz")} style={{position:'absolute',right:-85,top:15}}>
<Image
            source={require('../assets/google.png')}
            resizeMode="center"
            style={{width:75,height:55}}
          />
</TouchableOpacity>
          </View>
          
          <View style={{flexDirection: 'row', marginVertical: 5,marginTop:80}}>
            <Text style={styles.textBody}>Hesabın Yok mu ? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}>
             {/* #00c6ad */}
              <Text style={[styles.textBody, {color: '#006978'}]}>
                Hesap Oluştur
              </Text>
            </TouchableOpacity>
          </View>
        
        </LinearGradient>
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
  
    resizeMode: 'contain',
    width: '75%',
    height: 165,
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontSize: 40,
    marginVertical: 10,
  },
  textBody: {
    fontFamily: 'Foundation',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 15,
    color: 'white',
  },

  input: {
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 15,
    height: 55,
    width: 220,
    borderColor: 'gray',
    borderWidth: 1,
  },
  item: {marginBottom: 20, alignItems: 'center'},
  button: {
    backgroundColor: '#008ea3',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    width: 175,
  },
  icon: {position: 'absolute', right: 30, top: 25},
});
