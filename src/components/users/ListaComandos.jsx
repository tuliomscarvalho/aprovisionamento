import React, { Component } from 'react';
import Main from '../templates/Main'
import api from '../users/api'
import axios from 'axios'
import { Link } from 'react-router-dom'

const headerProps = {
    icon: 'list',
    title: 'Gerenciamento de Requisições',
    subtitle: 'Lista de comandos executados'
}

/*
const baseUrl = '192.168.8.87:8080/TesteWebservice/anm/192.168.8.87/onu'
*/

const baseUrl = 'http://localhost:3002/user'
const initialState = {
    user: { id: '', datahora: '', comando: '', envio: '', resultado: '', usuario: ''},
    list: [],
}

export default class ListaComandos extends Component {
    
    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    onuONOFF(user,situacao){
        let novoSituacao = situacao.options[situacao.selectedIndex].value;
        api.get(`http://192.168.2.126:8080/TesteWebservice/roteador/trocarcanal/${user.mac}/${novoSituacao}`)
            .then(function(response){
                console.log(response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
            });
    }

    teste = async () => {
        let resp = await api.get().then(function(response){
            this.setState({list: response.data});
        });
        console.log(resp.data);
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post' //se number(id) for verdadeiro(alteração) então put, caso contrario insira com post.
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method]( url, user )
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    load(user) {
        this.setState ({ user })
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            //const list = this.state.list.filter(u => u !== user)
            this.setState({ list })
        })
    }

    getUpdatedList(user, add=true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        //list.unshift(user)
        return list
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderTable(){
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data/Hora</th>
                        <th>Comando</th>
                        <th>Envio</th>
                        <th>Resultado</th>
                        <th>Usuário</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

renderRows(){
    return this.state.list.map( user => {
        return (
            <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.datahora}</td>
                    <td>{user.comando}</td>
                    <td>{user.envio}</td>
                    <td>{user.resultado}</td>
                    <td>{user.usuario}</td>
            </tr>
        )
    })
}

renderForm(){
    return (
        <div className='form'>
            <div className="row">
                <div className="col-8 col-md-4">
                    <div className="form-group">
                        <label>Usuários</label>
                        <select type="text" 
                            className="form-control" 
                            id="usuarios">
                                <option value="" defaultValue > Selecione o usuário... </option>
                                <option value="servidor1"> João Carlos </option>
                                <option value="servidor2"> Lucas Henrique </option>
                                <option value="servidor3"> Gabriel Oliveira </option>
                                <option value="servidor4"> Fernanda Avila </option>
                                <option value="servidor5"> Leticia Campos </option>
                        </select>
                    </div>
                </div>
                <div className="col-8 col-md-4">
                    <div className="form-group">
                        <label>Data inicial</label>
                        <input type="date" 
                            className="form-control" 
                            id="datainicial"
                            placeholder="Digite a data inicial..."
                        />
                    </div>
                </div>
                <div className="col-8 col-md-4">
                    <div className="form-group">
                        <label>Data final</label>
                        <input type="date" 
                            className="form-control" 
                            id="datafinal"
                            placeholder="Digite a data final..."
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                        Pesquisar
                    </button>
                    <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}
    
    render() {
        return(
            <Main {...headerProps}>
               {this.renderForm()}
               {this.renderTable()}
            </Main>
        )
    }
    
}