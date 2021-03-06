var todas = 0;
var idProgramacion = -1;
var lTable = null;
var alumnos = null;
var modulos = null;
var programacion = null;
var tipo = "individual";
$(function () {

    $("#tabs").tabs();

    $("#btnCalificar").on('click', function (e) {
        e.preventDefault();
        if (tipo == "individual") {
            registrarCalificacion();
        } else {
            registrarCalificacionMasiva();
        }
    });

    $("#btn-Cancelar").on('click', function (e) {
        e.preventDefault();
        $(".preloader").fadeIn();
        location.replace(context + "/");
        $(".preloader").fadeOut();
    });

    $("#linkIndividual").on('click', function (e) {
        tipo = "individual";
    });

    $("#linkMasivo").on('click', function (e) {
        tipo = "masiva";
    });

    loaderSesiones(function (s) {

        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            locale: 'es',
            selectMirror: true,
            contentHeight: 500,
            themeSystem: 'bootstrap4',
            selectable: true,
            StartEditable: false,

            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek'
            }, views: {
                month: {
                    columnHeaderFormat: {
                        weekday: 'long'
                    }
                },
                week: {
                    columnHeaderFormat: {
                        day: '2-digit', weekday: 'long'
                    },
                    titleFormat: {year: 'numeric', month: 'long'}
                }
            }, events:
                    s,
            eventClick: function (element) {
                $(".preloader").fadeIn();
                idProgramacion = element.event.id;
                jQuery.ajax({
                    method: "GET",
                    url: context + "/getSedesPorId",
                    dataType: "json",
                    async: false,
                    data: {idsede: idsede},
                    success: function (result, status, xhr) {
                        if (result.status == "1") {
                            var sede = result.sedes[0];
                            $("#nombreSede").text(sede.nombre);
                            $("#direccionSede").text(sede.direccion);
                        } else {
                            swal({
                                title: "Registrar Calificación",
                                text: result.descripcion,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            });
                        }
                    },
                    error: function (error) {
                        if (error.status == 200) {
                            swal({
                                title: "Registrar Calificación",
                                text: _mensajes.sesionExpiro,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            }, function () {
                                location.replace(context + "/mostrarLogin");
                            });
                        } else {
                            swal({
                                title: "Registrar Calificación",
                                text: _mensajes.errorCargaSesiones,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            });
                        }
                    }
                });
                var dataSet = [];
                var columns = [];
                jQuery.ajax({
                    method: "GET",
                    url: context + "/getProgramacionPorId",
                    dataType: "json",
                    async: false,
                    data: {idProgramacion: idProgramacion},
                    success: function (result, status, xhr) {
                        if (result.status == "1") {
                            programacion = result.programaciones[0];
                            $("#nombreCapacitacion").text(programacion.capacitacionprograma.nombrecapacitacionprograma);
                            $("#ubicacion").text(programacion.ubicacion);
                            $("#fechaInicio").text(moment(programacion.fechainicioprogramacion).format("DD/MM/YYYY").toString());
                            $("#fechaFin").text(moment(programacion.fechafinalrogramacion).format("DD/MM/YYYY").toString());
                            $("#horario").text(moment(programacion.fechainicioprogramacion).format("kk:mm").toString()
                                    + " a " + moment(programacion.fechafinalrogramacion).format("kk:mm").toString());

                            if (programacion.alumnoses.length === 0) {
                                swal({
                                    title: "Registrar Calificación",
                                    text: _mensajes.modulosAlumnosVacio,
                                    type: "error",
                                    confirmButtonText: "Aceptar"
                                });
                            }
                            columns.push({title: "Documento"});
                            columns.push({title: "Nombre"});
                            columns.push({title: "¿Aprobado?"});
                            alumnos = programacion.alumnoses;
                            programacion.alumnoses.forEach(function (alumno, indexA, arrayA) {
                                var row = [];
                                row.push(alumno.beneficiario.tipodocumentoid.nombredocumento + "-" + alumno.beneficiario.numerodocumento);
                                row.push(alumno.beneficiario.primernombre + " " + (alumno.beneficiario.segundonombre != null ? alumno.beneficiario.segundonombre : "")
                                        + " " + alumno.beneficiario.primerapellido + " " + (alumno.beneficiario.segundoapellido != null ? alumno.beneficiario.segundoapellido : ""));
                                row.push("<div class='controls'> <div class='custom-control custom-checkbox'> <input type='checkbox' id='calificacion" + indexA + "' name='calificacion' /> </div> </div>");
                                dataSet.push(row);
                            });
                            if (lTable != null) {
                                lTable.destroy();
                            }
                            lTable = $('.tablaData').DataTable({
                                language: datatableLanguageEs,
                                data: dataSet,
                                autoWidth: false,
                                columns: columns
                            });
                        } else {
                            swal({
                                title: "Registrar Calificación",
                                text: result.descripcion,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            });
                        }
                    },
                    error: function (error) {
                        if (error.status == 200) {
                            swal({
                                title: "Registrar Calificación",
                                text: _mensajes.sesionExpiro,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            }, function () {
                                location.replace(context + "/mostrarLogin");
                            });
                        } else {
                            swal({
                                title: "Registrar Calificación",
                                text: _mensajes.errorCargaSesiones,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            });
                        }
                    }
                });
                $("#modalSesion").modal("show");
                $(".preloader").fadeOut();
            }
        });
        calendar.render();
    });
    $(".preloader").fadeOut();
});

