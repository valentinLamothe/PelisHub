import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import usuarioActions from '../../redux/actions/usuarioActions'
import { connect } from "react-redux"


function NavBarMain (props) {
  
  let imageUsu = <img
    src='../assets/user.png'
    width="50"
    height="45"
    alt="User"
  />

  return (
    <>
      <Navbar bg="transparent" expand="lg" className="colorBgNav">
        <Container className="cont-nav">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div>
              <Navbar.Brand className="colorText">PelisHub</Navbar.Brand>
            </div>
            <Nav.Link as={Link} to='/' className="colorText">Inicio </Nav.Link>
            <Nav.Link as={Link} to='/Peliculas' className="colorText"> Peliculas </Nav.Link>
            {!props.foto ? (
            <NavDropdown className="navText navIcon" title={imageUsu} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='/IniciarSesion'> Iniciar Sesion</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/Registro'> Registro</NavDropdown.Item>
            </NavDropdown>
            ) : (
              <>
              <NavDropdown
                className="texto-usu"
                title={
                  <img
                    src={
                      props.foto
                        ? props.foto
                        : "../assets/user.png"
                    }
                    className="foto-usu"
                    alt="foto-usuario"
                  />
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/" onClick={() => { props.desloguearse() }}>
                    <span className="texto-usu">Cerrar sesion</span>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapDispatchToProps = {
  loguearse: usuarioActions.loguearse,
  desloguearse: usuarioActions.desloguearse,
}
const mapStateToProps = (state) => {
  return {
    foto: state.usuarioReducer.foto,
  }
}

  export default connect(mapStateToProps, mapDispatchToProps)(NavBarMain)
