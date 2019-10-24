import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class CadastroPessoa extends Component {
    static navigationOptions = {
        title: 'Cadastro de Pessoas',
    };
    constructor(props) {
        super(props);
        this.state = {
            nome: ''
        }
    }
    atualizaValor(texto, campo) {
        if (campo == 'nome') {
            this.setState({
                nome: texto,
            })
        }
    }
    submit() {
        let collection = {}
        collection.nome = this.state.nome
        var url = 'http://192.168.1.8:8080/pessoa';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(collection),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            res.json();
            Actions.lista();
        }
        )
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.container} maxLength={50}
                    placeholder="Nome"
                    onChangeText={(texto) => this.atualizaValor(texto, 'nome')}
                />
                <Button
                    onPress={() => this.submit()}
                    style={styles.btn}
                    title="Enviar"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        color: '#000000',
        textAlign: 'center',
        borderColor: '#000000',
        backgroundColor: '#F5FCFF',
        flex: 1,
        justifyContent: 'center',

    },
    enviar: {
        marginTop: 50,
    },
    btn: {
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 100,
        paddingBottom: 50,
        backgroundColor: 'skyblue',
        height: 40,
        color: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CadastroPessoa;