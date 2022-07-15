import React, { useState } from 'react'
import { Login } from './Componentes/Login'
import { ZonaUser } from './Componentes/UserComponents/ZonaUser'

export const DgcGysApp = () => {

  const [redirect, setRedirect] = useState({
    autorizado: false,
    usuario: '',
    rol: ''
  })

  const validateRedirect = () => {
    if (redirect.autorizado) {
      if (redirect.rol === 'ADMIN') {
        return (
          <>ZONA ADMIN</>
        )
      } else if (redirect.rol === 'USUARIO') {
        return (
          <ZonaUser setRedirect={setRedirect}/>
        )
      }
    } else {
      return (
        <Login setRedirect={setRedirect} />
      )
    }
  }
 
  return (
    <>
      {
        validateRedirect()
      }
    </>
  )


}

