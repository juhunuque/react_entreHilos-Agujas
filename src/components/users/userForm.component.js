import React, {Component, PropTypes} from 'react';

export default class UserForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      lastname:'',
      username:'',
      active:'',
      formTitle:''
    };
    this.addEdit =this.addEdit.bind(this);
  }

  componentWillMount(){
    this.setState({formTitle:'Nuevo usuario'})
    if(this.props.user._id){
      this.setState({
        name: this.props.user.name,
        lastname: this.props.user.lastname,
        username: this.props.user.username,
        active: this.props.user.active ? true : false,
        formTitle: 'Editar usuario'
      });
    }
  }

  addEdit(event){
    const user = {
      name: this.state.name,
      lastname: this.state.lastname,
      username: this.state.username,
      active: this.state.active
    };
    this.props.addEdit(this.props.user._id, user)
  }

  render(){
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <div className="card white">
                <div className="card-content ">
                  <span className="card-title">{this.state.formTitle}</span>
                    <form>
                      <div className="row">
                        <div className="input-field col s6">
                            <input id="name" type="text" className="validate" value={this.state.name}
                              onChange={(event)=>this.setState({name: event.target.value})} required/>
                            <label className={this.props.user._id ? 'active':''} htmlFor="name">Nombre</label>
                        </div>
                        <div className="input-field col s6">
                          <input id="lastname" type="text" className="validate" value={this.state.lastname}
                            onChange={(event)=>this.setState({lastname: event.target.value})} required/>
                          <label className={this.props.user._id ? 'active':''} htmlFor="lastname">Apellidos</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s6">
                            <input id="username" type="text" className="validate" value={this.state.username}
                              onChange={(event)=>this.setState({username: event.target.value})} required/>
                            <label className={this.props.user._id ? 'active':''} htmlFor="username">Usuario</label>
                        </div>
                        <div className="input-field col s6">
                          <p>
                            <input type="checkbox" id="active" checked={this.state.active}
                              onChange={()=>this.setState({active: !this.state.active})} />
                            <label htmlFor="active">Activo</label>
                          </p>
                        </div>
                      </div>
                    </form>
                </div>
                <div className="card-action">
                  <a onClick={()=>{this.props.clean()}} className="blue darken-2 waves-effect waves-light btn button-user-control-bar">Cancelar</a>
                  <a onClick={this.addEdit} className="blue darken-2 waves-effect waves-light btn button-user-control-bar">Guardar</a>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}
