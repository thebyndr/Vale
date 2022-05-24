import CountDown from 'react-native-countdown-component';
import CountDownTimer from 'react-native-countdown-timer-hooks';
import React,{Component,useEffect,useState
  }from 'react';
import axios from "axios"
import {View, LogBox, BackHandler,BackAndroid,ToastAndroid,StyleSheet,TextInput,Pressable, Text,Modal, TouchableOpacity,ScrollView, Image,Alert} from 'react-native';
import {Linking} from 'react-native'
import getDirections from 'react-native-google-maps-directions'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { getDistance, getPreciseDistance } from 'geolib';
import database,{firebase} from '@react-native-firebase/database';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Circle,
} from 'react-native-maps';
import auth from '@react-native-firebase/auth'
import { Value } from 'react-native-reanimated';
var profile;
let kalanSure = new Number();
let otoparkAlani;
let count;
export default class timer extends Component{
  constructor(props){
    

    super(props);
   this.state = {
      modalVisible: false,
      modalVisible2:false,
      modalVisible3:false,
      geldimi:'',
      saat:0,
      dakika:0,
      name:'',
      longitude:'',
      latitude:'',
      BaslangicGun:0,
      BitisGun:0,
      BaslangicAy1:0,
      BitisAy2:0,
      BaslangicSaat1:0,
      BitisSaat2:0,
      BaslangicDakika:0,
    BitisDakika:0
   
    };
  
  }

//GERİ GİTMEYİ ENGELLER
componentWillMount(){
  BackHandler.addEventListener('hardwareBackPress', function() {return true})
  
 

}

  onBackPress = () => {
    return true;
  }
 
