package com.growdata.emprendimiento.business.dtos.asistenciatecnica;

import java.math.BigDecimal;

/**
 * Clase solicitud asociados.
 *
 * @author Juan Franco
 */
public class RequestTraerAsociadoPorUserName {

    private String userName;
    private BigDecimal estadoUsuario;

    /**
     * M�todo autogenerado para obtener una propiedad.
     *
     * @return Valor de la propiedad.
     */
    public String getUserName() {
        return userName;
    }

    /**
     * M�todo autogenerado para actualizar una propiedad.
     *
     * @param userName Valor a ser actualizado.
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * M�todo autogenerado para obtener una propiedad.
     *
     * @return Valor de la propiedad.
     */
    public BigDecimal getEstadoUsuario() {
        return estadoUsuario;
    }

    /**
     * M�todo autogenerado para actualizar una propiedad.
     *
     * @param estadoUsuario Valor a ser actualizado.
     */
    public void setEstadoUsuario(BigDecimal estadoUsuario) {
        this.estadoUsuario = estadoUsuario;
    }
}
