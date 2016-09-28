import React, {Component, PropTypes} from 'react';

export default class UserForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      project: '',
      description:'',
      formTitle:''
    };

    this.addEdit = this.addEdit.bind(this);
  }

  componentWillMount(){
    this.setState({formTitle:'Nuevo material'})
    if(this.props.object._id){
      this.setState({
        name: this.props.object.project,
        description: this.props.object.description,
        formTitle: 'Editar proyecto'
      });
    }
  }

  addEdit(event){
    const object = {
      name: this.state.project,
      description: this.state.description
    };
    this.props.addEdit(this.props.object._id, object)
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
                            <input id="project" type="text" className="validate" value={this.state.project}
                              onChange={(event)=>this.setState({project: event.target.value})} required/>
                            <label className={this.props.object._id ? 'active':''} htmlFor="project">Proyecto</label>
                        </div>
                        <div className="input-field col s6">
                          <input id="description" type="text" className="validate" value={this.state.description}
                            onChange={(event)=>this.setState({description: event.target.value})} required/>
                          <label className={this.props.object._id ? 'active':''} htmlFor="description">Descripcion</label>
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