  handleGetDirections = () => {
    const data = {
       source: {
        latitude: 40.99449778084676,
        longitude: 28.728089555825388
      },
      destination: {
        latitude: 40.98449778084676,
        longitude:28.788089555825388
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ],

    }
 
    getDirections(data)
  }
calculateDistance = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: {latitude, longitude},
        } = position;
        console.log(latitude+'*'+longitude)
      this.setState({latitude,longitude})
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 10000},
      //options methodları :
    
      //timeout=>konum alma süresi 20 saniye desek 20 saniye boyunca uğraşır
      //maximumAge
      //enableHighAccuraccy:true GPS kullanılacağı anlamına gelir
    );

    database()
    .ref('/Users'+'/'+auth().currentUser.uid)
    .on('value',snapshot => 
    
    {

      this.setState({
        name:snapshot.val().name,
        BaslangicGun:snapshot.val().BaslangicGun,
        BitisGun:snapshot.val().BitisGun,
        BaslangicAy1:snapshot.val().BaslangicAy1,
        BitisAy2:snapshot.val().BitisAy2,
        BaslangicSaat1:snapshot.val().BaslangicSaat1,
        BitisSaat2:snapshot.val().BitisSaat2,
        BaslangicDakika:snapshot.val().BaslangicDakika,
      BitisDakika:snapshot.val().BitisDakika
      })
    
    database()
    .ref('/Otoparklar'+'/'+'0'+'/')
    .orderByChild('name')
    .on('value',snapshot1 => {
    
    var dis = getDistance(
      { latitude:this.state.latitude, longitude:this.state.longitude },
      { latitude: snapshot1.val().latitude, longitude: snapshot1.val().longitude }
    );
     this.setState({
       
      saat:parseInt(snapshot.val().saat)+((dis<60?0:dis)/60),
     
     
     dakika:parseInt(snapshot.val().dakika)+((dis)%60)})
    
   
    });
  })
   
  };
      
  componentDidMount() {
    const {BitisAy2,BitisGun,BitisSaat2,BitisDakika  } = this.state;
    let today = new Date();
  var month = today.getMonth() + 1;

  var day = today.getDate();

  let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
 
  let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

if(BitisAy2==month&&BitisGun==day&&BitisSaat2==hours&&BitisDakika==minutes){
  resCancel()
}
this.calculateDistance()
  
   
    database()
    .ref('/Otoparklar'+'/'+'0'+'/')
.on('value',snapshot => {
this.setState({latitudePark:snapshot.val().latitude,longitudePark:snapshot.val().longitude})
});



    
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setModalVisible2 = (visible) => {
    this.setState({ modalVisible2: visible });
  }
  setModalVisible3 = (visible) => {
    this.setState({ modalVisible3: visible });
  }
 




render() {
  
  const resCancel=()=>{
    database()
    .ref('/Users'+'/'+auth().currentUser.uid)
    .on('value',snapshot => 
    
    {
      
      
      database()
      .ref('/Otoparklar'+'/'+'0'+'/'+'Alanlar'+'/'+snapshot.val().itemKey)
      .update({
        resState:false
      })
    })
    
    database()
    .ref('/Users'+'/'+auth().currentUser.uid)
    .update({
      resStateUser:false
    })
   
    this.props.navigation.navigate('map')
    this.setModalVisible(!modalVisible)

  

  }
  
  
  
  const phonnumb='05523361923'
  const { modalVisible,modalVisible2,geldimi,modalVisible3,name } = this.state;

  const refTimer=2
  const kalanSure=120

    return (

<ScrollView style={{flex:1,backgroundColor:'black'}}>
<TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={{position:'absolute',right:'85%',top:'0%'}}>
    <Icon  name={Platform.OS === "ios" ? "ios-add" : "menu-outline"}
  color="white"
  size={55}/>
</TouchableOpacity>
  <View style={{alignItems:'center',marginTop:35}}>
    <Text style={styles.textTitle}>
      {/* {sure} Alanı Rezerve Edildi */}
    </Text>
  </View>
  
  <View style={styles.timer}>
      {/* <CountDown
        size={30}
        // until={60}
      //   onFinish={() => 
          
      //     axios.get(`https://ieeevale.com/api/current_user`,{
      //       headers:{
      //         'authorization':token
      //       }
      //       }).then(res => {profile=res.data.data
      //     this.props.navigation.navigate('map',{profile,token})})
      
      
      // }
        digitStyle={{backgroundColor: 'black', borderWidth: 2, borderColor: '#82f7ff'}}
        digitTxtStyle={{color: 'white'}}
        timeLabelStyle={{color: '#304ffe', fontWeight: 'bold'}}
        separatorStyle={{color: '#0064b7'}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{h:'Saat',m:'Dakika', s: 'Saniye'}}
        showSeparator
      /> */}
      <Text style={styles.textTitle}>
       Başlangıç
    </Text>
<View style={{marginBottom:15,
            height: 65,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: '#ffc107',}}>
<Text style={{fontSize: 25,
            color: 'black',
            fontWeight: '700',
            letterSpacing: 0.25,}}>{this.state.BaslangicGun}.{this.state.BaslangicAy1}.2022</Text>
<Text style={{fontSize: 25,
            color: 'black',
            fontWeight: '700',
            letterSpacing: 0.25,}}>{this.state.BaslangicSaat1}.{this.state.BaslangicDakika}</Text>

</View>
<Text style={styles.textTitle}>
       Bitiş
    </Text>
<View style={{marginBottom:15,
            height: 65,
            width: 150,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: '#ffc107',}}>
<Text style={{fontSize: 25,
            color: 'black',
            fontWeight: '700',
            letterSpacing: 0.25,}}>{this.state.BitisGun}.{this.state.BitisAy2}.2022</Text>
<Text style={{fontSize: 25,
            color: 'black',
            fontWeight: '700',
            letterSpacing: 0.25,}}>{this.state.BitisSaat2}.{this.state.BitisDakika}</Text>

</View>
      {/* <CountDownTimer
          ref={2}
          
          timerCallback={resCancel}
          containerStyle={{
           
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            
          }}
          textStyle={{
            fontSize: 25,
            color: 'black',
            fontWeight: '700',
            letterSpacing: 0.25,
          }}
        /> */}
      
</View>
<View style={{alignItems:'center',marginTop:10}}>
  
    <Text style={styles.textTitle}>
      En Geç Bu Zamanda  
    </Text>
    <Text style={styles.textTitle}>
     Otoparkta Olunuz
    </Text>
   
  </View>


  
<View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={()=>
                      this.setModalVisible(true)
                    }
                    style={styles.button}>
                    <Text style={{color: 'black',fontWeight: 'bold',fontSize: 20}}>Rezerveyi İptal Et</Text>
                  </TouchableOpacity>
                </View>



                <View style={{alignItems:'center'}}>
    <Text style={styles.textTitle}>
       {name} Alanına 
    </Text>
    <Text style={styles.textTitle}>
    Geldiyseniz
    </Text>
    <Text style={styles.textTitle}>
     "Geldim"e Tıklayınız.
    </Text>
   
  </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={()=>
                      this.setModalVisible2(true)
                    }
                    style={styles.buttonA}>
                    <Text style={{color: 'black',fontWeight: 'bold',fontSize: 20}}>Geldim</Text>
                  </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection:'row-reverse',marginBottom:'0%',marginRight:'3%'}}>
      <TouchableOpacity style={{alignItems: "center",
      
    backgroundColor: "#ffc107",
    padding: 10, borderRadius:25}} onPress={()=>this.setModalVisible3(true)}>
      <Icon  name={Platform.OS === "ios" ? "ios-add" : "compass-outline"}
  color="black"
  size={45}>
        </Icon>
        
        <Text style={{justifyContent: 'center',fontSize:20,fontWeight:'bold',color:'black'}}> Ulaşım</Text>
        </TouchableOpacity></View>
              
               <View>
               <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible2(!modalVisible2);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
           { (geldimi) ?
  <LinearGradient colors={['#008400', '#03d600','green']} style={styles.view2}>
<Text style={styles.text2}>{/*BosYer*/} Alanında </Text><Text style={styles.text2}>Olduğunuz Onaylandı.</Text><Text style={styles.text2}>İyi Günler Dileriz</Text>
<TouchableOpacity style={{alignItems: "center",justifyContent:'center',
   width:200,
   marginTop:50,
    backgroundColor: "#00675b",
    padding: 10, borderRadius:55}} onPress={()=>this.props.navigation.navigate('Login')}><Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Kapat</Text></TouchableOpacity>
     
     </LinearGradient>

:
<LinearGradient colors={['#d30000', '#e53935','red']} style={styles.view1}>
 <Text style={styles.text1}>{/*BosYer*/} alanı boş görünmekte.</Text><Text style={styles.text1}>Lütfen otopark ile iletişime geçiniz.</Text>
 <TouchableOpacity onPress={()=>Linking.openURL(`tel:${phonnumb}`)
}>
<Text style={{paddingTop:40,textDecorationLine: 'underline',paddingBottom:40,fontSize:30,color:'blue',fontWeight:'700',fontFamily:'lucida grande'}}>Tel:0 552 336 19 23 </Text>
</TouchableOpacity>
 <TouchableOpacity style={{alignItems: "center",justifyContent:'center',
   width:200,
   marginTop:200,
    backgroundColor: "#00675b",
    padding: 10, borderRadius:55}} onPress={()=>this.setModalVisible2(!modalVisible2)}><Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Geri Dön</Text></TouchableOpacity>
     
     </LinearGradient>}
           
            </View>
          </View>
        </Modal>
               </View>
               
               <View>
               <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Rezervasyonu İptal Etmek İstiyor Musunuz ?</Text>
              <Pressable
                style={[styles.button3, styles.buttonClose1]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle2}>Hayır</Text>
              </Pressable>
              <Pressable
              style={[styles.button3, styles.buttonClose2]}
                onPress={() =>
                resCancel()
                }
                
                  
              >
                <Text style={styles.textStyle2}>Evet</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
               </View>



               <View>
               <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible3}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible3(!modalVisible3);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Yol tarifine gitmek istiyor musunuz?</Text>
              <Pressable
                style={[styles.button3, styles.buttonClose1]}
                onPress={() => this.setModalVisible3(!modalVisible3)}
              >
                <Text style={styles.textStyle2}>Hayır</Text>
              </Pressable>
              <Pressable
                style={[styles.button3, styles.buttonClose2]}
                onPress={() =>{this.handleGetDirections(), this.setModalVisible3(!modalVisible3)}}
              >
                <Text style={styles.textStyle2}>Evet</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
               </View>
               </ScrollView>





    )
}
}

