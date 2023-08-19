import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AddNewItems } from '../screens/AddNewItems';
import { Home } from '../screens/Home';
import { CreateShoppingListScreen } from '../screens/CreateShoppingListScreen';
import { ShoppingListsScreen } from '../screens/ShoppingListsScreen';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Text } from 'native-base';

import { MaterialIcons } from '@expo/vector-icons'
import { getShoppingListId } from '@storage/shoppingList/getShoppingListId';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LoadingIndicator } from '@components/Loading/styles';
import { useFocusEffect } from '@react-navigation/native';
import { useShoppingList } from '@hooks/useShoppingList';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AppRoutes = {
  CreateShoppingListsScreen: undefined,
  ShoppingListsScreen: undefined,
  AddNewItems: {
    id: string,
  },
  Home: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>


const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes(){
  const { id, isLoading } = useShoppingList()

  const {COLORS} = useTheme()

  if (isLoading){
    return <LoadingIndicator/>
  } else {
  return (
    <Navigator 
      initialRouteName={id != '' ? 'Home' : 'CreateShoppingListsScreen'}
      sceneContainerStyle={{
        flex: 1,
        backgroundColor: COLORS.WHITE
      }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
      }}
      >
       <Screen 
        name='Home'
        component={gestureHandlerRootHOC(Home)}
        listeners={{
          tabPress: e => {
            if (id == ''){
              e.preventDefault()
            }      
          },
        }}
        options={{
          tabBarIcon: ({ focused }) => <MaterialIcons name='shopping-cart' size={16} color={focused ? 'green' : COLORS.GRAY_300} />,
          tabBarLabel: ({ focused }) => (
            <Text pl={4} color={focused ? COLORS.RED_500 : COLORS.GRAY_300}>Lista atual</Text>
          ),
        }}
      />
      <Screen 
        name='CreateShoppingListsScreen'
        component={gestureHandlerRootHOC(CreateShoppingListScreen)}
        options={{
          tabBarButton: () => null,
        }}

      />
      <Screen 
        name='ShoppingListsScreen'
        component={gestureHandlerRootHOC(ShoppingListsScreen)}
        options={{
          tabBarIcon: ({focused}) => <MaterialIcons name='list' size={16} color={focused ? 'green' : COLORS.GRAY_300} />,
          tabBarLabel: ({ focused }) => (
            <Text pl={4} color={focused ? COLORS.RED_500 : COLORS.GRAY_300}>Minhas compras</Text>
          ),
        }}
      />
      <Screen 
        name='AddNewItems'
        component={gestureHandlerRootHOC(AddNewItems)}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )}
}