/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Button, TextInput, TouchableOpacity, ActivityIndicator, YellowBox } from 'react-native';
import { Container, Header, Content, Badge, Text, Icon, Form, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase';
class SignupDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            loader: false
        }
    }
    static navigationOptions = {
        title: 'SignUp',
        headerTitleStyle: {
            flex: 1,
            alignSelf: 'center',
            textAlign: 'center'
        },
        headerRight: (<View></View>),
        headerLeft: (<View></View>)

    };


    componentWillMount() {
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
    }

    replaceScreen = (route) => {
        // const { locations, position } = this.props.navigation.state.params;
        this.props.navigation.dispatch({
            type: 'ReplaceCurrentScreen',
            key: `${route}`,
            routeName: `${route}`,

        });
    };

    _signUp = () => {
        let { navigate } = this.props.navigation;
        // navigate('LogIn')
        this.setState({ loader: true })

        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {



                this.setState({ loader: false })
                navigate('LogIn')


            }).catch(error => {
                alert(error.message)
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputWrapper}>
                    <Item style={styles.input}>
                        <Icon name="ios-person" style={{ color: '#000' }} />
                        <Input placeholder="Username" onChangeText={(value => this.setState({ name: value }))} />
                    </Item>
                    <Item style={styles.input}>
                        <Icon name="ios-mail" style={{ color: '#000' }} />
                        <Input placeholder="Email" onChangeText={(value => this.setState({ email: value }))} />
                    </Item>
                    <Item last style={styles.input}>
                        <Icon name="ios-unlock" style={{ color: '#000' }} />
                        <Input placeholder="Password"
                            secureTextEntry
                            onChangeText={(value => this.setState({ password: value }))}
                            onSubmitEditing={this._signUp}
                        />
                    </Item>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            Already have an Account ?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')}>
                            <Text>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.loader ?
                            <View style={{ flex: 1, paddingTop: 20 }}>
                                <ActivityIndicator />
                            </View> :
                            null
                    }

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        marginBottom: 20,
    },
    inputWrapper: {
        padding: 20
    }

});

export default SignupDemo;