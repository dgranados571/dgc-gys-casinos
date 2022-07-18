import React from 'react'

export const Inventario = () => {
    return (
        <div className='div-style-form'>
            <div className='div-form'>
                <p className='p-label-form'> Articulo: </p>
                <input type="text" className='form-control' placeholder='Ej: Arracacha' autoComplete='off' />
            </div>
        </div>
    )
}
