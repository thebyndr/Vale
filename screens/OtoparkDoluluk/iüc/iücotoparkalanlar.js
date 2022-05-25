import React,{Component,BackHandler,useEffect,useState}from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    SafeAreaView,
    Touchable,
    Image,
    Modal,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
   } from 'react-native';
   import axios from "axios";
   import Icon from "react-native-vector-icons/Ionicons"
   import LinearGradient from 'react-native-linear-gradient';
   import database,{firebase} from '@react-native-firebase/database';
   import auth from '@react-native-firebase/auth'
   import Geolocation from '@react-native-community/geolocation';
   import { getDistance, getPreciseDistance } from 'geolib';
   import DatePicker from 'react-native-date-picker'
const iücotoparkalanlar=(props)=>{
    useEffect(()=>{
        fetchUser()
      
     },[])
        

//    export default class iücotoparkalanlar extends Component{
//    constructor(props){
//        super(props)
//        this.state={
// data:[],
// loading:true,
// isRefresh:false,
// show:false,
// musait:[],
// carPark3:{}
//        }
//    }
const [loading,setLoading]=useState(true)
const[isRefresh,setIsRefresh]=useState(false)
const [show,setShow]=useState(false)
 const [musait,setMusait]=useState([])
const [loadMore,setLoadMore]=useState(false)

const[data,setData]=useState([

])
const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [date2, setDate2] = useState(new Date())
  const [open2, setOpen2] = useState(false)
  const[item1,setItem1]=useState([])
//Sayfa Yenileme
const fetchUser=(isLoadMore=false)=>{
    database()
    .ref('/Otoparklar'+'/'+'0'+'/'+'Alanlar')
  .orderByChild('name')
.on('value',snapshot => {
setMusait(snapshot.val())
    setData(snapshot.val())

    let newArray=[]
     
    snapshot.forEach((item)=>{
        let ItemObject=item.val();
        ItemObject['key']=item.key
       newArray.push(ItemObject)
    //    console.log(ItemObject)
    })
 setData(newArray)

setLoading(false)
setIsRefresh(false)
});
}


const reservation =(day1,day2,hours1,hours2,month1,month2,minutes1,minutes2)=>{

  let today = new Date();
  let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
  let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
  // hours=parseInt(hours)+3
  // if(hours>=24){
  //   hours=hours%24
  // }
  
  database()
    .ref('/Users'+'/'+auth().currentUser.uid)
    .update({
      resStateUser:true,
      itemKey:item1.key,
      name:item1.name,
      saat:hours,
      gun:today ,
      dakika:minutes,
     BaslangicGun:day1,
      BitisGun:day2,
      BaslangicAy1:month1,
      BitisAy2:month2,
      BaslangicSaat1:hours1,
      BitisSaat2:hours2,
      BaslangicDakika:minutes1,
    BitisDakika:minutes2
      
     
    })
  // database()
  // .ref('/Otoparklar'+'/'+'0'+'/'+'Alanlar'+'/'+item.key)
  // .update({
  //   resState:true,
  // })
props.navigation.navigate('timer')

} 

const zamankontrol=()=>{
 

  var month1 = date.getMonth() + 1;
  var month2 = date2.getMonth() + 1;
  var day1 = date.getDate();
  var day2 = date2.getDate();
  let hours1 = (date.getHours() < 10 ? '0' : '') + date.getHours();
  let hours2 = (date2.getHours() < 10 ? '0' : '') + date2.getHours();
  let minutes1 = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  let minutes2 = (date2.getMinutes() < 10 ? '0' : '') + date2.getMinutes();
if(month1==month2){

  if(day1==day2){

    if(hours1==hours2){
      if(minutes1>minutes2||minutes1==minutes2){
        alert('Lütfen Başlangıç Dakikasını Bitiş Dakikasından sonra bi vakit seçiniz')

      }
      else reservation(day1,day2,hours1,hours2,month1,month2,minutes1,minutes2)

    }
      if(hours1>hours2){
  alert('Lütfen Başlangıç Saatini Bitiş Saatinden sonra bi vakit seçiniz')
}
if(hours1<hours2){
  reservation(day1,day2,hours1,hours2,month1,month2,minutes1,minutes2)
}
// else reservation(day1,day2,hours1,hours2,month1,month2)

  }
  if(day1<day2){
    reservation(day1,day2,hours1,hours2,month1,month2,minutes1,minutes2)

  }
  if(day1>day2){
    alert('Lütfen Başlangıç Gününü Bitiş Gününden sonra bi vakit seçiniz')

  }


}
if(month1<month2){
  reservation(day1,day2,hours1,hours2,month1,month2,minutes1,minutes2)
}
if(month1>month2) { alert('Lütfen Başlangıç Ayını Bitiş Ayından sonra bi vakit seçiniz')}
 
  
}

const datepicker=(item)=>{
  setItem1(item)
  setOpen(true)
  
}
const _renderItem=({item})=>{
//  console.log(item)
 

     




return(
 item.resState==false ?
    <TouchableOpacity style={styles.itemContainer}
    onPress={()=>datepicker(item)}
    //  onPress={()=>{
    //     item.reservationState = true;
    //     item.remainingTime=
        
    //     user_id;
    //     axios.get(`https://ieeevale.com/api/current_user`,{
    //         headers:{
    //           'authorization':token
    //         }
    //         }).then(res => {user_id = res.data.data._id})
          
    //     item.user_id = user_id;
    //     axios.put(`https://ieeevale.com/api/carparks/${carPark2._id}`,item,{
    //         headers:{
    //           'authorization':token
    //         }
    //       }).then(res => {
    //         this.props.navigation.navigate('timer',{carPark2,profile,item,token,BosYer:item.areaName})
    //     }).catch((err) => {
    //         alert(err)
    //     })}
    //     }
        >
         
  
       {/* <TouchableOpacity onPress={()=>Linking.openURL(item.profile_image)}>
     
      <Image  style={styles.avatar} source={{uri:item.profile_image}}/>
     
      </TouchableOpacity> */}
      <View style={{alignItems:'center',justifyContent:'center'}}> 
     
      <Text style={{color:'#F1FAEE',fontSize:25,fontWeight:'700'}}>{item.name}</Text>
    
     {/* <Text>{item.location}</Text> */}
      </View>
     
    
    
    </TouchableOpacity>
    : <View>
      
    </View>
)

}

const onRefresh=()=>{
   setIsRefresh(true)
    fetchUser()
}
// const RTtimer=()=>{
//   const ref = database().ref('/Users'+'/'+auth().currentUser.uid);
//   ref.update({
//     startAt:firebase.database.ServerValue.TIMESTAMP,
//     seconds: 35
//   });
//   let startAt=firebase.database.ServerValue.TIMESTAMP
//   let seconds=35
// let serverTimeOffset = 0;
// database().ref(".info/serverTimeOffset").on("value", (snapshot) => { serverTimeOffset = snapshot.val() });
// ref.on("value", (snapshot) => {

// const interval = setInterval(() => {
// const timeLeft = (snapshot.val().seconds * 1000) - (Date.now() - snapshot.val().startAt - serverTimeOffset)

//   database()
//     .ref('/Users'+'/'+auth().currentUser.uid)
//     .update({
//       time: timeLeft>=0 ?`${Math.floor(timeLeft/1000)}.${timeLeft % 1000}`: clearInterval(interval)
//     })


// })
// });

// }

const renderFooter=()=>{

if(!loading)return null;
return <ActivityIndicator style={{color:'#80cbc4'}}/>

}





  

   
                  
                

    return (

    <View style={{backgroundColor:'#4f9a94',width:'100%',height:'100%'}}>

<DatePicker
is24hourSource={'locale'}
title={'Başlangıç Zamanını Seçin'}
locale={'tr'}
  modal
  minimumDate={new Date()}
  dividerHeight={5}
  mode="datetime"
  
  open={open}
  minuteInterval={5}
  androidVariant={'iosClone'}
  textColor={'blue'}
  confirmText={'Devam Et'}
  cancelText={'Geri'}
  theme='dark'
  date={date}
 
  onConfirm={(date) => {
    setOpen(false)
    setDate(date)
    setOpen2(true)
    console.log(date)
  }}
  onCancel={() => {
    setOpen(false)
  }}
/>
<DatePicker
is24hourSource={'locale'}
title={'Bitiş Zamanını Seçin'}
minimumDate={new Date()}
locale={'tr'}
  modal
  minuteInterval={5}
  open={open2}
  androidVariant={'iosClone'}
  textColor={'blue'}
  confirmText={'Devam Et'}
  cancelText={'Geri'}
  theme='dark'
  date={date2}
  onConfirm={(date) => {
    setOpen2(false)
    setDate2(date)
    zamankontrol()
    
  }}
  onCancel={() => {
    setOpen2(false)
    setOpen(true)
  }}
/>

{(loading) ? <View style={{alignItems:'center',marginTop:'50%'}}><Text style={{fontSize:50,color:'#b2fef7'}}>Yükleniyor...</Text></View> 
   :
      <FlatList
      style={{padding:10,backgroundColor:'#A8DADC'}}
      data={data}
      numColumns={3}
      refreshControl={
          <RefreshControl
          refreshing={isRefresh}
          onRefresh={onRefresh}
          
          />
      }
      renderItem={_renderItem}
      ListEmptyComponent={()=><View style={{alignItems:'center',fontSize:15}}><Text>Boş Alan Yok</Text></View>}
     ListFooterComponent={renderFooter}
     ListFooterComponentStyle={{backgroundColor:'#1D3557',alignItems:'center'}}
     ListHeaderComponent={()=><View><Text style={{color:'white',fontSize:35,fontWeight:'700'}}>Boş Alanlar</Text></View>}
     ListHeaderComponentStyle={{borderRadius:15,height:80,justifyContent:'center',marginBottom:23,alignItems:'center'}}
     onEndReachedThreshold={1.8}

   
     >



      </FlatList>
   }
   <Modal
   transparent={true}
   visible={show}
   >
    
     <View style={{backgroundColor:"#000000aa",flex:1,alignItems:'center'}}>
    
     <ScrollView horizontal={true} style={{backgroundColor:"#ffffff",margin:30,padding:10,borderRadius:10,flex:1}}>
    <Image style={{width:1000,height:'90%',}} source={{uri: 'https://www.ciziktirik.com/wp-content/uploads/2018/03/otopark_5_84_arac.jpg'}}/>
   </ScrollView> 
   <TouchableOpacity style={{alignItems: "center",justifyContent:'center',
   width:200,
   marginBottom:25,
    backgroundColor: "#00675b",
    padding: 10, borderRadius:55}} onPress={()=>setShow(false)}><Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Geri dön</Text></TouchableOpacity>
     
     </View>
     </Modal>
   <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection:'row-reverse',marginBottom:'35%',marginRight:'5%'}}>
      <TouchableOpacity style={{alignItems: "center",
    backgroundColor: "#6cbac4",
    padding: 10, borderRadius:55}} onPress={()=>setShow(true)}>
      <Icon  name={Platform.OS === "ios" ? "ios-add" : "map-outline"}
  color="#1f5c63"
  size={20}>
        <Text style={{fontWeight:'700'}}> Otopark 2D</Text>
        </Icon>
        </TouchableOpacity></View>
      </View>
      
    )
}









const styles=StyleSheet.create({

   
    card:{flex:1,
       justifyContent:'center',
       alignItems:'center',
       marginLeft:2
       ,backgroundColor:'#008ea3',
       marginRight:2,
       paddingHorizontal:15,
      maxWidth:'50%',
      width:150,
       height:100,
       padding:20,
       borderRadius:55,
       flexDirection:'row',
     //  backgroundColor:'#81a5ff',
       marginBottom:5,
       borderBottomColor:'#ddd'
   
   }
   , avatar:{width:65,
       height:65,
       borderRadius:100,
       borderWidth:2,
       borderColor:'#80cbc4'
   },
   itemContainer:{
    flex:1,
    borderRightWidth:8,
    borderTopLeftRadius:50,
    borderBottomRightRadius:50,
    borderTopWidth:4,
    borderLeftWidth:2,
    borderLeftColor:'white',
  
    borderRightColor:'white',
    
    borderBottomWidth:0,
    borderBottomColor:'white',
    borderTopColor:'white',
    marginBottom:15,
    marginHorizontal:10,
    paddingVertical:15,
    justifyContent:'center',
    alignItems:'center',
    height:120,
    borderRadius:15,
    backgroundColor:'#A8DADC'
    },
   })
   export default iücotoparkalanlar