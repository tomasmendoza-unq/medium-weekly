import React, { useState } from 'react'
import './TagSelector.css'

const TagSelector = ({ tagSelected, setTag }) => {

  const defautTags = ["DESARROLLO_WEB","CIBERSEGURIDAD","ECONOMIA_Y_FINANZAS","SALUD_Y_BIENESTAR","PSICOLOGIA_Y_DESARROLLO_PERSONAL","CIENCIA_Y_TECNOLOGIA","HISTORIA_Y_CULTURA","LITERATURA_Y_ESCRITURA_CREATIVA","CINE_Y_SERIES","MUSICA_Y_ENTRETENIMIENTO","VIAJES_Y_TURISMO","FOTOGRAFIA_Y_ARTE_DIGITAL","MEDIO_AMBIENTE_Y_SOSTENIBILIDAD","DEPORTES_Y_FITNESS","EMPRENDIMIENTO_Y_NEGOCIOS"]

  return (
    <>
      <div className='tagsContainer'>
        {defautTags.map((tag)=> {
          return(
          <button 
            key={tag}
            type='button'
            onClick={()=>{setTag(tag)}}
            className='btnCategory'
          >
            {tag.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
          </button>)
        })}
      </div>
      <h4 className='tagSelected'>{tagSelected
      ?"Categoria seleccionada: " + tagSelected.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
      :"Categoria no seleccionada"
      }</h4>
    </>
  )
}

export default TagSelector
