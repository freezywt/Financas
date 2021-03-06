import React , { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { format, isPast } from 'date-fns';

import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList/index';
import { AuthContext } from '../../contexts/auth';

import { Background, Container, Nome, Saldo, Title, List } from './styles';

export default function Home() {

  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico')
      .child(uid)
      .limitToLast(10).on('value', (snapshot)=>{
        setHistorico([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor,
            date: childItem.val().date,
          };
          
          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })

    }
    loadList();
  },[]);

function handleDelete(data){
  if( isPast(new Date(data.date))){
    //se a data do registro ja passou, vai entrar aqui
    alert('voce nao pode excluir um registro antigo');
    return;
  }

  Alert.alert(
    'Cuidado Atencao',
    `Voce deseja excluir ${data.tipo} - Valor: ${data.valor}`,
    [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Deletar',
        onPress: () => handleDeleteSucess(data)
      }
    ]
  )
}

async function handleDeleteSucess(data) {
  await firebase.database().ref('historico')
  .child(uid).child(data.key).remove()
  .orderByChild('date').equalTo(format(new Date, 'dd/MM/yy'))
  .then(async () => {
    let saldoAtual = saldo;
    data.tipo == 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

    await firebase.database().ref('users').child(uid)
    .child('saldo').set(saldoAtual);
  })
  .catch((error) =>{
    console.log
  })
}

 return (
   <Background>
     <Header />
     <Container>
       <Nome>{user && user.nome}</Nome>
       <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
     </Container>
     <Title>??ltimas movimenta????es</Title>
     
     <List 
      showsVerticalScrollIndicator={false} 
      data={historico}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete}/>)}
     />

   </Background>
  );
}