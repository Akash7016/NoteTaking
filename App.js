import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';

import { StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Intro from './components/Intro';
import NoteScreen from './components/NoteScreen';
import NoteDetail from './components/NoteDetail';
import NoteProvider from './components/NoteProvider';

const Stack = createStackNavigator();

export default function App() {
  
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const renderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: '', headerTransparent: true }}
        >
          <Stack.Screen component={renderNoteScreen} name='NoteScreen' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
