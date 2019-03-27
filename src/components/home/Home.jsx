import React, { Component } from 'react';
import Main from '../templates/Main';
import { Modal } from 'react-bootstrap'

const headerProps = {
    icon: "home",
    title: "Início",
    subtitle: "Tela de login do sistema"
}

const initialState = {
    show: false
}

export default class Home extends Component{

    state = {...initialState}

    validacaoLogin = async () => {
        var usuario = document.getElementById('usuario').value
        var senha = document.getElementById('senha').value
        if(usuario === '1234' && senha === 'senha'){
            this.handleClose()
        }else{
            this.handleShow()
        }
    }

    clear() {
        document.getElementById('usuario').value = ""
        document.getElementById('senha').value = ""
    }

    handleClose() {
        this.setState({ show: false});
    }

    handleShow() {
        this.setState({ show: true });
    } 

    renderLogin(){
        return(
            <div className="form">
                <div className="row" >
                    <div className="col-12 col-md-6">
                        <label>Usuário:</label>
                            <input 
                                type="text"  
                                className="form-control" 
                                id="usuario"
                                placeholder="Digite seu CPF" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-md-6">
                        <label>Senha:</label>
                            <input type="text" 
                                className="form-control" 
                                id="senha"
                                placeholder="Digite a senha" />
                    </div>
                </div>
                <label className="mt-3">Esqueceu a senha? <label className="text-danger">Clique aqui</label></label>
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <label className="text-danger mt-4 mb-4 d-flex justify-content-center"> Usuário e/ou senha incorreto(s). </label>
                </Modal>
                <div className="row mt-3">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick= {() => this.validacaoLogin()}
                            >
                            Login
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}
                            >
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
                {this.renderLogin()}
            </Main>
        )
    }  
}