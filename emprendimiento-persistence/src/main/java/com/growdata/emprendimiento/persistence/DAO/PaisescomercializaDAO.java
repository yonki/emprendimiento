/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.growdata.emprendimiento.persistence.DAO;

import com.growdata.emprendimiento.persistence.entidad.Paisescomercializa;
import java.util.List;

public interface PaisescomercializaDAO {

    public List<Paisescomercializa> getPaisescomercializaPorFormalizado(
            long idformalizacion) throws Exception;

}