const styles = StyleSheet.create({
    timer: {
      
        alignItems: 'center',
        justifyContent: 'center',
        
    },
  
    rezerve: {
        fontFamily: 'Foundation',
        fontSize: 40,
        marginVertical: 10,
        marginTop:300
    },
    button: {
      backgroundColor: '#ffc107',
      borderRadius: 25,
    height:75,
    width:200,
    marginTop:65,
    marginBottom:55,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    buttonA: {
      backgroundColor: '#ffc107',
      borderRadius: 25,
    height:75,
    width:180,
    marginTop:50,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  
    textBody: {
      fontFamily: 'Foundation',
      fontSize: 16,
      marginTop: 15,
      marginBottom: 15,
      color: 'white',
    },
    textTitle: {
      fontSize: 21,
      fontFamily: 'monospace',
    fontWeight:'bold',
      color:'white',
    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginBottom:25
  },
  modalView: {
    
    backgroundColor: "#687e9b",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button3: {
    borderRadius: 20,
    padding: 10,
    marginTop:20,
    width:80
  },
  buttonOpen: {
    backgroundColor: "#008ba3",
  },
  buttonClose2: {
    backgroundColor: "green",
  },
  buttonClose1: {
    backgroundColor: "red",
  },
  textStyle2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize:20,
    textAlign: "center",
    color:'white',fontWeight:'bold'
  },   view1:{
    backgroundColor:'#ab000d',alignItems:'center',justifyContent:'center',flex:1
 },
 view2:{
    backgroundColor:'#00600f',alignItems:'center',justifyContent:'center',flex:1
 }
 ,
text1: {
    alignItems:'center',
    justifyContent: 'center',
 fontWeight:'bold',
 color:'white',
 fontSize:35
},
text2: {
    fontWeight:'bold',
    color:'white',
    fontSize:35
  }
  })
