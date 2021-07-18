import * as React from 'react';
import { View, Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs,TransitionPresets,CardStyleInterpolators } from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/core';
import { Easing, Transition } from 'react-native-reanimated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
function HomeScreen({navigation}) {
  navigation.setOptions(
    {
      headerRight:()=>(
        <Button title="save" 
        onPress={() => {
          navigation.replace('Home');
        }}
        />
      )
    });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Settings Screen" onPress={()=> navigation.navigate('Settings')}></Button>
    </View>
  );
}

function SettingsScreen() {
  const isFocused = useIsFocused()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color:isFocused?'green':'black'}}>Setting Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const closeConfig={
  animation:'timing',
  config:{
    duration:500,
    easing:Easing.linear
  }
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        CardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
        //transitionSpec:{
          //open:config,
          //close: closeConfig
        //}
      }}
      headerMode="float"
      >
        <Stack.Screen
        options={{title :'This is home screen'}} 
        name="Home" component={MyTabs} />
        <Stack.Screen
        options={{title :'This is settings screen'}} 
        name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const config = {
  animation: 'spring',
  config: {
    stiffness: 900,
    damping: 100,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
export default App;