import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback } from "react-native";
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App(){
  const screenWidth= Dimensions.get("screen").width;
  const screenHeight= Dimensions.get("screen").height;
  const birdLeft = screenHeight / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight/2);
  const [ObstaclesLeft, setObstaclesLeft]= useState(screenWidth);
  const [ObstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth/2 + 30);//bug
  const [ObstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [ObstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [isGameOver, setisGameOver] = useState(false);//bug
  const [score, setScore]=useState(0);
  const gravity = 3;
  let ObstaclesWidth=60;
  let ObstaclesHeight=300;
  let gap = 100;
  let gameTimerId;
  let ObstaclesTimerId;
  let ObstaclesTimerIdTwo;

  //start bird falling

  useEffect(() => {
    if(birdBottom > 0){
      gameTimerId= setInterval(() =>{
        setBirdBottom(birdBottom => birdBottom - gravity);
      },30);
      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [birdBottom]);
  console.log(birdBottom);

  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom((birdBottom) => birdBottom + 50 );
      console.log('jumped');
    }
  };

  //start first obstacle

  useEffect(() => {
    if(ObstaclesLeft > - 60){
      ObstaclesTimerId = setInterval(() => {
        setObstaclesLeft(ObstaclesLeft => ObstaclesLeft - 5)
      }, 30)
      return() => {
        clearInterval(ObstaclesTimerId)
      }
    } else{
      setScore(score => score + 1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
    }
  }, [ObstaclesLeft]);

  //start second obstacle

  useEffect(() => {
    if(ObstaclesLeftTwo > -60){
      ObstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(ObstaclesLeftTwo => ObstaclesLeftTwo - 5)
      }, 30)
      return() => {
        clearInterval(ObstaclesTimerIdTwo)
      }
    } else{
      setScore(score => score + 1)
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo( - Math.random() * 100)
    }
  }, [ObstaclesLeftTwo]);

  // check for collisions

  useEffect(() => {
    console.log(ObstaclesLeft)
    console.log(screenWidth/2)
    console.log(ObstaclesLeft > screenWidth/2)

    if(
      ((birdBottom < (ObstaclesNegHeight + ObstaclesHeight+30 ) || 
      birdBottom > (ObstaclesNegHeight + ObstaclesHeight +gap - 30)) &&
      (ObstaclesLeft > screenWidth/2 - 30 && ObstaclesLeft < screenWidth/2+30)
      )
      ||
      ((birdBottom < (ObstaclesNegHeightTwo + ObstaclesHeight+30 ) || 
      birdBottom > (ObstaclesNegHeightTwo + ObstaclesHeight +gap - 30)) &&
      (ObstaclesLeftTwo > screenWidth/2 - 30 && ObstaclesLeftTwo < screenWidth/2+30)
      )
    )
    {
      console.log('game over')
      isGameOver()
    }
  })

  const GameOver=() => {
    clearInterval(gameTimerId)
    clearInterval(ObstaclesTimerId)
    clearInterval(ObstaclesTimerIdTwo)
    setisGameOver(true) //bug
  }

  return(
    <TouchableWithoutFeedback onPress={jump}>
    <View style={StyleSheet.container}>
      {isGameOver && <Text style={{fontSize:'30px'}}>{score}</Text>}
      <Bird
      birdBottom={birdBottom}
      birdLeft={birdLeft}
      />
      <Obstacles
      color={'green'}
      ObstaclesWidth={ObstaclesWidth}
      ObstaclesHeight={ObstaclesHeight}
      randomBottom={ObstaclesNegHeight}
      gap={gap}
      ObstaclesLeft={ObstaclesLeft}
      />
      <Obstacles
      color={'yellow'}
      ObstaclesWidth={ObstaclesWidth}
      ObstaclesHeight={ObstaclesHeight}
      randomBottom={ObstaclesNegHeightTwo}
      gap={gap}
      ObstaclesLeft={ObstaclesLeft}
      />
      </View>
      </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'blue'
  },
});