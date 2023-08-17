import 'react-native-get-random-values'

import { Nunito_700Bold, Nunito_400Regular, useFonts } from '@expo-google-fonts/nunito';
import { Jost_400Regular, Jost_700Bold } from '@expo-google-fonts/jost';
import { NativeBaseProvider } from 'native-base';

import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { AppProvider, UserProvider } from '@realm/react'

import { REAML_APP_ID } from '@env'

import { SignIn } from './src/screens/SignIn';
import { Loading } from './src/components/Loading';

import theme from './src/theme';

import { Routes } from './src/routes';
import { RealmProvider } from './src/libs/realm';
import { ShoppingListContextProvider } from './src/context/ShoppingListContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@libs/toast';

export default function App() {

  const [ isFontsLoaded ] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Jost_400Regular,
    Jost_700Bold
  })
  

  return (
    <>
    <AppProvider id={REAML_APP_ID}>
      <ThemeProvider theme={theme}>
        <NativeBaseProvider>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
        {
          isFontsLoaded ?
          <UserProvider fallback={SignIn}>
            <RealmProvider>
              <ShoppingListContextProvider>
                <Routes/>
              </ShoppingListContextProvider>
            </RealmProvider>
          </UserProvider>
          : <Loading/>
        }
        </NativeBaseProvider>
      </ ThemeProvider>
    </AppProvider>
    <Toast config={toastConfig} />
    </>
  );
}
