import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginDemo from '../Component/login';
import SignupDemo from '../Component/signup';
import ScanScreen from '../Component/QrCode';
import Home from '../Component/Home';









const AppOpening = StackNavigator({

  SignUp: {
    screen: SignupDemo,
  },
  LogIn: {
    screen: LoginDemo,
  },
  ScanScreen: {
    screen: ScanScreen
  },
  Home: {
    screen: Home
  },
 


}, {
    initialRouteName: 'LogIn'
  }
)

export default class App extends React.Component {
  render() {
    try {
      return <AppOpening />


    } catch (error) {
      alert(error);
    }
  }
}


const prevGetStateForActionHomeStack = AppOpening.router.getStateForAction;
AppOpening.router.getStateForAction = (action, state) => {
  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetStateForActionHomeStack(action, state);
};

