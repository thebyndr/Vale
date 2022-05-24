import React,{Component}from 'react';
import {View, BackHandler ,StyleSheet,TextInput, Text, TouchableOpacity,ScrollView, Image} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';import Drawer from './drawer'
export default class forgot extends Component{
    constructor(props){
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state={
           
        }
    }
    
          
    
     
    render(){ 
        
    
        
        const ab=null
        const a="Şifreniz Mailinize Gönderildi"
        return(
<ScrollView style={{backgroundColor: '#f44336'}}>
            <View style={styles.container}>
        
            <Text style={styles.textBody,{color:'white',fontSize:25}}>Şifre Yenileme İçin</Text>
            <Text style={styles.textBody,{color:'white',fontSize:25}}>Lütfen Mailinizi Giriniz</Text>
            <View style={{marginTop: 20}} />
         
         
           



           
            
            
          
           
        </View>

        </ScrollView>
        
        )
      
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:200
    },
  
    textTitle: {
        fontFamily: 'Foundation',
        fontSize: 40,
        marginVertical: 10,
    },
    textBody: {
        fontFamily: 'Foundation',
        fontSize: 16,
        marginTop:15,
        marginBottom:15,
        color:'white'
    },
    
    input: {
        
        borderRadius:15,
      backgroundColor:'white'
      ,  margin: 15,
        height: 50,
        width:250
        ,borderColor: 'gray',
        borderWidth: 1
     },
     item:{marginBottom:20,alignItems:'center'},
     button:{backgroundColor:'#ba000d',borderRadius:15,paddingVertical:15,alignItems:'center',width:300}
,icon:{position:'absolute',right:40,top:25}
     
});