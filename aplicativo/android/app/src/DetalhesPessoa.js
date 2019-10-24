import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class DetalhesPessoa extends Component {
    static navigationOptions = {
        title: 'Detalhes Da Pessoa',
    };
    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.nome,
        }
    }
    alterar() {
        let collection = {}
        collection.nome = this.state.nome
        var url = 'http://192.168.1.8:8080/pessoa/' + this.props.id;

        fetch(url, {
            method: 'PUT',
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
                <TextInput style={styles.container}
                    placeholder="Nome"
                    onChangeText={(nome) => this.setState({ nome })}
                    value={this.state.nome}
                />
                <Button title="Alterar" color="green"
                    onPress={() => {
                        this.alterar();
                    }}
                    style={styles.btn}
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

    }
});

export default DetalhesPessoa;