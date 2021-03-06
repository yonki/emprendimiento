<%-- 
    Document   : homepage
    Created on : 09/11/2018
    Author     : Juan Carlos Franco
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>


<div id="loadFrame">

    <!-- Filtro -->
    <h3>Selección de Capacitación</h3>
    <hr/>

    <c:if test="${not empty url}">
        <input type="hidden" id="url" value="${url}">
    </c:if>

    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <label for="departamento">Departamento <span class="text-danger">*</span></label>
                <div class="controls">
                    <select 
                        id="departamento" 
                        name="departamento" 
                        class="form-control selectpicker m-b-20 m-r-10"
                        data-style="btn-info"
                        data-validation-required-message="Ingrese Departamento" 
                        required>
                        <c:if test="${empty departamentos}">
                            <option selected value="">Error cargando departamentos</option>
                        </c:if>
                        <option selected value="">Seleccione un Departamento</option>
                        <c:if test="${not empty departamentos}">
                            <c:forEach var="departamentosAux" items="${departamentos}" varStatus="status">
                                <option name="departamento_<c:out value="${departamentosAux.id}"/>" value="<c:out value="${departamentosAux.id}"/>">
                                    <c:out value="${departamentosAux.nombre}" escapeXml="false"/>
                                </option>
                            </c:forEach>
                        </c:if>
                    </select>
                </div>
            </div>
        </div>


        <div class="col-sm-6">
            <div class="form-group">
                <label for="municipio">Municipio <span class="text-danger">*</span></label>
                <div class="controls">
                    <select 
                        id="municipio" 
                        name="municipio"
                        class="form-control selectpicker m-b-20 m-r-10"
                        data-style="btn-info"
                        data-validation-required-message="Ingrese Municipio"
                        disabled="true"
                        required>
                        <option selected value="">Seleccione un Municipio</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-6">
            <div class="form-group">
                <label>Capacitación <span class="text-danger">*</label>


                <c:if test="${empty capacitaciones}">
                    <div class="controls">
                        <select id="idcapacitacion" name="idcapacitacion" class="form-control selectpicker m-b-20 m-r-10" data-style="btn-info" disabled 
                                data-validation-required-message="Campo Obligatorio" required>
                            <option value="" >
                                -- No hay Capacitaciones parametrizadas --
                            </option>
                        </select>
                    </div>
                </c:if>
                <c:if test="${not empty capacitaciones}">
                    <div class="controls">
                        <select id="idcapacitacion" name="idcapacitacion" class="form-control selectpicker m-b-20 m-r-10" data-style="btn-info" 
                                data-validation-required-message="Campo Obligatorio" required>
                            <option value ="" selected>-- Seleccione Capacitación -- </option>
                            <c:forEach items="${capacitaciones}" var="temp" >
                                <option value="${temp.idcapacitacionprograma}" >${temp.nombrecapacitacionprograma}</option>
                            </c:forEach>
                        </select>
                    </div>
                </c:if>
            </div>
        </div>

        <div class="col-sm-6">
            <div class="form-group">
                <label>Sede <span class="text-danger">*</label>
                <div class="controls">
                    <select id="idsede" name="idsede" class="form-control selectpicker m-b-20 m-r-10" data-style="btn-info" disabled 
                            data-validation-required-message="Campo Obligatorio" required>
                        <option value ="" selected> -- Seleccione Sede -- </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <hr/>
    <div class="text-center">
        <button type="button" id="btnConsulta" class="btn btn-primary"> <i class="mdi mdi-magnify"></i> Ver disponibilidad </button>
    </div>

</div> <!-- End loadFrame -->

<script src="${pageContext.request.contextPath}/resources/_dist/js/services/capacitacion/setIdCapacitacion.js" type="text/javascript"></script>
<script>
    <c:if test="${not empty idFuncionario}">
    idfuncionario = ${idFuncionario};
    </c:if>
</script>