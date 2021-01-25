package com.growdata.emprendimiento.persistence.entidad;
// Generated 11/07/2019 04:10:46 PM by Hibernate Tools 4.3.1


import java.math.BigDecimal;
import java.util.Date;

/**
 * Seguimientoasistencia generated by hbm2java
 */
public class Seguimientoasistencia implements java.io.Serializable {


     private BigDecimal idseguimientoasistencia;
     private Funcionario funcionario;
     private Alumnos alumnos;
     private Modulociclo modulociclo;
     private short cantidadhorasasistencia;
     private Date fecharegistro;

    public Seguimientoasistencia() {
    }

    public Seguimientoasistencia(BigDecimal idseguimientoasistencia, Funcionario funcionario, Alumnos alumnos, Modulociclo modulociclo, short cantidadhorasasistencia, Date fecharegistro) {
       this.idseguimientoasistencia = idseguimientoasistencia;
       this.funcionario = funcionario;
       this.alumnos = alumnos;
       this.modulociclo = modulociclo;
       this.cantidadhorasasistencia = cantidadhorasasistencia;
       this.fecharegistro = fecharegistro;
    }
   
    public BigDecimal getIdseguimientoasistencia() {
        return this.idseguimientoasistencia;
    }
    
    public void setIdseguimientoasistencia(BigDecimal idseguimientoasistencia) {
        this.idseguimientoasistencia = idseguimientoasistencia;
    }
    public Funcionario getFuncionario() {
        return this.funcionario;
    }
    
    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }
    public Alumnos getAlumnos() {
        return this.alumnos;
    }
    
    public void setAlumnos(Alumnos alumnos) {
        this.alumnos = alumnos;
    }
    public Modulociclo getModulociclo() {
        return this.modulociclo;
    }
    
    public void setModulociclo(Modulociclo modulociclo) {
        this.modulociclo = modulociclo;
    }
    public short getCantidadhorasasistencia() {
        return this.cantidadhorasasistencia;
    }
    
    public void setCantidadhorasasistencia(short cantidadhorasasistencia) {
        this.cantidadhorasasistencia = cantidadhorasasistencia;
    }
    public Date getFecharegistro() {
        return this.fecharegistro;
    }
    
    public void setFecharegistro(Date fecharegistro) {
        this.fecharegistro = fecharegistro;
    }




}


