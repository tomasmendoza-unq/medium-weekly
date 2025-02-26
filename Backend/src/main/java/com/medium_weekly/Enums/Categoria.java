package com.medium_weekly.Enums;


public enum Categoria {
    DESARROLLO_WEB("Desarrollo Web"),
    CIBERSEGURIDAD("Ciberseguridad"),
    ECONOMIA_Y_FINANZAS("Economía y Finanzas"),
    SALUD_Y_BIENESTAR("Salud y Bienestar"),
    PSICOLOGIA_Y_DESARROLLO_PERSONAL("Psicología y Desarrollo Personal"),
    CIENCIA_Y_TECNOLOGIA("Ciencia y Tecnología"),
    HISTORIA_Y_CULTURA("Historia y Cultura"),
    LITERATURA_Y_ESCRITURA_CREATIVA("Literatura y Escritura Creativa"),
    CINE_Y_SERIES("Cine y Series"),
    MUSICA_Y_ENTRETENIMIENTO("Música y Entretenimiento"),
    VIAJES_Y_TURISMO("Viajes y Turismo"),
    FOTOGRAFIA_Y_ARTE_DIGITAL("Fotografía y Arte Digital"),
    MEDIO_AMBIENTE_Y_SOSTENIBILIDAD("Medio Ambiente y Sostenibilidad"),
    DEPORTES_Y_FITNESS("Deportes y Fitness"),
    EMPRENDIMIENTO_Y_NEGOCIOS("Emprendimiento y Negocios");

    private final String nombre;

    Categoria(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }
}
