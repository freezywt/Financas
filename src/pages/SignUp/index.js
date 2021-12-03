import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { Platform } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from './../SignIn/styles';

export default function SignUp() {

const [ nome, setNome]          = useState('');
const [ email, setEmail ]       = useState('');
const [ password, setPassword ] = useState('');

const { signUp, loadingAuth } = useContext(AuthContext);

function handleSignUp() {
  signUp(email, password,nome);
}

 return (
   <Background>
       <Container behavior={ Platform.OS === 'ios' ? 'padding' : ''} enabled>
          <AreaInput>
            <Input placeholder="nome" autoCorrect={false} autoCapitalize="none" value={nome} onChangeText={(text) => setNome(text)}/>
            <Input placeholder="email"    autoCorrect={false} autoCapitalize="none" value={email} onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="password" autoCorrect={false} autoCapitalize="none" value={password} onChangeText={(text) => setPassword(text)} securteTextEntry={true}/>
          </AreaInput>
          <SubmitButton onPress={handleSignUp}>
            {
              loadingAuth ? (
                <ActivityIndicator size={20} color="#fff"/>
              ) : (
                <SubmitText>Cadastrar</SubmitText>
              )
            }
          </SubmitButton>
       </Container>
   </Background>
  );
}