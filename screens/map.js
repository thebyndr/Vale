import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Touchable,
  Image,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
  Modal,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import database from '@react-native-firebase/database';

import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Polygon,
  Circle,
} from 'react-native-maps';
//import MapView from "react-native-map-clustering";
import MapViewDirections from 'react-native-maps-directions';
import auth from '@react-native-firebase/auth'


export default class map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      carParks: [{
        _id:"asd",
        latitude:20,
        longitude:10,
        contact:"asda",
        carparkAttendant:"sakmd",
        carparkName:"sadas"
      }],
      profile1:{},
     
      
    };
  }

  componentDidMount() {
    
    database()
    .ref('/Users'+'/'+auth().currentUser.uid)
    .update({
      resStateUser:false,

    })
    .then(() => console.log('Data updated.'))
//     const {token,profile} = this.props.route.params;
    
//     this.setState({profile1:profile})
  
//     axios.get(`https://ieeevale.com/api/carparks`,{
//       headers:{
//         'authorization':token
//       }
//     })
//   .then(res => {
//   // this.setState({bosyer:res.data.items[12].reputation_change_day})
//   // this.setState({doluluk:res.data.items[11].accept_rate})
// //  console.log(res.data);
//  this.setState({carParks:res.data.data});
// //  console.log(this.state.carParks[0].latitude); 
//  this.setState({carpark1:res.data.data[0]});
// })
//   .catch(e => {console.log(e)});
  

    // if(Platform.OS=='android'){
    //     const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
    //   'title':'MapsAndGeo',
    //   'message':'Konumunuzu İstiyoruz'

    //     })
    //     //alert(response)
    // }
    // else{
    //    Geolocation.requestAuthorization();
    // }

    //KONUM
    ;
    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: {latitude, longitude},
        } = position;
        this.setState({latitude, longitude});
        console.log(position);
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
  }


  render() {
    // KONUM ALMA
    const {latitude, longitude, carParks, carPark1} = this.state;
    {console.log('konum :', longitude, latitude)}
    return (
      <View style={styles.container}>
    
        <View style={{width: '100%', height: 48,backgroundColor:'#efebe7'}}>
          <View style={{alignItems: 'center',justifyContent: 'center'}}>
          <Text style={{fontSize:30,color:'green'}}>Otoparklar</Text>
          </View>
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={{position:'absolute',right:'85%',top:'-10%'}}>
    <Icon  name={Platform.OS === "ios" ? "ios-add" : "menu-outline"}
  color="#283b50"
  size={55}/>
</TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
            style={{position: 'absolute', right: '0%', top: '-10%'}}>
            <Icon
              name={
                Platform.OS === 'ios' ? 'ios-add' : 'arrow-back-circle-outline'
              }
              //name={(this.state.hidePassword)?"eye-off-outlane:eye-outlane"}  şifre görünürlüğü açıp kapatma
              color="#004d40"
              size={55}
            />
          </TouchableOpacity>
        </View>
      
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: 40.990771,
            longitude: 28.7266562,
            latitudeDelta: 0.058,
            longitudeDelta: 0.0581,
          }}

          //KONUM ALMA
          // provider={PROVIDER_GOOGLE}
          //         style={styles.map}
          //         region={{
          //             latitude:Number(latitude),
          //             longitude:Number(longitude),
          //             longitudeDelta:0.015,
          //             latitudeDelta:0.0121
          //         }}
          //         showsUserLocation={true}
        >
          {/* <MapViewDirections
            origin={{latitude:40.99449778084676,longitude:28.728089555825388}}
            destination={{latitude:40.98449778084676,longitude: 28.788089555825388}}
            apikey={'AIzaSyDQLdDbN44L1Im9dAHu06Fm_nt0qL5qxeA'}
            strokeWidth={2}
            strokeColor="blue"
           
           
           
          /> */}
          <Marker
            pinColor={'blue'}
            title={'KONUMUNUZ'}
            opacity={1.5}
            description={'BURASI'}
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
              latitudeDelta: 0.115,
              longitudeDelta: 0.1121,
            }}
          />

          <Marker
            onPress={() => this.props.navigation.navigate('iücdoluluk',{carPark:carParks[0]})}
            pinColor={'green'}
            title={'İÜC PARK'}
            opacity={1.5}
            description={'Otopark'}
            coordinate={{
              latitude: 40.99415958521922,
              longitude: 28.705537610523933,
              latitudeDelta: 0.115,
              longitudeDelta: 0.1121,
            }}
          />
{/* 
          <Marker
            onPress={() =>
              Alert.alert(
                'AÇIK Otopark',

                'Otopark boş alan sayısı:19',
                [{text: 'Otopark Doluluk Oranı :%52'}, {text: 'KAPAT'}],
              )
            }
            draggable={true}
            onDrag={() => alert('kaydırma')}
            pinColor={'green'}
            title={'Ulaştırma Park'}
            opacity={1.5}
            description={'Otopark'}
            coordinate={{
              latitude: 40.98536218895013,
              longitude: 28.727109094310634,
              latitudeDelta: 0.115,
              longitudeDelta: 0.1121,
            }}
          /> */}

          {/* <Marker
            onPress={() =>
              Alert.alert(
                'KAPALI Otopark',

                'Otopark boş alan sayısı:38',
                [{text: 'Otopark Doluluk Oranı :%35'}, {text: 'KAPAT'}],
              )
            }
            draggable={true}
            onDrag={() => alert('kaydırma')}
            pinColor={'green'}
            title={'Hilton Otel Park'}
            opacity={1.5}
            description={'Otopark'}
            coordinate={{
              latitude: 40.99415958521922,
              longitude: 28.705537610523933,
              latitudeDelta: 0.115,
              longitudeDelta: 0.1121,
            }}
          /> */}

          <Marker
            // onPress={() =>
            //   Alert.alert(
            //     'KAPALI Otopark',

            //     'Otopark boş alan sayısı:8',
            //     [{text: 'Otopark Doluluk Oranı :%88'}, {text: 'KAPAT'}],
            //   )
            // }
            onPress={() => this.props.navigation.navigate('iücdoluluk',{carPark:carParks[0]})}
            draggable={true}
            onDrag={() => alert('kaydırma')}
            pinColor={'green'}
            title={'Borusan BMW Park'}
            opacity={1.5}
            description={'Otopark'}
            coordinate={{
              latitude: 40.99217799104677,
              longitude: 28.716852203357405,
              latitudeDelta: 0.115,
              longitudeDelta: 0.1121,
            }}
          />

          <Marker
            // onPress={() =>
            //   Alert.alert(
            //     'AÇIK Otopark',

            //     'Otopark boş alan sayısı:6',
            //     [{text: 'Otopark Doluluk Oranı :%85'}, {text: 'KAPAT'}],
            //   )
            // }
            onPress={() => this.props.navigation.navigate('iücdoluluk',{carPark:carParks[0]})}
            draggable={true}
            onDrag={() => alert('kaydırma')}
            pinColor={'green'}
            title={'Avcılar Belediyesi  Park'}
            opacity={1.5}
            description={'Otopark'}
            coordinate={{
              latitude: 40.97890617603983,
              longitude: 28.712598662591812,
              latitudeDelta: 0.115,
              longitudeDelta: 0.1121,
            }}
          />

          <Polygon
            // onPress={() =>
            //   Alert.alert(
            //     'İÜC Açık Otoparkı',

            //     'Otopark Boş Alan Sayısı : 12',
            //     [{text: 'Otopark Doluluk Oranı : %62'}, {text: 'KAPAT'}],
            //   )
            // }
            onPress={() => this.props.navigation.navigate('iücdoluluk',{carPark:carParks[0]})}
            strKAPATeWidth={3}
            strKAPATeColor={'green'}
            fillColor={'#859A85'}
            tappable={true}
            coordinates={[
              {latitude: 40.995109430171354, longitude: 28.72616037211094},
              {latitude: 40.99318732956666, longitude: 28.726758295699483},
              {latitude: 40.99379869368557, longitude: 28.73059746855048},
              {latitude: 40.995604371640674, longitude: 28.72934368495874},
            ]}
          />

          <Polygon
            // onPress={() =>
            //   Alert.alert(
            //     'Ulaştırma Açık Otoparkı',

            //     'Otopark Boş Alan Sayısı : 19',
            //     [{text: 'Otopark Doluluk Oranı : %52'}, {text: 'KAPAT'}],
            //   )
            // }
            onPress={() => this.props.navigation.navigate('iücdoluluk',{carPark:carParks[0]})}
            strKAPATeWidth={3}
            strKAPATeColor={'green'}
            fillColor={'#859A85'}
            tappable={true}
            coordinates={[
              {latitude: 40.98559616274055, longitude: 28.72572170569397},
              {latitude: 40.98650977143017, longitude: 28.72669583639168},
              {latitude: 40.98516161264532, longitude: 28.72895401723806},
              {latitude: 40.9843260107088, longitude: 28.728112709412166},
            ]}
          />

          <Polygon
            // onPress={() =>
            //   Alert.alert(
            //     'Hilton Otel Kapalı Otoparkı',

            //     'Otopark Boş Alan Sayısı : 38',
            //     [{text: 'Otopark Doluluk Oranı : %35'}, {text: 'KAPAT'}],
            //   )
            // }
            onPress={() => this.props.navigation.navigate('iücdoluluk',{carPark:carParks[0]})}
            strKAPATeWidth={3}
            strKAPATeColor={'green'}
            fillColor={'#859A85'}
            tappable={true}
            coordinates={[
              {latitude: 40.99516287024553, longitude: 28.70514072684423},
              {latitude: 40.994132401439785, longitude: 28.70706451697614},
              {latitude: 40.99327056121589, longitude: 28.706046776944422},
              {latitude: 40.9938888342926, longitude: 28.704743578785386},
              {latitude: 40.99421671398193, longitude: 28.705165562690905},
              {latitude: 40.994524534656, longitude: 28.704445550964213},
            ]}
          />
          <Polygon
            // onPress={() =>
            //   Alert.alert(
            //     'Borusan BMW Kapalı Otoparkı',

            //     'Otopark Boş Alan Sayısı : 8',
            //     [{text: 'Otopark Doluluk Oranı : %88'}, {text: 'KAPAT'}],
            //   )
            // }
            onPress={() => this.props.navigation.navigate('iücdoluluk',{carPark:carParks[0]})}
            strKAPATeWidth={3}
            strKAPATeColor={'green'}
            fillColor={'#859A85'}
            tappable={true}
            coordinates={[
              {latitude: 40.992255970154226, longitude: 28.714918681448818},
              {latitude: 40.99382123320399, longitude: 28.71638727798183},
              {latitude: 40.99100820050658, longitude: 28.718667606519173},

              {latitude: 40.99039547508844, longitude: 28.718173146706885},
            ]}
          />
          <Polygon
            // onPress={() =>
            //   Alert.alert(
            //     'Avcılar Belediyesi Açık Otoparkı',

            //     'Otopark Boş Alan Sayısı : 4',
            //     [{text: 'Otopark Doluluk Oranı : %85'}, {text: 'KAPAT'}],
            //   )
            // }
            onPress={() => this.props.navigation.navigate('iücdoluluk',{carPark:carParks[0]})}
            strKAPATeWidth={3}
            strKAPATeColor={'green'}
            fillColor={'#859A85'}
            tappable={true}
            coordinates={[
              {latitude: 40.97845895359539, longitude: 28.712142292673345},
              {latitude: 40.97849539416297, longitude: 28.712164233631835},
              {latitude: 40.97902544394915, longitude: 28.711905344282904},
              {latitude: 40.979250701187794, longitude: 28.713002378936018},
            ]}
          />

          {/* 
           //CIRCLE


<Circle
center={{latitude:40.990109430171354,longitude: 28.72716037211094}}
strKAPATeWidth={3}
strKAPATeColor={"red"}
fillColor={"#246E73"}
radius={300}
/> */}

          {/* 
           //DRAGGABLE MARKERS

<Marker 
draggable={true}
onDrag={(e)=>console.log(e.nativeEvent.coordinate)}
onDragStart={(e)=>console.log(`start:${e}`)}
onDragEnd={(e)=>alert(`Şu anki konum:${e.nativeEvent.coordinate.latitude} ${e.nativeEvent.coordinate.longitude}`)}
title={"İÜC PARK"}
             
             description={"Otopark"}
             coordinate={
                 {
                    latitude:40.99449778084676
                    ,longitude:28.728089555825388
                    ,latitudeDelta:0.115
                    ,longitudeDelta:0.1121
                 }
             }>

<View style={{justifyContent:'center',alignItems:'center',width:30,height:30,backgroundColor:'red',borderRadius:50}}>
<Text style={{color:'white',padding:5,fontSize:15,justifyContent:'center',alignItems:'center'}}> 1 </Text>
</View>

             </Marker> */}
             
        </MapView>

        
{
 //GOOGLE DIRECTIONS ÜCRETLENDİRMESİ
}


{/* <MapViewDirections apikey={"AIzaSyD5C0XB2nisaTgPaqeHzvwlzrN8gl19Hq4"}

origin={{latitude:40.99449778084676,longitude: 28.728089555825388}}
destination={{latitude:40.94449778084676,longitude: 28.735089555825388}}
/> */}

      </View>
    );
  }
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});
