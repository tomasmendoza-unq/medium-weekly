import React, { useState } from 'react'

const TagSelector = ({tagSelected, setTag}) => {

  const defautTags = ["DESARROLLO_WEB","CIBERSEGURIDAD","ECONOMIA_Y_FINANZAS","SALUD_Y_BIENESTAR","PSICOLOGIA_Y_DESARROLLO_PERSONAL","CIENCIA_Y_TECNOLOGIA","HISTORIA_Y_CULTURA","LITERATURA_Y_ESCRITURA_CREATIVA","CINE_Y_SERIES","MUSICA_Y_ENTRETENIMIENTO","VIAJES_Y_TURISMO","FOTOGRAFIA_Y_ARTE_DIGITAL","MEDIO_AMBIENTE_Y_SOSTENIBILIDAD","DEPORTES_Y_FITNESS","EMPRENDIMIENTO_Y_NEGOCIOS"]

  return (
    <div>
      {defautTags.map((tag)=> {
        return(
        <button 
          key={tag}
          type='button'
          onClick={()=>{setTag(tag)}}
        >
          {tag}
        </button>)
      })}
      <p>{tagSelected}</p>
    </div>
  )
}

export default TagSelector
