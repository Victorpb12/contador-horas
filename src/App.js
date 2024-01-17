import NoteDetail from './app/components/NoteDetail';
import NoteScreen from './app/screens/NoteScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerTitle: '', headerTransparent: true}}>
        <Stack.Screen component={NoteScreen} name='NoteScreen'/>
        <Stack.Screen component={NoteDetail} name='NoteDetail'/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
