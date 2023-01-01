
import { View, StatusBar } from 'react-native';
import SignIn from './src/pages/SignIn/indx';

export default function App() {
  return (
    <View>
      <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" transLucent={false} />
      <SignIn/>
    </View>

  );
}


