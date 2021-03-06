import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import usuarioActions from "../redux/actions/usuarioActions";
import Swal from 'sweetalert2';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from "react-icons/fc";


const Loguearse = () => {

  
  const Alert = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    background: 'black',
    color: 'white',
    timerProgressBar: true,
    didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

  const dispatch = useDispatch();

  const mail = useRef()
  const contrasenia = useRef()

 
  const logearse = async(e) =>{
    e.preventDefault()
    if(mail.current.value != '' && contrasenia.current.value != ''){

      try{
        
        const respuesta = await dispatch(
          usuarioActions.loguearse({
            mail: mail.current.value,
            contrasenia: contrasenia.current.value,
          })
          );
          
          console.log('esta es la respuesta despues de loggearse:',respuesta.response)

          if(respuesta.success){
            Alert.fire({
              title: `Bienvenido ${respuesta.response.nombre}`,
              icon: 'success'
            })
            mail.current.value = ''
            contrasenia.current.value = ''
          }else{
            console.log(respuesta)
            Alert.fire({
            title: respuesta.error[0].message,
            icon: 'error'
          })}
          
        }catch(err){console.log(err)}
      }else{
        Alert.fire({
          icon: 'error',
          title: 'Completa los campos',
          background: 'white'
        })
      }
  }
  /* 
  joaco_nc@yahoo.com
  */

  const responseGoogle = async (respuesta) => {
    let usuarioGoogle = {

      mail: respuesta.profileObj.email,
      contrasenia: respuesta.profileObj.googleId,
      flagGoogle: true

    }
    await dispatch(usuarioActions.loguearse(usuarioGoogle))
    .then(res => {
      if (res.success){
        console.log(res)
        Alert.fire({
          icon: 'success',
          title: 'Bienvenido/a '+res.response.nombre
        })
      }
      else{
      console.log(res)
      Alert.fire({
        title: res.error[0].message,
        icon: 'error'
      })
    }
    })
    .catch((error) => {
      console.log(error)
      Alert.fire({
          icon: 'error',
          title: 'Debe registrarse antes de ingresar'
        })
  })
  }

  return (
    <Form
      className="d-flex flex-column form-container"
      variant="light"
      onSubmit={logearse}
    >
      <h1 className="text-light mb-5">Iniciar Sesion</h1>
      <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
        <Form.Label className="text-light">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={mail} />
      </Form.Group>

      <Form.Group className="mb-3 col-5" controlId="formBasicPassword">
        <Form.Label className="text-light" >Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={contrasenia} />
      </Form.Group>

      <div className="d-flex justify-content-center align-center container-buttons">

        <Button className="button-send"  type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Ingresar
        </Button>

<span className="o-google">o</span>

<GoogleLogin
            clientId="298582516064-getr6393pgro6pje2hs218l17t27bdv5.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className="btn-google button-send" disabled={renderProps.disabled}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <FcGoogle className="mx-3" style={{fontSize: "2rem"}} />
              </button>
            )}
            buttonText="Registarse con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
      /> 

</div>


    </Form>
  );
};

export default Loguearse;
