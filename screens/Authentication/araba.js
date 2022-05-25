import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/Inputs';
import Submit from '../components/Submit';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {observable, values} from 'mobx';
import {observer, inject} from 'mobx-react';
import {API_URL} from '../config/system';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';

// import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
// const siteKey = 'AIzaSyAaUHSs3RnNqnjURZMpCAIOBD4oHrcTNh4';
// const baseUrl = 'base_url';

export default class Araba extends Component {
  constructor() {
    super();
    this.state = {
      cars: 'seçiniz',
      yakit: 'seçiniz',
      plaka:'00'
    };
  }

 
  
  render() {
    const {isim, mail, sifre, tell} = this.props.route.params;

    const infos=()=>{
      database()
      .ref('/Users'+'/'+auth().currentUser.uid)
      .update({
        resStateUser:false,
        UserAd:isim,
        UserMail:mail,
        UserPass:sifre,
        UserTel:tell,
        UserVehicleType:this.state.cars,
        UserYakit:this.state.yakit,
        UserPlaka:this.state.plaka
        
      })
    }
    const register =(values,{setSubmitting,resetForm})=>{
      console.log(values)
// setSubmitting(false)
// resetForm({});

try{
auth().createUserWithEmailAndPassword(values.email,values.password).then(() => {
resetForm({})
  //Kullanıcı kayıt olduysa
 infos()
 this.props.navigation.navigate('map')
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

  console.error(error);
});

}
catch(e)
{
  alert(e.message)
}
  }
  
//  onMessage = event => {
//          if (event && event.nativeEvent.data) {
//             if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
//                 this.captchaForm.hide();
//                 return;
//             } else {
//                 console.log('Verified code from Google', event.nativeEvent.data);
//                 setTimeout(() => {
//                     this.captchaForm.hide();
//                     // do what ever you want here
//                 }, 1500);
//             }
//         }
//     };
    return (
  
      <ScrollView style={{backgroundColor: '#d7ccc8'}}>
           <LinearGradient colors={['#a69b97','#d7ccc8' ]} style={{flex:1}}>
        {/* <ConfirmGoogleCaptcha
                    ref={_ref => this.captchaForm = _ref}
                    siteKey={siteKey}
                    
                    languageCode='en'
                    onMessage={this.onMessage}
                /> */}
        <View style={styles.container}>
        {
          //Telefon NUMARASI
        /* <TouchableOpacity onPress={()=>alert(tell)} style={{position:'absolute',right:355,top:85}}>
    <Icon  name={Platform.OS === "ios" ? "ios-add" : "arrow-back-circle-outline"}
  //name={(this.state.hidePassword)?"eye-off-outlane:eye-outlane"}  şifre görünürlüğü açıp kapatma
  color="black"
  size={55}/>
</TouchableOpacity> */
}
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')} style={{position:'absolute',right:'85%',top:'0%'}}>
    <Icon  name={Platform.OS === "ios" ? "ios-add" : "arrow-back-circle-outline"}
  //name={(this.state.hidePassword)?"eye-off-outlane:eye-outlane"}  şifre görünürlüğü açıp kapatma
  color="#8c0032"
  size={55}/>
</TouchableOpacity> 
          <Image
            source={require('../assets/car5.png')}
            resizeMode="center"
            style={styles.image}
          />
          
          <Text style={{ marginBottom:25, fontSize: 35,
    fontFamily: 'Foundation',
    color:'#bc477b'}}>Aracınızın</Text>

          <Formik
            initialValues={{
              name: isim,
              email: mail,
              phoneNumber: tell,
              password: sifre,
              licensePlate: '',
              vehicleType: '',
              fuelType: '',
            }}
          onSubmit={register}
            validationSchema={Yup.object().shape({
              licensePlate: Yup.string().required(
                '*Lütfen Plakanızı Giriniz.',
              ),
            })}>
             
            {({values, handleSubmit, handleChange, errors, touched}) => (
             
             <View>
                <View style={styles.item}>
                  <View style={{position: 'absolute', right: 285, top: 25}}>
                    <Icon
                      name={
                        Platform.OS === 'ios' ? 'ios-add' : 'car-sport-outline'
                      }
                      color="#8c0032"
                      size={35}
                    />
                  </View>
                  <TextInput
                    value={values.licensePlate}
                    onChangeText={handleChange('licensePlate')}
                    placeholder={'P l a k a s ı'}
                    alignItems="center"
                    style={styles.input}></TextInput>
                   

                  {errors.licensePlate && touched.licensePlate && (
                    <Text style={{color: 'red'}}> {errors.licensePlate} </Text>
                  )}
                </View>

                <View>
                  <View style={{position: 'absolute', right: 285, top: 17}}>
                    <Icon
                      name={Platform.OS === 'ios' ? 'ios-add' : 'flame-outline'}
                      color="#8c0032"
                      size={35}
                    />
                  </View>
                  <DropDownPicker
                    items={[
                      {
                        label: 'Dizel',
                        value: 'dizel',
                        icon: () => (
                          <Icon
                            name={
                              Platform.OS === 'ios'
                                ? 'ios-add'
                                : 'flame-outline'
                            }
                            color="red"
                            size={18}
                          />
                        ),
                      },
                      {
                        label: 'Benzin',
                        value: 'benzin',
                        icon: () => (
                          <Icon
                            name={
                              Platform.OS === 'ios'
                                ? 'ios-add'
                                : 'beaker'
                            }
                            color="blue"
                            size={18}
                          />
                        ),
                      },
                      {
                        label: 'Elektrik',
                        value: 'elektrik',
                        icon: () => (
                          <Icon
                            name={
                              Platform.OS === 'ios'
                                ? 'ios-add'
                                : 'battery-charging-outline'
                            }
                            color="orange"
                            size={18}
                          />
                        ),
                      },
                      {
                        label: 'LPG',
                        value: 'lpg',
                        icon: () => (
                          <Icon
                            name={
                              Platform.OS === 'ios'
                                ? 'ios-add'
                                : 'pint-outline'
                            }
                            color="green"
                            size={18}
                          />
                        ),
                      },
                      {label: 'Yakıt Türünü Seçiniz...', value: 'seçiniz'},
                    ]}
                    defaultValue={this.state.yakit}
                    containerStyle={{
                      marginLeft: '20%',
                      marginTop: 10,
                      marginBottom: 25,
                      height: 55,
                      width: 180,
                    }}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={items => {
                      console.log(items.value);
                      values.fuelType = items.value;

                      this.setState({yakit:items.value,plaka:values.licensePlate});
                    }}
                  />
                  {
                    //(errors.vehicleType)&&<Text style={{color:'red',marginLeft:65}}> {errors.vehicleType} </Text>
                  }
                </View>

                <View>
                  <View style={{position: 'absolute', right: 285, top: 33}}>
                    <Icon
                      name={Platform.OS === 'ios' ? 'ios-add' : 'car-outline'}
                      color="#8c0032"
                      size={35}
                    />
                  </View>
                  <DropDownPicker
                    items={[
                      {label: 'Sedan', value: 'sedan'},
                      {label: 'Hatchback', value: 'hatc'},
                      {label: 'Station Wagon', value: 'sta'},
                      {label: 'Cabrio', value: 'cabrio'},
                      {label: 'Pick Up', value: 'pup'},
                      {label: 'SUV', value: 'suv'},
                      {label: 'Diğer', value: 'diger'},
                      {label: 'Araç Türünü Seçiniz... ', value: 'seçiniz'},
                    ]}
                    defaultValue={this.state.cars}
                    containerStyle={{
                      marginLeft: '20%',
                      marginBottom: 25,
                      marginTop: 25,
                      height: 55,
                      width: 180,
                    }}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{
                      backgroundColor: 'white',
                      borderBottomColor: 'black',
                      height: 100,
                    }}
                    onChangeItem={items => {
                      values.vehicleType = items.value;
                      this.setState({
                        cars: items.value,
                      });
                    }}
                  />
                </View>

                {
                  //(errors.fuelType)&&<Text style={{color:'red',justifyContent:'center',marginLeft:65}}> {errors.fuelType}</Text>
                }

                {
                  //console.log(this.state.cars)
                }

                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: 50,
                    marginTop: 50,
                    justifyContent: 'center'
                  }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}>
                    <Text style={{color: '#8c0032',fontSize: 20}}>
                      Hesap Oluştur
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textBody}>Zaten hesabın var mı?</Text>
            <Text
              style={[styles.textBody, {color: '#08467C'}]}
              onPress={() => this.props.navigation.navigate('Login')}>
              {' '}
              Giriş Yap
            </Text>
          </View>
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
  },
  image: {
    resizeMode: 'contain',
    width: '75%',
    height: 150,
    marginVertical: 10,
  },
  textTitle: {
    fontSize: 40,
    fontFamily: 'Foundation',
    marginVertical: 5,
    marginBottom:15,
    color:'#8c0032'
  },
  textBody: {
    fontSize: 16,
    fontFamily: 'Foundation',
    color:'#bc477b'
  },
  input: {
    borderRadius: 7,
    backgroundColor: 'white',
    margin: 15,
    height: 55,
    width: 180,
  }, //#009999
  item: {marginBottom: 20, alignItems: 'center'},
  button: {
    backgroundColor: '#bbb5c3',
    borderRadius: 15,
    paddingVertical: 7,
    alignItems: 'center',
    width: 300,
    height:63,
    justifyContent: 'center'
  },
  icon: {position: 'absolute', right: 35, top: 25},
});
