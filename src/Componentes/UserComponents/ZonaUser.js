import React, { useState } from 'react'
import { MenuHeader } from './MenuHeader'
import { Registros } from './Registros';
import { Resumen } from './Resumen';
import { Inventario } from './Inventario';

import '../../css/zoneUser.css'


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
            <Registros/>
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
