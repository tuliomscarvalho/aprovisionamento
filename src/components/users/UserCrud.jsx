import React, { Component } from 'react';
import Main from '../templates/Main'
import axios from 'axios'
//import api from '../users/api.js'
import { Modal } from 'react-bootstrap'
import Checkbox from '../checkbox/Checkbox';

const headerProps = {
    icon: 'wifi',
    title: 'Gerenciamento de ONUs',
    subtitle: 'Altera SSID, senha e canal.'
}

/* 
const baseUrl = '192.168.8.87:8080/TesteWebservice/anm/192.168.8.87/onu'
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
    meumac: '',
    meussid: '',
    titlePopup: '',
    textPopup: '',
    show: false,
    selecao: 'Selecionar todos',
    selectSSID: false,
    selectSenha: false,
    selectCanal: false
}

export default class UserCrud extends Component {
    
    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        });
    }

    /*contagemtempo(t){
        var tempo = t;
        while(tempo>0){
            var intervalo = window.setInterval(lerolero, 1000);
            function lerolero() {
                this.state.textPopup = tempo;
            }
            tempo--;
        }
        clearInterval(intervalo);
    }*/

    selecionarTodos() {
        if(this.state.selecao === "Selecionar todos"){
            this.setState({
                selectSSID: true,
                selectSenha: true,
                selectCanal: true,
                selecao: "Limpar todos"
            })
        }else{
            this.setState({
                selectSSID: false,
                selectSenha: false,
                selectCanal: false,
                selecao: "Selecionar todos"
            })
        }
        
    }

    handleClose() {
        this.setState({ show: false});
        if(this.state.titlePopup === "Alteração de Senha" && this.state.textPopup !== "Senha alterada com sucesso!"){
            this.setState({
                textPopup: "Senha alterada com sucesso!"
            })
            this.handleShow();
        }else if(this.state.titlePopup === "Alteração de SSID" && this.state.textPopup !== "SSID alterado com sucesso!"){
            this.setState({
                textPopup: "SSID alterado com sucesso!"
            })
            this.handleShow();
        }else{
            this.setState({
                textPopup: '',
                titlePopup: ''
            })
        }
    }
    
    handleShow() {
        this.setState({ show: true });

    } 

    /*contagemtempo(tempo){
        this.setState({
            seconds: tempo
        });
        var i = 10;
        for(i=10;i>0;i++){
            this.setState({
                seconds: this.state.seconds - 1
            });
        }
    }*/

    //macteste= 78:30:3b:8f:60:3e
   
    trocarSSID = async () => {
        //var valormac = document.getElementById('mac').value
        var valorssid = document.getElementById('ssid').value
        var valorsenha = document.getElementById('senha').value
        let canal = document.getElementById('canal')
        let valorcanal = canal.options[canal.selectedIndex].value;
        //console.log(valormac);
        console.log(valorssid);
        console.log(valorsenha);
        console.log(valorcanal);
        //if(valorssid==="" && valorsenha!=="" && valormac!==""){
        if(valorssid==="" && valorsenha!=="" && valorcanal===""){
            this.handleShow()
            this.setState({
                titlePopup: "Alteração de Senha",
                textPopup: "Requisição enviada com sucesso"
            })
            
            console.log("ssid vazio")
            //var respostaSenha = await api.get('/trocarsenha/' + valormac + '/' + valorsenha)
            
        //}else if(valorsenha==="" && valorssid!=="" && valormac!==""){
        }else if(valorsenha==="" && valorssid!=="" && valorcanal===""){
            this.handleShow()
            this.setState({
                titlePopup: "Alteração de SSID",
                textPopup: "Requisição enviada com sucesso"
            })
            
            console.log("senha vazia")
            //var respostaSsid = await api.get('/trocarssid/' + valormac + '/' + valorssid)

        }else if(valorsenha==="" && valorssid==="" && valorcanal!==""){
            this.handleShow()
            this.setState({
                titlePopup: "Alteração de Canal",
                textPopup: "Requisição enviada com sucesso"
            })
            
            console.log("senha vazia")
            //var respostaSsid = await api.get('/trocarssid/' + valormac + '/' + valorssid)

        }else if( 
                (valorsenha!=="" && valorssid!=="" && valorcanal!=="") ||
                (valorsenha!=="" && valorssid!=="" && valorcanal==="") ||
                (valorsenha!=="" && valorssid==="" && valorcanal!=="") ||
                (valorsenha==="" && valorssid!=="" && valorcanal!=="") ){
            this.handleShow()
            this.setState({
                titlePopup: "Alterações de SSID, senha e canal",
                textPopup: "Favor enviar uma requisição de cada vez."
            })
        
            //var respostaSsid = await api.get('/trocarssid/' + valormac + '/' + valorssid)

        }else{
            this.setState({
                titlePopup: "Alteração de SSID, senha ou canal",
                textPopup: "Campos SSID, senha ou sanal vazios, favor preencher os campos obrigatórios."
            })
            this.handleShow()
        }
        //axios.get(`http://192.168.2.2:8080/TesteWebservice/roteador/trocarsenha/${user.mac}/${senha}`)
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
                <th>Configurar Wi-Fi</th>
                <hr/>
                <div className="row">
                    <div className="col-10 col-md-3">
                        <div className="form-group">
                            <label>SSID</label>
                            <input type="text" 
                                className="col-12 form-control" 
                                id="ssid"
                                placeholder="Digite o SSID..." />
                        </div>
                    </div>
                    <div className="mt-4">
                    <Checkbox id="boxSSID" isSelected={this.state.selectSSID}></Checkbox>
                    </div>
                    <div className="col-10 col-md-3">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="text" 
                                className="col-12 form-control" 
                                id="senha"
                                placeholder="Digite a senha..." />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Checkbox id="boxSenha" isSelected={this.state.selectSenha}></Checkbox>
                    </div>
                    <div className="col-10 col-md-3">
                        <div className="form-group">
                            <label>Canal</label>
                                <select type="text" 
                                    className="col-12 form-control" 
                                    id="canal">
                                        <option value="" defaultValue > Selecione o novo canal... </option>
                                        <option value="canal1"> Canal 1: 2.412 MHz </option>
                                        <option value="canal2"> Canal 2: 2.417 MHz </option>
                                        <option value="canal3"> Canal 3: 2.422 MHz </option>
                                        <option value="canal4"> Canal 4: 2.427 MHz </option>
                                        <option value="canal5"> Canal 5: 2.432 MHz </option>
                                        <option value="canal6"> Canal 6: 2.437 MHz </option>
                                        <option value="canal7"> Canal 7: 2.442 MHz </option>
                                        <option value="canal8"> Canal 8: 2.447 MHz </option>
                                        <option value="canal9"> Canal 9: 2.452 MHz </option>
                                        <option value="canal10"> Canal 10: 2.457 MHz </option>
                                        <option value="canal11"> Canal 11: 2.462 MHz </option>
                                        <option value="canal12"> Canal 12: 2.467 MHz </option>
                                        <option value="canal13"> Canal 13: 2.472 MHz </option>
                                </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Checkbox id="boxCanal" isSelected={this.state.selectCanal}></Checkbox>
                    </div>
                </div>
                <label className="col-14 d-flex justify-content-end">* <span className="text-danger"> Campos obrigatórios</span></label>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.trocarSSID(e)}
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

    renderPopup(){
        return (
            <Modal show={this.state.show} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.titlePopup} </Modal.Title>
                </Modal.Header>
                <Modal.Body> {this.state.textPopup} </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary ml-2" onClick={() => this.handleClose()}>
                        Sair
                    </button>
                    <button className="btn btn-primary ml-2" onClick={() => this.handleClose()}>
                        OK
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }

    /*renderCronometro(){
        return(
            <div>
                <p>{this.state.seconds} seconds remains!</p>
            </div>
        )
    }*/

    render() {
        return(
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
                {this.renderPopup()}
            </Main>
        )
    }  
}