import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css';

export const Login = ({ setRedirect }) => {

    const [loginElements, setLoginElements] = useState({
        usuario: '',
        contrasenia: ''
    })

    const { usuario, contrasenia } = loginElements

    const inputEvent = (e) => {
        if (e.target.name === 'usuario') {
            setLoginElements({
                ...loginElements,
                'usuario': e.target.value
            })
        } else {
            setLoginElements({
                ...loginElements,
                'contrasenia': e.target.value
            })
        }
    }

    const clickLogin = () => {

        if (usuario === 'admin' && contrasenia === 'admin') {
            setRedirect({
                autorizado: true,
                usuario: 'Admin',
                rol: 'ADMIN'
            });
        } else if (usuario === 'user' && contrasenia === 'user') {
            setRedirect({
                autorizado: true,
                usuario: 'Usuario',
                rol: 'USUARIO'
            });
        }else{
            toast('Error en la autenticación')
        }
    }

    return (
        <>
            <div className='div-container-login'>
                <div className='div-login'>
                    <div className='div-login-elements'>
                        <div className='div-elements-children' >
                            <h3 className='titulo-login'>Login App</h3>
                            <div className='div-inputs-login'>
                                <p className='p-label-form'> Usuario </p>
                                <input type="text" name='usuario' value={usuario} onChange={inputEvent} className='form-control' placeholder='Usuario' autoComplete='off' />
                                <p className='p-label-form'> Contraseña </p>
                                <input type="password" name='contrasenia' value={contrasenia} onChange={inputEvent} className='form-control' placeholder='Contraseña' autoComplete='off' />
                            </div>
                            <div className='div-links-login'>
                                {
                                    /*
                                     <button className='btn btn-link a-link-login'>
                                        Olvide mi contraseña
                                    </button>
                                    */
                                }
                            </div>
                            <div className='div-bottom-custom-login'>
                                <button className='bottom-custom-login' onClick={clickLogin} >
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className='p-info-login'>dgc-software | Todos los derechos reservados </p>
                </div>
            </div>
            <ToastContainer autoClose={4000} hideProgressBar={true} />
        </>
    )
}
