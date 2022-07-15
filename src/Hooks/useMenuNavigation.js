import { useState } from 'react'

export const useMenuNavigation = ( stateInitial ) => {

    const [controlDropDown, setCotrolDropDown] = useState(false);
    const [classToggleMenu, setclassToggleMenu] = useState('dropdown-toggle btn btn-secondary');
    const [menuItems, setMenuItems] = useState( stateInitial );

    const dropDownAction = () => {
        setCotrolDropDown(!controlDropDown);
    }

    const clearDropDownSelected = () => {
        setMenuItems((elements) => {
            const hMap = elements.map((element) => {
                element.class = 'item-d-d';
                return element
            })
            return hMap;
        })
    }

    const dropDownSelected = (e) => {
        setclassToggleMenu('dropdown-toggle btn btn-secondary-active');
        setMenuItems((elements) => {
            const hMap = elements.map((element) => {
                console.log('Elemento', element.name)
                element.class = 'item-d-d';
                if(e === element.name){
                    element.class = 'item-d-d-selected';
                }
                return element
            })
            return hMap;
        })
    }

    return {
        controlDropDown: controlDropDown,
        menuItems: menuItems, 
        classToggleMenu: classToggleMenu,
        dropDownAction,
        dropDownSelected,
        setclassToggleMenu,
        clearDropDownSelected
    }

}