function registrarCalificacion() {
    var registroGlobal = [];
    alumnos.forEach(function (alumno, indexA, arrayA) {
        registroGlobal.push($("#calificacion" + indexA).is(":checked") ? "1" : "0");
    });

    jQuery.ajax({
        method: "POST",
        url: context + "/registrarCalificacionCapacitacion",
        dataType: "json",
        async: false,
        data: {idProgramacion: idProgramacion,
            registros: JSON.stringify(registroGlobal),
            alumnos: JSON.stringify(alumnos),
            modulos: JSON.stringify(modulos),
            idFuncionario: idfuncionario},
        beforeSend: function () {
            $(".preloader").fadeIn();
        },
        complete: function () {
            $(".preloader").fadeOut();
        },
        success: function (result, status, xhr) {
            if (result.status == "1") {
                $("#modalSesion").modal("hide");
                var aprobaciones = result.aprobaciones;
                $("#tableData").find("tr:gt(0)").remove();
                aprobaciones.forEach(function (item, index, array) {
                    var row = "<tr >" +
                            "<td>" + item.alumnos.beneficiario.tipodocumentoid.nombredocumento + "</td>" +
                            "<td>" + item.alumnos.beneficiario.numerodocumento + "</td>" +
                            "<td>" + item.alumnos.beneficiario.primernombre + " " +
                            (item.alumnos.beneficiario.segundonombre != null ? item.alumnos.beneficiario.segundonombre : "") + "</td>" +
                            "<td>" + item.alumnos.beneficiario.primerapellido + " " +
                            (item.alumnos.beneficiario.segundoapellido != null ? item.alumnos.beneficiario.segundoapellido : "") + "</td>" +
                            "<td>" + item.porcentajeaprobacionobtenido + "%</td>" +
                            "<td>" + (item.calificacionfuncionario == 1 ? "Aprobado" :
                                    (item.calificacionfuncionario == -1 ? "Sin calificar" : "Reprobado")) + "</td>" +
                            "<td>" + (item.calificacionfinal == 1 ? "Aprobado" :
                                    (item.calificacionfinal == -1 ? "Sin calificar" :
                                            (item.calificacionfinal == -2 ? "Reprobado por faltas" : "Reprobado"))) + "</td>" +
                            "</tr>";
                    $('#tableData tr:last').after(row);
                });
                swal({
                    title: "Registrar Calificación",
                    text: result.descripcion,
                    type: "success",
                    confirmButtonText: "Aceptar"
                }, function () {
                    $("#resultados").show();
                    $("#registrar").remove();
                });
            } else {
                swal({
                    title: "Registrar Calificación",
                    text: result.descripcion,
                    type: "error",
                    confirmButtonText: "Aceptar"
                });
            }
        },
        error: function (error) {
            if (error.status == 200) {
                swal({
                    title: "Registrar Calificación",
                    text: _mensajes.sesionExpiro,
                    type: "error",
                    confirmButtonText: "Aceptar"
                }, function () {
                    location.replace(context + "/mostrarLogin");
                });
            } else {
                swal({
                    title: "Registrar Calificación",
                    text: _mensajes.errorAjax,
                    type: "error",
                    confirmButtonText: "Aceptar"
                });
            }
        }
    });
}

function loaderSesiones(s) {
    var sesiones = [];
    jQuery.ajax({
        method: "GET",
        url: context + "/getProgramacionPorSedeCapacitacion",
        dataType: "json",
        async: false,
        data: {idsede: idsede, idcapacitacion: idcapacitacion, vencidas: 1},
        success: function (result, status, xhr) {
            if (result.status == "1") {
                result = result.programaciones;
                result.forEach(function (item, index, array) {
                    var sesion = {};
                    sesion.id = Number(array[index].idprogramacion);
                    sesion.start = moment(new Date(array[index].fechainicioprogramacion)).format("YYYY-MM-DDTkk:mm:ss");
                    sesion.end = moment(new Date(array[index].fechafinalrogramacion)).format("YYYY-MM-DDTkk:mm:ss");
                    if (new Date(array[index].fechafinalrogramacion) < new Date() && item.estadosesion.idestadosesion == 1) {
                        sesion.title = item.capacitacionprograma.nombrecapacitacionprograma + " - Registrar Calificación";
                        sesion.className = 'bg-registrar';
                        sesiones.push(sesion);
                    } else if (item.estadosesion.idestadosesion == 2) {
                        sesion.title = "Culminada";
                        sesion.className = 'bg-culminada';
                        sesiones.push(sesion);
                    }
                });
                s(sesiones);
            } else {
                swal({
                    title: "Registrar Calificación",
                    text: result.descripcion,
                    type: "error",
                    confirmButtonText: "Aceptar"
                }, function (isConfirm) {
                    if (isConfirm) {
                        $(".preloader").fadeIn();
                        location.replace(context + "/");
                    }
                });
            }
        },
        error: function (error) {
            if (error.status == 200) {
                swal({
                    title: "Registrar Calificación",
                    text: _mensajes.sesionExpiro,
                    type: "error",
                    confirmButtonText: "Aceptar"
                }, function () {
                    location.replace(context + "/mostrarLogin");
                });
            } else {
                swal({
                    title: "Registrar Calificación",
                    text: _mensajes.errorCargaSesiones,
                    type: "error",
                    confirmButtonText: "Aceptar"
                }, function (isConfirm) {
                    if (isConfirm) {
                        $(".preloader").fadeIn();
                        location.replace(context + "/");
                    }
                });
            }
        }
    });
}

