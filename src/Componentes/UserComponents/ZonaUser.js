import React, { useState } from 'react'
import { MenuHeader } from './MenuHeader'
import { RegistroArticulos } from './RegistroArticulos';
import { Resumen } from './Resumen';
import '../../css/zoneUser.css'
import { Inventario } from './Inventario';

export const ZonaUser = ({ setRedirect }) => {

  const [stateMenu, setStateMenu] = useState({
    menuPadre: 'MENU1',
    menuHijo: ''
  });

  const componentMenu = () => {
    switch (stateMenu.menuPadre) {
      case 'MENU1':
        return (
          <div className='div-container'>
            <Resumen/>
          </div>
        )
      case 'MENU2':
        return (
          <div className='div-container'>
            <Inventario/>
          </div>
        )
      case 'MENU3':
        return (
          <div className='div-container'>
            <RegistroArticulos/>
          </div>
        )
      default:
        return (
          <></>
        )
    }
  }

  return (
    <>
      <MenuHeader setStateMenu={setStateMenu} setRedirect={setRedirect} />
      {componentMenu()}
    </>
  )
}
