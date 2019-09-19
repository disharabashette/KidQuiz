import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, YellowBox, Image } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

YellowBox.ignoreWarnings([
    'Warning: componentWillUpdate is deprecated',
]);


class Quiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //quiz: props.quiz,
            quiz: [],
            value: '',
            correctAns: '',
            correct: 0,
            score: 0,
            min: null,
            sec: null,
            showQuiz: true,
            home: []
        }
        this.minute = 5;
        this.second = 1;
        this.timeStart = null;
        this.timer = this.timer.bind(this);
        this.endQuiz = this.endQuiz.bind(this);
        this.reTake = this.reTake.bind(this);
    }

    getQuiz() {
        fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
            .then(res => res.json())
            .then(data => {
                this.setState({ quiz: data.results })
            })
    }

    timer() {
        this.timeStart = setInterval(() => {
            this.setState({
                min: this.minute,
                sec: this.second
            });
            this.second--;
            if (this.second === 0) {
                this.second = 60;
                this.minute--;
                this.setState({
                    sec: this.second,
                    min: this.minute
                });
                if (this.minute < 0) {
                    this.endQuiz()
                }
            }
        }, 1000);
    }
    endQuiz() {
        clearInterval(this.timeStart);
        var { score, correct, quiz } = this.state;
        this.setState({
            min: 0,
            sec: 0
        });
        score = correct * (100 / quiz.length).toFixed(2);
        this.setState({
            score, showQuiz: false
        });
    }

    reTake() {
        this.minute = 2;
        this.second = 1;
        this.timeStart = null;
        this.setState({
            value: '',
            correctAns: '',
            correct: 0,
            score: 0,
            min: null,
            sec: null,
            showQuiz: true
        })
        this.timer();
    }
    componentDidMount() {
        //this.getQuiz()
        this.getQuiz()
        this.timer()
        
    }

    render() {
        let { quiz, value, correct, min, sec, showQuiz, score, home } = this.state
        return (
            <View style={styles.container}>
                {
                    showQuiz ? (
                        <View>
                            <Text style={styles.timer}>Timer: {min}:{sec}</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>

                                {
                                   quiz.map((v, i) => {

                                        let myArray = [];
                                        myArray.push(v.correct_answer);
                                        v.incorrect_answers.map(value => { myArray.push(value) })
                                        // let shuffledArray = this.shuffle(myArray)
                                        // myArray = [];
                                        // console.log(v, "data****")


                                        var radio_props = myArray.map(radioVal => {
                                            return { label: radioVal, value: radioVal }
                                        });

                                        return (
                                            <View key={`${v.category}_${i}`}>
                                                <Text style={{ marginBottom: 5 }}>Q{i + 1}. {v.question}</Text>

                                                <RadioForm radio_props={radio_props}
                                                    formHorizontal={false}
                                                    labelHorizontal={true}
                                                    buttonColor={'green'}
                                                    animation={false}
                                                    initial={-1}
                                                    onPress={(value) => { this.setState({ value, correct: (value === v.correct_answer) ? ++correct : correct }) }}
                                                />
                                            </View>
                                        )
                                    })

                                }
                                <TouchableOpacity style={styles.btn} onPress={this.endQuiz}>
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>) : (
                            <View style={styles.containerResult}>
                                {score > 50 ?
                                    <Image
                                        style={{ width: 200, height: 150, borderWidth: 0,alignSelf:'center' }}
                                        source={require('../assets/pass.png')}
                                        resizeMode='contain' /> :
                                    <Image
                                        style={{ width: 200, height: 150, borderWidth: 0,alignSelf:'center'  }}
                                        source={require('../assets/fail.jpg')}
                                        resizeMode='contain' />}
                                <Text style={{alignSelf:'center' }}>Total Questions: {quiz.length}</Text>
                                <Text style={{alignSelf:'center' }}>Correct: {correct}</Text>
                                <Text style={{alignSelf:'center' }}>In Correct: {quiz.length - correct}</Text>
                                <Text style={{alignSelf:'center' }}>You scored: {score}%</Text>
                                <Text style={{alignSelf:'center' }}>RESULT: {score > 50 ? "PASS" : "FAIL"}</Text>
                                {score > 50 ? null :
                                    
                                    <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Home')}>
                                        <Text>Retake Quiz</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
    },
    containerResult: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "PacificoRegular"
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
    timer: {
        color: 'red',
        fontSize: 20,
        textAlign: "center",
    }
});


export default Quiz;
