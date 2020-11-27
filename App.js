/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
  Button , 
  
 
  
} from 'react-native';

import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App: () => React$Node = () => {
  constructor(props)
  {
    super(props);

    this.state = {
      gameState :  [
        [0,0,0],
        [0,0,0],
        [0,0,0]
        

      ],
      currentPlayer : 1,

    }
    
  }
  componentDidMount()
  {
    this.initilizeGame();
  }
  initilizeGame  = () => {
    this.setState({gameState :
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
        

      ],
      currentPlayer :1,
    
    });
  }
  //Return 1 if player 1 won , -1 if player 2 won , and 0 if draw
  getWinner = () =>
  {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;
    //Check rows
    for(var i = 0 ; i <NUM_TILES ; i++)
    {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3)
      {
        return 1;
      }
      else if(sum == -3)
      {
        return -1;
      }

    }

    for (var i = 0 ; i <NUM_TILES ; i++)
    {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3)
      {
        return 1;
      }
      else if(sum == -3)
      {
        return -1;
      }
    }

    //Check diagnols...
    sum = arr[0][0] + arr [1][1] + arr[2][2];
    if (sum == 3)
    {
      return 1;
    }
    else if(sum == -3)
    {
      return -1;
    }


    sum = arr[2][0] + arr [1][1] + arr[0][2];
    if (sum == 3)
    {
      return 1;
    }
    else if(sum == -3)
    {
      return -1;
    }

    //Draw 

    return  0;

  }
  onTilePress = (row, col) => 
  {
    //Dont allow tiles to change ....
    var value = this.state.gameState[row][col];
    if (value !== 0)
    {
      return;
    }
    var currentPlayer = this.state.currentPlayer;

    //set the correct tile
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState :arr});
    //switch to other player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer :nextPlayer});


    //Check for winners

    var winner = this.getWinner();
    if (winner == 1){
      Alert.alert("Player 1 Won");
      this.initilizeGame();
    }
    else if(winner = -1)
    {
    Alert.alert("Player 2 Won");
    this.initilizeGame();
    }
  }

  onNewGamePress = () =>{
    this.initilizeGame();
  }

  renderIcon = (row , col) => {
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name = "close" style = {styles.tileX}></Icon>;
      case -1: return <Icon name = "circle-outline" style = {styles.tileO}></Icon>;
      default : return <View></View>
    }
  }
  return (
    <View style = {styles.container}>
      <View style = {{flexDirection : "row" , alignItems : "center" , justifyContent : "center"}}>
        <TouchableOpacity onPress ={() =>this.onTilePress(0,0)}  style = {[styles.tile , {borderLeftWidth :0 , borderTopWidth : 0}]}>
        {this.renderIcon(0,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress ={() =>this.onTilePress(0,1)} style = {[styles.tile ,{borderTopWidth: 0 }]}>

        {this.renderIcon(0,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress ={() =>this.onTilePress(0,2)} style = {[styles.tile ,{borderTopWidth : 0 , borderRightWidth : 0}]}>
        {this.renderIcon(0,2)}
        </TouchableOpacity>
      </View>

      <View style = {{flexDirection : "row"}}>
        <TouchableOpacity onPress ={() =>this.onTilePress(1,0)} style = {[styles.tile ,{borderLeftWidth : 0}]}>
        {this.renderIcon(1,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress ={() =>this.onTilePress(1,1)} style = {[styles.tile ,{}]}>
        {this.renderIcon(1,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress ={() =>this.onTilePress(1,2)} style = {[styles.tile ,{borderRightWidth : 0}]}>
        {this.renderIcon(1,2)}
        </TouchableOpacity>
      </View>


      <View style = {{flexDirection : "row"}}>
        <TouchableOpacity onPress ={() =>this.onTilePress(2,0)} style = {[styles.tile ,{borderLeftWidth : 0 , borderBottomWidth : 0}]}>
        {this.renderIcon(2,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress ={() =>this.onTilePress(2,1)} style = {[styles.tile ,{borderBottomWidth : 0}]}>
        {this.renderIcon(2,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress ={() =>this.onTilePress(2,2)} style = {[styles.tile ,{borderBottomWidth : 0 , borderRightWidth : 0}]}>
        {this.renderIcon(2,2)}
        </TouchableOpacity>
      </View>
      <View style = {{paddingTop :50}}>
      <Button> title = "New Game" onPress ={this.onNewGamePress} </Button>
      </View>
    </View>
    
  );
    
     
  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  tile: {
    borderWidth :5,
    width : 100,
    height :100,
  },
  container : {
    flex :1 ,
    backgroundColor : '#fff',
    alignItems : 'center',
    justifyContent : 'center',
  },
  tileX : {
    color : "red",
    fontSize : 60,
   
  },
  tileO : {
    color : "green",
    fontSize : 60,
   
 
    

  }
});

export default App;
