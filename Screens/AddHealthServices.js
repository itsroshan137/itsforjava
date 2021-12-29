import React from 'react';
import {View, Button, Text, ActivityIndicator, Alert} from 'react-native';   
import {Input} from 'react-native-elements';     

export default class Update extends React.Component{
    constructor(){
        super();
        this.state = {
            type:'',
            contactNo:'',
            loading: false
        }
    }

    insertHealthServices = async() => {
        try{  
            const parameter = "?type="+ this.state.type + "&contactNo="+ this.state.contactNo ;
            this.setState({loading:true});  
            const response = await fetch("https://thecoronatrackerapp.herokuapp.com/insert-healthservicestemp"+ parameter, {method: "POST"});
            const json  = await response.json();
            if(json.status == 200){
                Alert.alert("Congratulations", this.state.type + "has sent for review");
                this.setState({type: '', contactNo:'', loading: false});
            }
            this.setState({type: '', contactNo:'', loading: false});
      }
      catch(e){
          console.error(e);
          this.setState({loading:true});
      }
   }

render () {
    return (
    <View style = {{flex:1, marginHorizontal:22, marginTop:10}}>
        {
            this.state.loading ?
            <ActivityIndicator size = "large" style ={{flex:1, justifyContent:'center'}}/>
            :
            <View>
                <Text>Enter Title</Text>
                <Input placeholder = "Study Material Title Goes Here.." style = {{borderColor:'black', borderRadius:'1'}} onChangeText = {(val) => {this.setState({type:val})}}/>
                <Text>Enter Description</Text>
                <Input placeholder = "Description Goes Here.." style = {{borderColor:'black', borderRadius:'1'}} onChangeText = {(val) => {this.setState({contactNo:val})}}/>
                <Text>Enter Photograph Urls</Text>
                <Input placeholder = "Only urls please.." style = {{borderColor:'black', borderRadius:'1'}} onChangeText = {(val) => {this.setState({contactNo:val})}}/>
                <Button title = "Create Study Material" onPress = {this.insertHealthServices}/>
            </View>
        }
    </View>
    )
  }
}
