/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.growdata.emprendimiento.business.servicio;

import com.growdata.emprendimiento.business.dtos.valoracion.RequestGuardarRespuestasVGrupal;
import com.growdata.emprendimiento.business.dtos.valoracion.ResponseGuardarRespuestasVGrupal;

public interface RutaAcompanamientoATServicio {

    public ResponseGuardarRespuestasVGrupal crearRutaAcompanamientoAT(RequestGuardarRespuestasVGrupal request);
}
