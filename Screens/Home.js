import React from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isquiz: false,
        }
    }

quizstart(){
    //this.setState({isquiz: true})
    if(this.state.isquiz == false) {
        // this.setState({isquiz: true})
        this.props.navigation.navigate('Quiz')
    }
}

  render() {
    const { quiz, isquiz } = this.state;
    return (
        <View style={styles.container}>
        <Image
            style={{ width: 200, height: 150, borderWidth: 0, }}
            source={require('../assets/quiz.png')}
            resizeMode='contain'
        />
        <Text style={{ color: '#08E2E5', fontSize: 25, fontWeight: 'bold' }}>Press Button to Start the quiz</Text>

        {/* <Button color="green" onPress={() => { this.setState({ isquiz: true }) }} title="Start Quiz" /> */}
        <TouchableOpacity style={styles.btn} onPress={() => this.quizstart()}>
            <Text>Start Quiz</Text>
        </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "PacificoRegular",
        opacity: 1,
    },
    btn: {
        backgroundColor: '#17E284',
        padding: 10,
        margin: 15,
        width: 300,
        borderRadius: 100,
        height: 40,
        alignItems: "center",
    },
});


export default Home;
