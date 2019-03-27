import React, { Component } from 'react';
import Main from '../templates/Main'
import api from '../users/api.js'
import axios from 'axios'

const headerProps = {
    icon: 'wifi',
    title: 'Gerenciamento de Contratos',
    subtitle: 'Busca de contratos por CPF.'
}

/*
const baseUrl = '192.168.8.87:8080/TesteWebservice/anm/192.168.8.87/onu'
const initialState = {
    user: {mac: '', number: '', olt: ''},
    list: []
}
*/

//const baseUrl = 'http://localhost:3001/onu'
const initialState = {
    user: { id: '', endereco: '', onu: '' },
    list: [ ]
}

export default class ContratosCpf extends Component {
    
    state = {...initialState}

    componentWillMount() {
        //axios(baseUrl).then(resp => {
            //this.setState({ list: resp.data })
        //})
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post' //se number(id) for verdadeiro(alteração) então put, caso contrario insira com post.
        //const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        //axios[method]( url, user )
        //    .then(resp => {
        //        const list = this.getUpdatedList(resp.data)
        //        this.setState({ user: initialState.user, list })
        //    })
    }

    busca(){
        var cpf = document.getElementById('cpf').value;
        if(cpf!==''){
            this.setState({
                list: [{ id: 1, endereco: 'Rua xyz', onu: '192.168.1.4' },
                { id: 2, endereco: 'Av. xyz', onu: '192.168.4.7' },
                { id: 3, endereco: 'Rua xyzasdfg', onu: '192.168.2.9' }]
            })
        }else{
            
        }
    }

    load(user) {
        this.setState ({ user })
    }

    remove(user){
        //axios.delete(`${baseUrl}/${user.id}`).then(resp => {
        //    const list = this.getUpdatedList(user, false)
            //const list = this.state.list.filter(u => u !== user)
        //    this.setState({ list })
        //})
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
                        <th>Contrato</th>
                        <th>Endereço</th>
                        <th>ONU</th>
                        <th>Ações</th>
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
                <td>{user.endereco}</td>
                <td>{user.onu}</td>
                <td>
                    <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                        <i className="fa fa-retweet" text="Conectar ONU"></i>
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
                        <label>CPF*</label>
                        <input type="text" 
                            className="form-control" 
                            id="cpf"
                            placeholder="Digite o CPF..." />
                    </div>
                </div>
            </div>
            <label className="col-14 d-flex justify-content-end">* <span className="text-danger"> Campos obrigatórios</span></label>
            <hr/>
            <div className="row">
                <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-primary"
                        onClick={e => this.busca(e)}>
                        Pesquisar
                    </button>
                    <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                        Limpar
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