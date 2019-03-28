import React, { Component } from 'react';
import Main from '../templates/Main'
import api from '../users/api'
import axios from 'axios'
import { Link } from 'react-router-dom'

const headerProps = {
    icon: 'list',
    title: 'Gerenciamento de ONUs',
    subtitle: 'Lista de ONUs.'
}

/*
const baseUrl = '192.168.8.87:8080/TesteWebservice/anm/192.168.8.87/onu'
*/

const baseUrl = 'http://localhost:3001/onu'
const initialState = {
    user: { id: '', cpf: '', mac: '', tipoonu: ''},
    list: [
        { "id": 1, "cpf": 34576523478, "mac": "FHTT10841e60", "tipoonu": "xima" },
        { "id": 2, "cpf": 72537749045, "mac": "FHTT10841e70", "tipoonu": "fiberhome" },
        { "id": 3, "cpf": 15263533280, "mac": "FHTT10841e80", "tipoonu": "tplink" },
        { "id": 4, "cpf": 98254562776, "mac": "FHTT10841e90", "tipoonu": "ximacompleta" },
        { "id": 5, "cpf": 25637109409, "mac": "FHTT10841e67", "tipoonu": "tplink" },
        { "id": 6, "cpf": 15275509837, "mac": "FHTT10841e68", "tipoonu": "fiberhome" }
    ],
}

export default class ListaONUs extends Component {
    
    state = {...initialState}

    /*constructor(props) {
        super(props);
        this.state = {
           macadress: this.state.user.mac,
           olt: this.state.user.olt
        }
    }*/

    /*constructor(usercrud = new UserCrud()){
        this.usercrud = usercrud;
    }

    tryingMethod(user){
        this.usercrud.load(user);
    }*/

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
                        <th>CPF</th>
                        <th>MAC Adress</th>
                        <th>Tipo ONU</th>
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
                <td>{user.cpf}</td>
                <td>{user.mac}</td>
                <td>{user.tipoonu}</td>
                <td>
                    <button className="btn btn-warning"
                        onClick={() => this.load(user)}>
                        <i className="fa fa-pencil"></i>
                    </button>
                    <Link to="/canal">
                    <button className="btn btn-style-background-green ml-2"
                        //onClick={() => this.tryingMethod(user)}
                        >
                        <i className="fa fa-key"></i>
                    </button>
                    </Link>
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
                        <label>Servidor ANM</label>
                        <select type="text" 
                            className="form-control" 
                            id="servidoranm">
                                <option value="" defaultValue > Selecione o servidor... </option>
                                <option value="servidor1"> 192.3.45.3 </option>
                                <option value="servidor2"> 192.3.45.4 </option>
                                <option value="servidor3"> 192.3.45.5 </option>
                                <option value="servidor4"> 192.3.45.6 </option>
                                <option value="servidor5"> 192.3.45.7 </option>
                        </select>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label>OLT</label>
                        <select type="text" 
                            className="form-control" 
                            id="olt">
                                <option value="" defaultValue > Selecione a OLT... </option>
                                <option value="servidor1"> 10.71.46.107 </option>
                                <option value="servidor2"> 10.71.46.108 </option>
                                <option value="servidor3"> 10.71.46.109 </option>
                                <option value="servidor4"> 10.71.46.110 </option>
                                <option value="servidor5"> 10.71.46.111 </option>
                        </select>
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