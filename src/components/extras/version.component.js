import React, {Component, PropTypes} from 'react';

export default class VersionMain extends Component{
  render(){
    return(
      <div>
        <div className="container ">
          <div className="container containerLimits">
            <div className="col s12 m7">
              <h2 className="header headerText">Entre Hilos & Agujas App</h2>
              <div className="card horizontal">
                <div className="card-image">
                  <img src="http://lorempixel.com/150/190/fashion" />
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <p><span style={{fontWeight:'bold'}}>Version: </span>1.0.1</p>
                    <p><span style={{fontWeight:'bold'}}>Desarrollador: </span>Julio Núñez Q</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
