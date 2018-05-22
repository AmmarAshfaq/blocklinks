/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, View, TextInput, Button, TouchableOpacity, ActivityIndicator, YellowBox } from 'react-native';
import { Container, Header, Content, Badge, Text, Icon, Form, Item, Input, Label } from 'native-base';
import firebase from 'react-native-firebase'
class LoginDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loader: false,
        }
        console.log(this.props.navigation);
    }
    static navigationOptions = {
        title: 'Login',
        headerTitleStyle: {
            flex: 1,
            alignSelf: 'center',
            textAlign: 'center'
        },
        headerRight: (<View></View>)
    };

    replaceScreen = (route) => {
        this.props.navigation.dispatch({
            type: 'ReplaceCurrentScreen',
            key: `${route}`,
            routeName: `${route}`,
        });
    };
    componentWillMount() {
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
    }

    _login = () => {
        let { navigate } = this.props.navigation;
        this.setState({ loader: true })
        // navigate('ScanScreen');

        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password).then(user => {
            this.setState({ loader: false })
            navigate('ScanScreen')
        })
            .catch((err) => {
                alert(err.message)
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputWrapper}>
                    <Item style={styles.input}>
                        <Icon name="ios-mail" style={{ color: '#000' }} />
                        <Input placeholder="Email" onChangeText={(value => this.setState({ email: value }))} />
                    </Item>
                    <Item last style={styles.input}>
                        <Icon name="ios-unlock" style={{ color: '#000' }} />
                        <Input placeholder="Password"
                            secureTextEntry
                            onChangeText={(value => this.setState({ password: value }))}
                            onSubmitEditing={this._login}
                        />
                    </Item>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            Don't have an Account ?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text>
                                SignUp
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.loader ?
                            <View style={{ flex: 1, paddingTop: 20 }}>
                                <ActivityIndicator />
                            </View>
                            :
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
        // alignItems: 'center',
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


export default LoginDemo;