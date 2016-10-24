import React, {Component, PropTypes} from 'react';

export default class Header extends Component{
  renderAuthHeader(){
    return(
      <div>
        <header>
          <ul id="dropdownProjects" className="dropdown-content">
            <li><a href="/createProject" className="black-text">Creacion de Proyectos</a></li>
            <li className="divider"></li>
            <li><a href="/statusProject" className="black-text">Control de Proyectos</a></li>
            <li className="divider"></li>
            <li><a href="/settingProjects" className="black-text">Mantenimiento Proyecto</a></li>
          </ul>

          <ul id="dropdownMaterials" className="dropdown-content">
            <li><a href="/manageKindMaterial" className="black-text">Tipo material</a></li>
            <li className="divider"></li>
            <li><a href="/manageMaterial" className="black-text">Material</a></li>
          </ul>

          <ul id="dropdownSecurity" className="dropdown-content">
            <li><a href="/manageUsers" className="black-text">Mantenimiento Usuarios</a></li>
            <li className="divider"></li>
            <li><a href="/manageRoles" className="black-text">Asignacion Roles</a></li>
            <li className="divider"></li>
            <li><a href="/backUpDb" className="black-text">Backup DB</a></li>
          </ul>

          <ul id="dropdownHelp" className="dropdown-content">
            <li><a href="/changePassword" className="black-text">Cambiar Contraseña</a></li>
            <li className="divider"></li>
            <li><a href="/version" className="black-text">Version</a></li>
            <li className="divider"></li>
            <li><a href="/userDocumentation" className="black-text">Manual de Usuario</a></li>
          </ul>

          <ul id="dropdownReports" className="dropdown-content">
            <li><a href="#/reportMaterials" className="black-text">Materiales</a></li>
            <li className="divider"></li>
            <li><a href="#/reportProjects" className="black-text">Proyectos</a></li>
          </ul>

          <nav className="blue" role="navigation">
            <div className="nav-wrapper container">
              <a id="logo-container" href="/" className="brand-logo">
                    <img src="./images/logo.png" width="45"  />
              </a>
              <span className="headerText" style={{marginLeft:'5%'}}><a href="/" style={{color:'#2B2B2B'}}>Entre Hilos & Agujas</a></span>

              <ul className="right hide-on-med-and-down">
                <li><a className="dropdown-button" data-beloworigin="true" data-hover="true" data-constrainwidth="false"
                  data-activates="dropdownMaterials" href="">Materiales</a></li>
                <li><a className="dropdown-button" data-beloworigin="true" data-hover="true" data-constrainwidth="false"
                  data-activates="dropdownProjects" href="">Proyectos</a></li>
                <li><a className="dropdown-button" data-beloworigin="true" data-hover="true" data-constrainwidth="false"
                  data-activates="dropdownSecurity" href="">Seguridad</a></li>
                <li><a className="dropdown-button" data-beloworigin="true" data-hover="true" data-constrainwidth="false"
                  data-activates="dropdownHelp" href="">Ayuda</a></li>
                <li><a className="dropdown-button" data-beloworigin="true" data-hover="true" data-constrainwidth="false"
                  data-activates="dropdownReports" href="">Listado</a></li>
                <li><a href="" onClick={this.props.logout}>Salir</a></li>
              </ul>

              <ul id="nav-mobile" className="side-nav">
                <li><a href="#">Navbar Link</a></li>
              </ul>
              <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
          </nav>
        </header>
      </div>
    )
  }

  renderNotAuthHeader(){
    return(
      <div>
      <header>

        <nav className="blue" role="navigation">
          <div className="nav-wrapper container">
            <a id="logo-container" href="/" className="brand-logo">
                  <img src="./images/logo.png" alt="Finanzas"  width="45"  />
            </a>
            <span className="headerText" style={{marginLeft:'5%'}}><a href="/" style={{color:'#2B2B2B'}}>Entre Hilos & Agujas</a></span>

            <ul className="right hide-on-med-and-down">
              <li>Debe loguearse para continuar</li>
            </ul>

            <ul id="nav-mobile" className="side-nav">
              <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
          </div>
        </nav>
      </header>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.props.isAuth ? this.renderAuthHeader() : this.renderNotAuthHeader()}
      </div>
    )
  }
}
