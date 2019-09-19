import React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class Splash extends React.Component {
  constructor(props) {
    super(props);
}

componentDidMount() {
    setTimeout(() => {
        this.props.navigation.navigate('Home')
    }, 2500);
}

render() {
    return (
        <View style={styles.container}>
            
                <Image
                    style={{ width: 200, height: 150, borderWidth: 0, }}
                    source={require('../assets/quiz.png')}
                    resizeMode='contain'
                />
            
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    }
  })

export default Splash;