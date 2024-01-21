import NoteDetail from './app/components/NoteDetail';
import NoteScreen from './app/screens/NoteScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native';
import NoteProvider from './app/contexts/NoteProvider';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator 
          screenOptions={{ headerTitle: '', headerTransparent: true}}>
          <Stack.Screen component={NoteScreen} name='NoteScreen'/>
          <Stack.Screen component={NoteDetail} name='NoteDetail'/>
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

export default App;
