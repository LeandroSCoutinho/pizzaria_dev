import React from 'react';

import {ActivityIndicator, View} from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes(){
  const isAuthenticated = false;
  const loading = false;

  if(loading){
    <View style={{
     flex:1,
     backgroundColor:'#F5F7FB',
     justifyContent: 'center',
     alignItems: 'center'
     }}>
      <ActivityIndicator size={60} color="#FFF"/>
    </View>
  }


  return(
    isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
  )
}


export default Routes;