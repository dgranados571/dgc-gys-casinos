import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import '../../css/menuHeader.css'
// import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
// import { useMenuNavigation } from '../../Hooks/useMenuNavigation.js';

export const MenuHeader = ({ setStateMenu, setRedirect }) => {

    const [menuTituloNav, setmenuTituloNav] = useState('Resumen')
    const [menuResponsive, setMenuResponsive] = useState(false)

/*
    const menuMantenimientos = useMenuNavigation([
        { labelMenu: 'Agenda', name: 'item1', class: 'item-d-d' },
        { labelMenu: 'Historial', name: 'item2', class: 'item-d-d' }
    ])

    const {
        classToggleMenu: classToggleMenuMantenimiento,
        setclassToggleMenu: setclassToggleMenuMantenimiento,
        controlDropDown: controlDDMantenimiento,
        dropDownAction: actionDDMantenimiento,
        menuItems: menuItemsMantenimiento,
        dropDownSelected: menuMantenimientoSelected,
        clearDropDownSelected: clearDropDownSelectedManteniemiento } = menuMantenimientos;
*/
    const selectMenu = (e) => {
        clearElementsNavegation();
        selectedClearELement(e.target.name)
        setStateMenu({
            menuPadre: e.target.name,
            menuHijo: ''
        });
    }

    const selectMenuResponsive = (e) => {
        clearElementsNavegation();
        selectedClearELementResposnsive(e.target.name);
        setmenuTituloNav(e.target.id);
        const elementsNav = document.querySelector('#div-menu-control');
        elementsNav.classList.replace('div-menu-responsive-post', 'div-menu-responsive-pre');
        setStateMenu({
            menuPadre: e.target.name,
            menuHijo: ''
        });
        setTimeout(() => {
            setMenuResponsive(false)
        }, 350)
    }
/*
    const selectMenuMantenimientoResponsive = (e) => {
        clearElementsNavegation();
        selectedClearELementResposnsive(e.target.name)
        setmenuTituloNav(e.target.id)
        const elementsNav = document.querySelector('#div-menu-control');
        elementsNav.classList.replace('div-menu-responsive-post', 'div-menu-responsive-pre');
        setStateMenu({
            menuPadre: 'MENU4',
            menuHijo: e.target.name
        });
        setTimeout(() => {
            setMenuResponsive(false)
        }, 350)
    }

    const selectMenuMantenimiento = (e) => {
        clearElementsNavegation()
        menuMantenimientoSelected(e.target.name);
        const elementsNav = document.querySelectorAll('#nav-menu > .btn');
        elementsNav.forEach((element) => {
            element.setAttribute('class', 'btn btn-link a-buttom')
            return element;
        })
        setStateMenu({
            menuPadre: 'MENU4',
            menuHijo: e.target.name
        });
    }
*/

    const selectedClearELement = (e) => {
        const elementsNav = document.querySelectorAll('#nav-menu > .btn');
        elementsNav.forEach((element) => {
            element.setAttribute('class', (e === element.name) ? 'btn btn-link a-buttom-active' : 'btn btn-link a-buttom')
            return element;
        })
    }

    const selectedClearELementResposnsive = (e) => {
        const elementsNav = document.querySelectorAll('#nav-menu > .btn');
        elementsNav.forEach((element) => {
            element.setAttribute('class', (e === element.name) ? 'btn btn-link a-buttom-responsive-active' : 'btn btn-link a-buttom')
            return element;
        })
    }

    const clearElementsNavegation = () => {
//        setclassToggleMenuMantenimiento('dropdown-toggle btn btn-secondary')
//        clearDropDownSelectedManteniemiento()
    }

    const activeMenuResponsive = () => {
        setMenuResponsive(!menuResponsive)
        setTimeout(() => {
            const elementsNav = document.querySelector('#div-menu-control');
            if (menuResponsive) {
                elementsNav.classList.replace('div-menu-responsive-post', 'div-menu-responsive-pre');
            } else {
                elementsNav.classList.replace('div-menu-responsive-pre', 'div-menu-responsive-post');
            }
        }, 50)
    }

    const cierraSesion = () => {
        sessionStorage.removeItem('usuarioApp')
        setRedirect({
            autorizado: false,
            usuario: '',
            rol: ''
        });
    }

    return (
        <>
            <div className='div-header'>
                <div className='div-normal'>
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-1" ></div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-10" >
                            <nav id='nav-menu' className="nav flex-row div-nav-header">
                                <button name='MENU1' className='btn btn-link a-buttom-active' onClick={selectMenu}>Resumen</button>
                                <button name='MENU2' className='btn btn-link a-buttom' onClick={selectMenu}>Inventarios</button>
                                <button name='MENU3' className='btn btn-link a-buttom' onClick={selectMenu}>Registros</button>
                                {
                                    /*
                                    <Dropdown isOpen={controlDDMantenimiento} toggle={actionDDMantenimiento}>
                                        <DropdownToggle className={classToggleMenuMantenimiento} caret>
                                            Mantenimiento
                                        </DropdownToggle>
                                        <DropdownMenu >
                                            {
                                                menuItemsMantenimiento.map(element => (
                                                    <DropdownItem
                                                        key={element.name}
                                                        name={element.name}
                                                        className={element.class}
                                                        onClick={selectMenuMantenimiento} >
                                                        {element.labelMenu}
                                                    </DropdownItem>
                                                ))
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                    */
                                }
                                <button className='btn btn-link a-link-cerrar-sesion' onClick={cierraSesion} >
                                    Cerrar sesión
                                </button>
                            </nav>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-1" ></div>
                    </div>
                </div>
                <div className='div-responsive'>
                    <div className='div-header-responsive' >
                        <p className='p-titulo-nav'>{menuTituloNav}</p>
                        <button onClick={activeMenuResponsive} className='btn btn-link icon-menu-link'><FontAwesomeIcon className='icon-bars' icon={faBars} /></button>
                    </div>
                </div>
            </div>
            <div className={menuResponsive ? 'div-menu-control-responsive-active' : 'div-menu-control-responsive'} >
                <div id='div-menu-control' className='div-menu-responsive-pre' >
                    <div id='nav-menu' className='div-menu-responsive'>
                        <button name='MENU1' id='Resumen' className='btn btn-link a-buttom-responsive-active' onClick={selectMenuResponsive}>Resumen</button>
                        <button name='MENU2' id='Inventarios' className='btn btn-link a-buttom' onClick={selectMenuResponsive}>Inventarios</button>
                        <button name='MENU3' id='Registro articulos' className='btn btn-link a-buttom' onClick={selectMenuResponsive}>Registros</button>
                        <div className='div-cerrar-sesion-responsive'>
                            <button className='btn btn-link a-link-cerrar-sesion-responsive' onClick={cierraSesion} >
                                Cerrar sesión
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
