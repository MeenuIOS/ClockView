import React,{Component} from 'react';
import { StyleSheet, View,ImageBackground, Alert } from 'react-native';
import AnalogClock from 'react-native-clock-analog';


export default class Clock extends React.Component{

  static navigationOptions =
 {
    title: 'MainActivity',
 };

    constructor() {
        super();
    
        this.state = { currentHour: null, currentMin: null, currentSec: null }
        this.daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      }
    
      componentWillMount() {
        this.getCurrentTime();
      }
      getCurrentTime = () => {
        let hour = new Date().getHours();
        let minutes = new Date().getMinutes();
        let seconds = new Date().getSeconds();
        let am_pm = 'pm';
    
        if (minutes < 10) {
          minutes =  minutes;
        }
    
        if (seconds < 10) {
          seconds =  seconds;
        }
    
        if (hour > 24) {
          hour = 24 - hour ;
        }
    
        if (hour == 0) {
          hour = 24;
        }
    
        if (new Date().getHours() < 12) {
          am_pm = 'am';
        }
    
        this.setState({ currentHour: hour });
        this.setState({ currentMin: minutes });
        this.setState({currentSec: seconds})
    
        this.daysArray.map((item, key) => {
          if (key == new Date().getDay()) {
            this.setState({ currentDay: item.toUpperCase() });
          }
        })
       new AlarmClass().functionWithValue(this.state.currentHour,this.state.currentMin,this.state.currentSec,this.state.currentDay)

      }
    


      componentWillUnmount() {
        clearInterval(this.timer);
      }
    
      componentDidMount() {
        this.timer = setInterval(() => {
          this.getCurrentTime();
        }, 1000);
      }
      



      render(){
       
      return (
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri:
                'https://i.pinimg.com/originals/62/6f/84/626f84c40696c1308a77fd8331e12b3e.jpg',
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 500,
              width: 500,
            }}>
            <View style={{ marginBottom: 5 }} />
            <AnalogClock
              colorClock="#2196F3"
              colorNumber="#000000"
              colorCenter="#00BCD4"
              colorHour="#FF8F00"
              colorMinutes="#FFC400"
             
              hour = {String(this.state.currentHour)}
              minutes={String(this.state.currentMin)}
              seconds = {String(this.state.currentSec)}  
            />
          </ImageBackground>
        </View>
      );
      
    }
    
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
      },
    });

   
    class AlarmClass extends Component {
      functionWithValue = (currentHour,currentMin,currentSec,currentDay) => {
  
        if(currentHour === 12  && currentMin === 0 && currentSec === 0){
          Alert.alert("Wake up! its Afternoon now ",currentDay,'ok')
         }
      };
    
    }