function registrarCalificacionMasiva() {
    var documentoTema = document.getElementById("documento");
    var formData = new FormData();
    formData.append("alumnos", JSON.stringify(alumnos));
    formData.append("modulos", JSON.stringify(modulos));
    formData.append("idFuncionario", idfuncionario);
    formData.append("idProgramacion", idProgramacion);
    formData.append("documento", documentoTema.files[0]);
    if (documentoTema.files.length === 0) {
        swal({
            title: "Registrar Calificación",
            text: _mensajes.documentoObligatorio,
            type: "error",
            confirmButtonText: "Aceptar"
        });
    } else {
        var file = documentoTema.files[0];
        if (file.type === 'text/plain') {
            if (file.size > 5242880) {
                swal({
                    title: "Registrar Calificación",
                    text: _mensajes.file5mb,
                    type: "error",
                    confirmButtonText: "Aceptar"
                });
            } else {
                $(".preloader").fadeIn();
                jQuery.ajax({
                    type: "POST",
                    url: context + "/registrarCalificacionCapacitacionMasiva",
                    enctype: "multipart/form-data",
                    contentType: false,
                    processData: false,
                    cache: false,
                    dataType: "json",
                    async: false,
                    data: formData,
                    success: function (result, status, xhr) {
                        $(".preloader").fadeOut();
                        if (result.status == "1") {
                            $("#modalSesion").modal("hide");
                            var aprobaciones = result.aprobaciones;
                            $("#tableData").find("tr:gt(0)").remove();
                            aprobaciones.forEach(function (item, index, array) {
                                var row = "<tr >" +
                                        "<td>" + item.alumnos.beneficiario.tipodocumentoid.nombredocumento + "</td>" +
                                        "<td>" + item.alumnos.beneficiario.numerodocumento + "</td>" +
                                        "<td>" + item.alumnos.beneficiario.primernombre + " " +
                                        (item.alumnos.beneficiario.segundonombre != null ? item.alumnos.beneficiario.segundonombre : "") + "</td>" +
                                        "<td>" + item.alumnos.beneficiario.primerapellido + " " +
                                        (item.alumnos.beneficiario.segundoapellido != null ? item.alumnos.beneficiario.segundoapellido : "") + "</td>" +
                                        "<td>" + item.porcentajeaprobacionobtenido + "%</td>" +
                                        "<td>" + (item.calificacionfuncionario == 1 ? "Aprobado" : "Reprobado") + "</td>" +
                                        "<td>" + (item.calificacionfinal == 1 ? "Aprobado" : "Reprobado") + "</td>" +
                                        "</tr>";
                                $('#tableData tr:last').after(row);
                            });
                            swal({
                                title: "Registrar Calificación",
                                text: result.descripcion,
                                type: "success",
                                confirmButtonText: "Aceptar"
                            }, function () {
                                $("#resultados").show();
                                $("#registrar").remove();
                            });
                        } else if (result.status == "2") {
                            $(".preloader").fadeOut();
                            $("#modalSesion").modal("hide");
                            swal({
                                title: "Registrar Asistencia",
                                text: _mensajes.errorProcesandoArchivo,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            }, function () {
                                errorListMsg(result.descripcion);
                                $("#msgContainer").show();
                                $("#registrar").remove();
                            });
                        } else {
                            swal({
                                title: "Registrar Asistencia",
                                text: _mensajes.errorProcesandoArchivo,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            });
                        }
                    },
                    error: function (error) {
                        if (error.status == 200) {
                            swal({
                                title: "Registrar Calificación",
                                text: _mensajes.sesionExpiro,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            }, function () {
                                location.replace(context + "/mostrarLogin");
                            });
                        } else {
                            swal({
                                title: "Registrar Calificación",
                                text: _mensajes.errorAjax,
                                type: "error",
                                confirmButtonText: "Aceptar"
                            });
                        }
                    }
                });
                $(".preloader").fadeOut();
            }
        } else {
            swal({
                title: "Registrar Calificación",
                text: _mensajes.soloTXT,
                type: "error",
                confirmButtonText: "Aceptar"
            });
        }
    }
}