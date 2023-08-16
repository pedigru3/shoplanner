import { Container, Description, Title } from './styles';
import { Alert, Image, ScrollView } from 'react-native';
import WelcomeImage from '../../assets/welcome-image.png'
import { Button } from '../../components/Button';

import { Realm, useApp } from '@realm/react'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { useEffect, useState } from 'react';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const [isAuthing, setIsAuthing] = useState(false)

  const app = useApp()

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email']
  })

  function handleGoogleSignIn(){
    setIsAuthing(true)
    googleSignIn().then((response) => {
      if (response.type !== 'success'){
        setIsAuthing(false)
      }
    })
  }

  useEffect(() => {
    if (response?.type === 'success'){
      if (response.authentication?.idToken){
        fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`)
        .then(response => response.json())
        .then(console.log)

        const credentials = Realm.Credentials.jwt(response.authentication.idToken)
        console.log('Credenciais', credentials)

        app.logIn(credentials).catch((error) => {
          console.log(error)
          Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google')
          setIsAuthing(false)
        })

      }
    } else {
      Alert.alert('Entrar', 'Não foi possível conectar-se a sua conta Google')
      setIsAuthing(false)
    }
  }, [response])

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
    <Container>
      <Title>Planeje suas{'\n'}compras e {'\n'}evite imprevistos</Title>
      <Image source={WelcomeImage}/>
      <Description>Com o Shoplanner você sabe exatamente o que comprar e qual é o supermercado mais em conta.</Description>
      <Button 
        type='SECONDARY'
        title='Iniciar com Google'
        isLoading={isAuthing}
        onPress={handleGoogleSignIn}
      />
    </Container>
    </ScrollView>
  );
}