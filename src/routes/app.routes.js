import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home/index';
import New from '../pages/New';
import Profile from '../pages/Profile';

const AppDrawer = createDrawerNavigator();

function AppRoutes(){
    return(
        <AppDrawer.Navigator screenOptions={{
            drawerStyle:{
              backgroundColor: '#131313',
            },
            drawerLabelStyle: {
                fontWeight: 'bold'
            },
            drawerActiveTintColor: '#fff',
            drawerActiveBackgroundColor: '#00B94A',
            drawerInactiveBackgroundColor: '#090909',
            drawerInactiveTintColor: '#ddd',
            drawerItemStyle: {
                marginVertical: 5,
            },
            headerShown: false
          }}>
            <AppDrawer.Screen name="Home" component={Home}/>
            <AppDrawer.Screen name="Registrar" component={New}/>
            <AppDrawer.Screen name="Perfil" component={Profile}/>
        </AppDrawer.Navigator>
    )
}

export default AppRoutes;