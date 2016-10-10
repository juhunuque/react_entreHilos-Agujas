import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class UserForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description:'',
      category:'',
      quantity:'',
      measure:'',
      holdQty:'',
      options: [],
      option: [],
      formTitle:''
    };

    this.addEdit = this.addEdit.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);
  }

  componentWillMount(){
    this.renderSelect();
    this.setState({formTitle:'Nuevo material'})
    this.fetchCategory(this.props.object.category);
    if(this.props.object._id){
      this.setState({
        name: this.props.object.name,
        description: this.props.object.description,
        category: this.props.object.category,
        quantity: this.props.object.quantity,
        measure: this.props.object.measure,
        holdQty: this.props.object.holdQty,
        formTitle: 'Editar material'
      });
    }
  }

  fetchCategory(item){
    this.props.categories.map((obj, index)=>{
      if(item === obj.type){
        this.setState({option:{value:obj._id, label: obj.type, object: obj, clearableValue: false}});
        return;
      }
    })
  }

  renderSelect(){
    let options = [];
    this.props.categories.map((obj, index)=>{
      options.push({value:obj._id, label: obj.type, object: obj, clearableValue: false});
    })
    this.setState({options: options})
  }

  addEdit(event){
    const object = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      quantity: this.state.quantity,
      measure: this.state.measure,
      holdQty: this.state.holdQty
    };
    this.props.addEdit(this.props.object._id, object)
  }

  handleChange(val) {
    if(val == null){
      val = [];
    }
    this.setState({option:val});
    this.setState({category:val.label});
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
                            <label className={this.props.object._id ? 'active':''} htmlFor="name">Material</label>
                        </div>
                        <div className="input-field col s6">
                          <input id="description" type="text" className="validate" value={this.state.description}
                            onChange={(event)=>this.setState({description: event.target.value})} required/>
                          <label className={this.props.object._id ? 'active':''} htmlFor="description">Descripcion</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s6">
                          <Select
                              name="form-field-name"
                              value={this.state.option.value}
                              options={this.state.options}
                              onChange={this.handleChange}
                              placeholder="Categoria"
                          />
                        </div>
                        <div className="input-field col s6">
                          <input id="quantity" type="number" className="validate" value={this.state.quantity}
                            onChange={(event)=>this.setState({quantity: event.target.value})} required/>
                          <label className={this.props.object._id ? 'active':''} htmlFor="quantity">Cantidad</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s6">
                            <input id="measure" type="text" className="validate" value={this.state.measure}
                              onChange={(event)=>this.setState({measure: event.target.value})} required/>
                            <label className={this.props.object._id ? 'active':''} htmlFor="measure">Medida</label>
                        </div>
                        <div className="input-field col s6">
                          <input id="holdQty" type="number" className="validate" value={this.state.holdQty}
                            onChange={(event)=>this.setState({holdQty: event.target.value})} required/>
                          <label className={this.props.object._id ? 'active':''} htmlFor="holdQty">En espera</label>
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
