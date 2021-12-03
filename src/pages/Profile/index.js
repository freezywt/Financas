import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { View, Text } from 'react-native';
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from '../Profile/styles';
import Header from '../../components/Header/index';

export default function Profile() {

const navigation = useNavigation();
const { user, signOut } = useContext(AuthContext);

 return (
   <Container>
       <Header />
       <Nome>
           {user && user.nome}
       </Nome>
       <NewLink onPress={ () => navigation.navigate('Registrar')}>
           <NewText>Registrar Gastos</NewText>
       </NewLink>

       <Logout>
           <LogoutText onPress={() => signOut()}>Sair</LogoutText>
       </Logout>
   </Container>
  );
}