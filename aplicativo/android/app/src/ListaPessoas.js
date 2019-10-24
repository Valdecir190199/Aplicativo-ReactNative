import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  Button,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class ListaPessoas extends React.Component {

  static navigationOptions = {
    title: 'Lista de Pessoas',
  };

  componentDidMount() {
    fetch("http://192.168.1.8:8080/pessoa")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      }).catch(error => console.log(error)) //to catch the errors if any
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      />

    );
  }
  mudarTela() {
    Actions.cadastroPessoa();
  }

  renderItem = (data) =>
    <TouchableOpacity style={styles.list} onPress={() => {
      Actions.detalhes({ nome: data.item.nome, id: data.item.id });
    }}>
      <View style={styles.fixToText}>
        <Text style={styles.lightText}>{data.item.id} - {data.item.nome}   </Text>
        <Button color="red" title="Excluir" onPress={() => {

          Alert.alert(
            'Confirmar',
            'Deseja Excluir?',
            [
              { text: 'Não', onPress: () => console.log('Voce clicou em não'), style: 'cancel' },
              { text: 'Sim', onPress: () => 
              fetch("http://192.168.1.8:8080/pessoa" + "/" + data.item.id, {
              method: 'DELETE'
              }).then(() => {
              Actions.lista();
            console.log('removed');
              }).catch(err => {
              console.error(err)
            }) },
            ]
          );
        
      }}>
        </Button>
      </View>
    </TouchableOpacity>

  render() {
  if (this.state.loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0c9" />
      </View>
    )
  }
  return (
    <View style={styles.container}>

      <Button
        title="Nova Pessoa"
        onPress={() => this.mudarTela()}
      />

      <FlatList
        data={this.state.dataSource}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        renderItem={item => this.renderItem(item)}
        keyExtractor={item => item.id.toString()}

      />
    </View>
  );

}
}

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  texto: {
    textAlign: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
  },
  btn2: {
    width: 50,
    marginBottom: 0,
    paddingBottom: 0,
    backgroundColor: 'white',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

