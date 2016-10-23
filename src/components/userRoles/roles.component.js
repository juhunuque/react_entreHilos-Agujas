import React, {Component, PropTypes} from 'react';

export default class RolesComponent extends Component{
  constructor(props){
    super(props);
    this.state ={
      selectedRoles: [],
      roles:['USUARIO', 'ADMINISTRADOR']
      };

    this.renderSelectedRoles = this.renderSelectedRoles.bind(this);
    this.renderRoles = this.renderRoles.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.removeSelectedRole = this.removeSelectedRole.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount(){
    if(this.props.user.roles){
      let roles = this.state.roles;
      roles = roles.filter(val => !this.props.user.roles.includes(val));
      this.setState({selectedRoles: this.props.user.roles, roles: roles});
    }
  }

  save(event){
    const user = {
      name: this.props.user.name,
      lastname: this.props.user.lastname,
      username: this.props.user.username,
      active: this.props.user.active,
      roles: this.state.selectedRoles
    };
    this.props.save(this.props.user._id, user)
  }

  selectRole(event, object, index){
    event.preventDefault();
    let selectedRoles = this.state.selectedRoles;
    let roles = this.state.roles;
    selectedRoles.push(object);
    if(index != -1) {
    	roles.splice(index, 1);
    }
    this.setState({selectedRoles: selectedRoles,
                    roles:roles});
  }

  removeSelectedRole(event, object, index){
    event.preventDefault();
    let selectedRoles = this.state.selectedRoles;
    let roles = this.state.roles;
    roles.push(object);
    if(index != -1) {
    	selectedRoles.splice(index, 1);
    }
    this.setState({selectedRoles: selectedRoles,
                    roles:roles});

  }

  renderSelectedRoles(){
    return this.state.selectedRoles.map((object,index)=>{
      return <a href="" key={index} className="collection-item black-text"
        onClick={(event)=>this.removeSelectedRole(event,object,index)}>{object}</a>
    })
  }

  renderRoles(){
    return this.state.roles.map((object,index)=>{
      return <a href="" key={index} className="collection-item black-text"
        onClick={(event)=>this.selectRole(event,object,index)}>{object}</a>
    })

  }

  render(){
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="offset-m2 col s12 m8">
              <div className="card white">
                <div className="card-content ">
                      <div className="row">
                        <div className="col m6 l6">
                          <h5>Roles</h5>
                          <div className="collection">
                            {this.renderRoles()}
                          </div>
                        </div>
                        <div className="col m6 l6">
                          <h5>Roles Seleccionados</h5>
                          <div className="collection">
                            {this.renderSelectedRoles()}
                          </div>
                        </div>
                      </div>
                </div>
                <div className="card-action">
                  <a onClick={()=>{this.props.clean()}} className="blue darken-2 waves-effect waves-light btn button-user-control-bar">Cancelar</a>
                  <a onClick={this.save} className="blue darken-2 waves-effect waves-light btn button-user-control-bar">Guardar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
