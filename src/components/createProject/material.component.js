import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class MaterialComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      options: [],
      option: [],
      quantity: '',
      selected: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderData = this.renderData.bind(this);
    this.add = this.add.bind(this);
    this.renderList = this.renderList.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentWillMount(){
    this.renderData();
    this.setState({selected:this.props.selected});
  }

  renderData(){
    let options = [];
    this.props.objects.map((obj, index)=>{
      options.push({value:obj._id, label: `${obj.name} - Disponible: ${obj.quantity - obj.holdQty}`, object: obj, clearableValue: false});
    })
    this.setState({options: options})
  }

  handleChange(val) {
    if(val == null){
      val = [];
    }
    this.setState({option:val});
  }

  add(){
    if(this.state.quantity > (this.state.option.object.quantity - this.state.option.object.holdQty)){
      this.props.error('La cantidad excede las existencias!');
      return;
    }

    const object = {
      object: this.state.option.object,
      quantity: this.state.quantity
    };
    this.props.add(object)
    this.setState({option:[], quantity: ''});
  }

  remove(index){
    this.props.remove(index)
  }

  renderList(){
    return this.state.selected.map((obj, index)=>{
      return (
        <a href="#!" className="collection-item center-align" onClick={this.remove.bind(this, index)} key={index}>
          <span>Material: {obj.object.name}</span><span> - </span> <span>Cantidad: {obj.quantity}</span>
        </a>
      );
    })
  }


  render(){
    return(
      <div>

        <div className="offset-m1 offset-l1 col s7 m7 l7 z-depth-1">
          <div className="row">
            <div className="container containerLimits">
              <h5 className="center-align">Materiales</h5>
              <div className="divider"></div>
            </div>
          </div>

          <div className="row">
            <div className="col s5 m5 l5 input-field">
              <Select
                  name="form-field-name"
                  value={this.state.option.value}
                  options={this.state.options}
                  onChange={this.handleChange}
                  placeholder="Seleccionar..."
              />
            </div>
            <div className="col s3 m3 l3 input-field">
              <input id="quantity" type="number" className="validate" value={this.state.quantity}
                onChange={(event)=>this.setState({quantity: event.target.value})} required/>
              <label className={this.state.quantity ? 'active':''} htmlFor="quantity">Cantidad</label>
            </div>
            <div className="col s3 m3 l3 input-field">
              <a style={{marginLeft:'2%'}} className="waves-effect waves-light btn blue darken-2"
                onClick={this.add} ><i className="material-icons">add</i></a>
            </div>
          </div>




          {this.state.selected.length > 0 ?
            <div>
              <div className="divider"></div>
              <h5 className="center-align">Materiales Seleccionados</h5>
              <ul className="collection">
                {this.renderList()}
              </ul>
            </div>
            : '' }



        </div>
      </div>
    )
  }
}
