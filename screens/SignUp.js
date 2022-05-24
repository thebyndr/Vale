import React ,{Component}from 'react';
import {View, Button,StyleSheet,TouchableOpacity,TextInput, Text, ScrollView, Image} from 'react-native';

import Input from '../components/Inputs';
import Submit from '../components/Submit';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from "formik";
 import * as Yup from 'yup'
import {observable} from "mobx";
import {observer,inject} from "mobx-react"; 
import {API_URL} from '../config/system'
import LinearGradient from 'react-native-linear-gradient';

import axios from "axios"
export default class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            // firstButtonEnable: false,
            // secondButtonDisable: false,
        
        }
        // this.handlingButton = this.handlingButton.bind(this)
    }
  
    _handleSubmit=(values)=>{
       // {console.log(values)}
       
       if(values.phoneNumber[0] == '0') values.phoneNumber = values.phoneNumber.substring(1);
       values.phoneNumber = values.phoneNumber.substring(0, 3) + '-' + values.phoneNumber.substring(3,6) + '-' + values.phoneNumber.substring(6,values.phoneNumber.length)

       this.props.navigation.navigate('araba',{isim:values.name,mail:values.email,tell:values.phoneNumber,sifre:values.password})
    }
    // handlingButton(){
    //     this.state.firstButtonEnable ? this.setState({secondButtonDisable : true}): null;
    // }
    render(){
      
        // function addStr(str, index, stringToAdd){
        //     return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
        //   }
          
        //   let str = "This is a string";
        //   let stringToAdd = "modyfied ";
          
        //   console.log(addStr(str, 10, stringToAdd));  //outPut : "This is a modified string"

        const phoneRegex = RegExp(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
          );
    return (
        
        <ScrollView style={{backgroundColor: '#b2dfdb'}}>
<LinearGradient colors={['#82ada9','#b2dfdb' ]} style={{flex:1}}>



              {/* <View>
              <Button title='Button1' onPress={() => {
                    this.setState({firstButtonEnable: true})
                    this.handlingButton();
                }} />
                <Button onPress={alert('abc')} disabled={this.state.secondButtonDisable} title='Button2'  />
            </View> */}




            <View style={styles.container}> 
                <Image source={require('../assets/var3.png')} resizeMode="center" style={styles.image} />
                <Text style={styles.textTitle}>Hadi Başlayalım</Text>
                <Text style={styles.textBody}>Hesap oluşturmak için doldurunuz</Text>

               
<Formik 
      initialValues={{
          name:'',
          email:'',
          phoneNumber:'',
          password:'',
      }}
       onSubmit={this._handleSubmit}
       validationSchema={Yup.object().shape({

        name:Yup.string().required("*Lütfen Adınızı ve Soyadınızı Giriniz."),
        email:Yup.string().email("*Lütfen Geçerli Bir email Giriniz").required("*Lütfen Mailinizi Giriniz."),
        phoneNumber:Yup.string().matches(phoneRegex, "*Lütfen Geçerli Bir Telefon Numarası Giriniz.").required("*Lütfen Telefon Numarınızı Giriniz."),
        password:Yup.string().required("*Lütfen Şifreyi Giriniz."),
        
       })}
       >
           
           {({values,handleSubmit,handleChange,errors,touched
           })=>(
      
      
      <View>
           <View style={styles.item}>
           <View style={{position:'absolute',right:285,top:25}}>
  <Icon  name={Platform.OS === "ios" ? "ios-add" : "person-circle-outline"}
  
  color="#002f6c"
  size={35}/>
  </View>
<TextInput 
value={values.name}
onChangeText={handleChange('name')}

placeholder={"Ad ve Soyad"} 
alignItems= 'center'
style={styles.input}></TextInput>



{(errors.name&&touched.name)&&<Text style={{color:'red'}}> {errors.name} </Text>}
         </View>

        

  <View style={styles.item}>
  <View style={{position:'absolute',right:285,top:25}}>
  <Icon  name={Platform.OS === "ios" ? "ios-add" : "mail-outline"}

  color="#002f6c"
  size={35}/>
  </View>
<TextInput 
value={values.email}
onChangeText={handleChange('email')}

placeholder={"E-posta"} 
style={styles.input}></TextInput>



{(errors.email&&touched.email)&&<Text style={{color:'red'}}> {errors.email} </Text>}
         </View>

         <View style={styles.item}>
         <View style={{position:'absolute',right:285,top:25}}>
  <Icon  name={Platform.OS === "ios" ? "ios-add" : "call-outline"}
  
  color="#002f6c"
  size={35}/>
  </View>
<TextInput 
value={values.phoneNumber}
onChangeText={handleChange('phoneNumber')}

placeholder={"Telefon"} 
style={styles.input}
maxLength = {11}

></TextInput>



{(errors.phoneNumber&&touched.phoneNumber)&&<Text style={{color:'red'}}> {errors.phoneNumber} </Text>}
         </View>

         <View style={styles.item}>
         <View style={{position:'absolute',right:285,top:25}}>
             <TouchableOpacity onPress={()=>this.setState({hidePassword:!this.state.hidePassword})}>
  <Icon  name={(this.state.hidePassword)?"eye-off-outline":"eye-outline"}
  //name={(this.state.hidePassword)?"eye-off-outlane:eye-outlane"}  şifre görünürlüğü açıp kapatma
  color="#002f6c"
  size={35}/></TouchableOpacity>
  
  </View>
<TextInput 
value={values.password}
onChangeText={handleChange('password')}
secureTextEntry={this.state.hidePassword}
placeholder={"Şifre"} 
style={styles.input}></TextInput>



{(errors.password&&touched.password)&&<Text style={{color:'red'}}> {errors.password} </Text>}
         </View>


         <View style={styles.item}>
              
         <View style={{position:'absolute',right:285,top:25}}>
            
  </View>


  


<TouchableOpacity onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} style={{position:'absolute',right:35,top:22}}>
   
</TouchableOpacity>

         </View>



         {/* <View style={{alignItems:'center'}}>
    <TouchableOpacity 

    onPress={handleSubmit}
    style={
        
        styles.button}>
        <Text style={{color:'#002f6c',fontSize:20}}>Girilen Verileri Kaydet</Text>
    </TouchableOpacity>
</View>  */}


<View style={{alignItems:'center'}}>
    <TouchableOpacity 

    onPress={handleSubmit}
    style={
        
        styles.button}>
        <Text style={{color:'#002f6c',fontSize:20}}>Devam Et</Text>
    </TouchableOpacity>
</View>

</View>
            ) }
            
</Formik>





<TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} style={{position:'absolute',right:'85%',top:'2%'}}>
    <Icon  name={Platform.OS === "ios" ? "ios-add" : "arrow-back-circle-outline"}
  //name={(this.state.hidePassword)?"eye-off-outlane:eye-outlane"}  şifre görünürlüğü açıp kapatma
  color="#002f6c"
  size={55}/>
</TouchableOpacity>
        
      
    













                
              
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textBody}>Zaten hesabın var mı ? </Text>
                    <Text style={[styles.textBody, {color: '#002171'}]} onPress={() => this.props.navigation.navigate('Login')}> Giriş Yap</Text>

                </View>
            </View>
            </LinearGradient>
        </ScrollView>    
    );
};}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
       
    },
    image: {
        resizeMode:'contain',
        width:'65%',
        height: 200,
        marginVertical: 10
    },
    textTitle: {
        fontSize: 40,
        fontFamily: '',
        marginVertical: 5,
        color:'#002f6c',
        marginBottom:15
    },
    textBody: {
        fontSize: 16,
        fontFamily: '',
        marginBottom:15,
        color:'#01579b'
    },
    input: {
        
        borderRadius:15,
      backgroundColor:'white'
      ,  margin: 15,
        height: 55,
        width:180
        ,borderColor: 'gray',
        borderWidth: 1
     }, item:{
         marginBottom:20,
         alignItems:'center'
        },     button:{backgroundColor:'#81b9bf',borderRadius:15,paddingVertical:15,marginBottom:25,alignItems:'center',width:300}

});

