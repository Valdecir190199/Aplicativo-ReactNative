import React from "react";

import { Scene, Router, Stack } from "react-native-router-flux";
import CadastroPessoa from "./CadastroPessoa";
import ListaPessoas from "./ListaPessoas";
import DetalhesPessoa from "./DetalhesPessoa";


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            key="cadastroPessoa"
            component={CadastroPessoa}
            title="Cadastro de Pessoas"
          />
          <Scene key="lista"
            component={ListaPessoas}
            title="lista de pessoas"
            initial
          />
          <Scene key="detalhes"
            component={DetalhesPessoa}
            title="Detalhes Da Pessoa"

          />
        </Stack>
      </Router>
    )
  }
}

