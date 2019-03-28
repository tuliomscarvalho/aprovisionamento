import React, { Component } from 'react';
import Main from '../templates/Main'
import axios from 'axios'
import Checkbox from '../checkbox/Checkbox';


const headerProps = {
    icon: 'user',
    title: 'Configuração PPoE',
    subtitle: 'Configurar usuário e senha PPoE. Lista e exclui ONUs.'
}

/*
const baseUrl = '192.168.8.87:8080/TesteWebservice/anm/192.168.8.87/onu'
const initialState = {
    user: {mac: '', number: '', olt: ''},
    list: []
}
*/

const baseUrl = 'http://localhost:3002/user'
const initialState = {
    user: { id: '', datahora: '', comando: '', envio: '', resultado: ''},
    list: [
        { id: '1', datahora: '23/01 10:00:23', comando: 'Alterar SSID', envio: "Sucesso", resultado: "Sucesso", usuario: "João" },
        { id: '2', datahora: '23/01 10:02:34', comando: 'Alterar senha PPOE', envio: "Falhou", resultado: "Falhou", usuario: "Lucas" },
        { id: '3', datahora: '23/01 10:02:53', comando: 'Alterar VLAN', envio: 'Sucesso', resultado: "Em andamento", usuario: "Fernanda" },
        { id: '4', datahora: '23/01 10:03:21', comando: 'Alterar senha wifi', envio: 'Sucesso', resultado: "Sucesso", usuario: "Leticia" },
        { id: '5', datahora: '23/01 10:04:33', comando: 'Alterar Canal', envio: "Falhou", resultado: "Falhou", usuario: "Carlos" },
        { id: '6', datahora: '23/01 10:04:58', comando: 'Alterar usuário PPOE', envio: "Em andamento", resultado: "Sucesso", usuario: "Jessica"}
    ],
    usuarioPPOE: '',
    senhaPPOE: '',
    selecao: 'Selecionar todos',
    selectUsuario: false,
    selectSenha: false,
    selectVlan: false
}

export default class PPOE extends Component {
    
    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    selecionarTodos() {
        if(this.state.selecao === "Selecionar todos"){
            this.setState({
                selectUsuario: true,
                selectSenha: true,
                selectVlan: true,
                selecao: "Limpar todos"
            })
        }else{
            this.setState({
                selectUsuario: false,
                selectSenha: false,
                selectVlan: false,
                selecao: "Selecionar todos"
            })
        }
        
    }

    configPPOE(user, usuario, senha){
        axios.get(`http://192.168.2.126:8080/TesteWebservice/roteador/configppoe/${user.mac}/${usuario}/${senha}`)
            .then(function(response){
                console.log(response.data); // ex.: { user: 'Your User'}
                console.log(response.status); // ex.: 200
            });
    }

    /*trocassid(){
        axios.get('https://api.github.com/users/' + username)
            .then(function(response){
        console.log(response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
        }); 
    }*/

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
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

/*
    renderRows(){
        return this.state.list.map( user => {
            return (
                <tr key={user.number}>
                    <td>{user.number}</td>
                    <td>{user.mac}</td>
                    <td>{user.olt}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderForm(){
        return (
            <div className='form'>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" 
                                className="form-control" 
                                name="mac"
                                value={this.state.user.mac}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" 
                                className="form-control" 
                                name="olt"
                                value={this.state.user.olt}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
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
*/

renderRows(){
    return this.state.list.map( user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.datahora}</td>
                <td>{user.comando}</td>
                <td>{user.envio}</td>
                <td>{user.resultado}</td>
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
                        <label>ONU</label>
                        <input type="text" 
                            className="col-12 form-control" 
                            id="onu"
                            placeholder="Digite o ONU..." />
                    </div>
                </div>
                <div className="col-8 col-md-4">
                    <div className="form-group">
                        <label>CPF</label>
                        <input type="text" 
                            className="col-12 form-control" 
                            id="cpf"
                            placeholder="Digite o CPF..." />
                    </div>
                </div>
                <div className="col-8 col-md-4">
                    <div className="form-group">
                        <label>Contrato</label>
                        <input type="text" 
                            className="col-12 form-control" 
                            id="contrato"
                            placeholder="Digite o contrato..." />
                    </div>
                </div>
            </div>
            <hr/>
            <th>Configurar usuário e senha PPoE</th>
            <hr/>
            <div className="row">
                <div className="col-10 col-md-3">
                    <div className="form-group">
                        <label>Usuário</label>
                        <input type="text" 
                            className="col-12 form-control" 
                            id="usuarioPPOE"
                            placeholder="Digite o usuário..." />
                    </div>
                </div>
                <div className="mt-4">
                <Checkbox id="boxUsuario" isSelected={this.state.selectUsuario}></Checkbox>
                </div>
                <div className="col-10 col-md-3">
                    <div className="form-group">
                        <label>Senha</label>
                        <input type="text" 
                            className="col-12 form-control" 
                            id="senhaPPOE"
                            placeholder="Digite a senha..." />
                    </div>
                </div>
                <div className="mt-4">
                    <Checkbox id="boxSenha" isSelected={this.state.selectSenha}></Checkbox>
                </div>
                <div className="col-10 col-md-3">
                    <div className="form-group">
                        <label>VLAN</label>
                        <input type="text" 
                            className="col-12 form-control" 
                            id="vlan"
                            placeholder="Digite o VLAN..." />
                    </div>
                </div>
                <div className="mt-4">
                    <Checkbox id="boxVlan" isSelected={this.state.selectVlan}></Checkbox>
                </div>
            </div>
            <label className="col-14 d-flex justify-content-end">* <span className="text-danger"> Campos obrigatórios</span></label>
            <hr/>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={e => this.configPPOE(e, this.state.user, this.state.usuarioPPOE, this.state.senhaPPOE)}
                        /*onClick={e => this.save(e)}*/>
                        Atualizar Selecionados
                    </button>
                    <button className="btn btn-secondary ml-2"
                        onClick={() => this.selecionarTodos()}>
                        {this.state.selecao}
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