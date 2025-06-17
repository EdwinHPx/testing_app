import {showConfirmAlert} from "../../assets/helpers/messages.js";
//valida los inputs con el color puesto en el css de asignaturas
export const validation = (inputName, errorMessage,validacionRegex,invalidoMsg) => {
    const inputEntrada = inputName.val();
    if (validacionRegex(inputEntrada)  ) {
        inputName.removeClass("is-invalid").addClass("is-valid");
        errorMessage.hide();
    } else {inputName.removeClass("is-valid").addClass("is-invalid");
        errorMessage.text(invalidoMsg).show(); }
};//validacion del select del modal
export const validationSelect = (selectName, errorMessage, invalidoMsg) => {
    const selectValor = selectName.val();
    if (selectValor !== "") {
        selectName.removeClass("is-invalid").addClass("is-valid");
        errorMessage.hide();
    } else {
        selectName.removeClass("is-valid").addClass("is-invalid");
        errorMessage.text(invalidoMsg).show();
    }
};//Validacion de todos los inputs para activar o desactivar el boton
export const checkValidacion = (inputsNames, btnName) => {
    const inputs = $(inputsNames);
    const btn = $(btnName);
    let inputsVal = true;
    const validarInputs = () => {
        inputsVal = true; 
        inputs.each(function() {
            if (!$(this).hasClass('is-valid')) {
                inputsVal = false;
                return false;}});
        btn.attr('disabled', !inputsVal);
    };// Revisar eventos keyup de inputs de texto como change para selects
    inputs.on('keyup change input', validarInputs);
    validarInputs();
};//bloquear los inputs del modal
export const blockSelect = (select, inputs)=> {
    if (select.val()) {
        inputs.prop("disabled", false); 
    } else { inputs.prop("disabled", true);   }
    select.on('change', () => {
        if (select.val()) {
            inputs.prop("disabled", false);
        } else {inputs.prop("disabled", true);}});
};//limpiar inputs del modal si se cambia de opcion del select       
export const resetInputs = (inputs)=> {
    inputs.val('');                    
    inputs.removeClass('is-valid is-invalid'); 
}//llamar funcion de alerta de cambiar opcion del select
export const alertSelect = (select, inputs, text) => {
    let contadorSelect = 0;
    let valorSelect = select.val(); //valor actual del select
    select.on("change", () => {
        contadorSelect++;
        let valorSelectNuevo = select.val();
        blockSelect(select, inputs);
        if (contadorSelect > 1) {
            showConfirmAlert('¿Estás seguro?', text, (result) => {
                if (result.isConfirmed) {
                    resetInputs(inputs);
                    valorSelect = valorSelectNuevo; 
                } else {
                    select.val(valorSelect); //se devuekve el primer valor elegido 
                }
            });
        } else { valorSelect = valorSelectNuevo;}
    });
};
export const showCreditos = (horasPracticasInput, horasTeoricasInput, creditosInput) => {
    const hPracticas = parseInt(horasPracticasInput.val()) || 0;
    const hTeoricas = parseInt(horasTeoricasInput.val()) || 0;
    const totalCreditos = hPracticas + hTeoricas;
    creditosInput.val(totalCreditos);
};
export async function verificarClaveAsignatura(carreraSeleccionada, claveAsignatura, claveInput, claveError) {
    try {
        const response = await $.post('controller/rutas.php', {
            accion: 'asignaturas',
            data: {
                metodo: 'valClvCarrera',
                data: { abrvCarrera: carreraSeleccionada, cAsignatura: claveAsignatura }
            }
        });
        if (response.status === true) {
            claveInput.removeClass("is-valid").addClass("is-invalid");
            claveError.text("La clave ya existe para esta carrera").show();
        } else {
            claveInput.removeClass("is-invalid").addClass("is-valid");
            claveError.hide();
        }
        checkValidacion(`${claveInput.selector}, #nomb-asig, #ht-asig, #hp-asig, #inp-semestre, #select-carrera`, '#btn-asig');
    } catch (error) {console.log(error);}
};
export async function verificarCurp(inputElement, errorElement, ruta, accion, metodo) {
    try {
        const curpValue = inputElement.val().trim();
        if (curpValue === "") {
            inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("El campo de CURP no puede estar vacío").show();
            return;
        }
        const response = await $.post(`${ruta}`, {
            accion: `${accion}`,data: {metodo: `${metodo}`,
                data: { curp: curpValue }
            }
        });
        if (response.Status === true) {
            inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("La CURP ya existe").show();
        } else {
            inputElement.removeClass("is-invalid").addClass("is-valid");
            errorElement.hide();
        }
        checkValidacion(
            "#d-curp, #d-email, #d-materno, #d-rfc, #d-horas, #d-correo, #n-estudios, #d-area, #d-status, #d-carrera", 
            "#regdoc"
        );
        checkValidacion("#d-nombreED, #d-paternoED, #d-maternoED, #d-curpED, #d-rfcED, #d-horasED, #d-correoED, #n-estudiosED, #d-areaED, #d-statusED, #d-carreraED", "#regdocED");
    } catch (error) {
        console.log("Error al verificar CURP:", error);
    }
}

export async function verificarRfc(inputElement, errorElement, ruta, accion, metodo) {
    try {
        const rfcValue = inputElement.val().trim();
        if (rfcValue === "") {
            inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("El campo de RFC no puede estar vacío").show();
            return;
        }
        const response = await $.post(`${ruta}`, {
            accion: `${accion}`,data: { metodo: `${metodo}`,
                data: { rfc: rfcValue }
            }
        });
        if (response.Status === true) {
            inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("El RFC ya existe").show();
        } else {
            inputElement.removeClass("is-invalid").addClass("is-valid");
            errorElement.hide();
        }
        checkValidacion(
            "#d-curp, #d-email, #d-materno, #d-rfc, #d-horas, #d-correo, #n-estudios, #d-area, #d-status, #d-carrera", 
            "#regdoc"
        );
        checkValidacion("#d-nombreED, #d-paternoED, #d-maternoED, #d-curpED, #d-rfcED, #d-horasED, #d-correoED, #n-estudiosED, #d-areaED, #d-statusED, #d-carreraED", "#regdocED");
    } catch (error) {
        console.log("Error en la verificación de RFC:", error);
    }
}

export async function verificarEmail(inputElement, errorElement, ruta, accion, metodo) {
    try { const emailValue = inputElement.val().trim();
        if (emailValue === "") {
            inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("El campo de correo no puede estar vacío").show();
            return;}
        const response = await $.post(`${ruta}`, {
            accion: `${accion}`,
            data: {metodo: `${metodo}`,
                data: { correo: emailValue }
            }
        });
        if (response.Status === true) {
            inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("El correo ya existe").show();
        } else {inputElement.removeClass("is-invalid").addClass("is-valid");
            errorElement.hide();
        }
        checkValidacion("#d-nombreED, #d-paternoED, #d-maternoED, #d-curpED, #d-rfcED, #d-horasED, #d-correoED, #n-estudiosED, #d-areaED, #d-statusED, #d-carreraED", "#regdocED");
        checkValidacion("#d-nombre, #d-paterno, #d-materno, #d-curp, #d-rfc, #d-horas, #d-correo, #n-estudios, #d-area, #d-status, #d-carrera","#regdoc");
    checkValidacion("#est-nombre, #est-paterno, #est-materno, #est-matricula, #est-generacion, #est-correo, #est-carrera, #est-grupo, #est-semestre", "#regestudiante");
    checkValidacion("#est-nombreED, #est-paternoED, #est-maternoED, #est-matriculaED, #est-generacionED, #est-correoED, #est-carreraED, #est-grupoED, #est-semestreED", "#regestudianteED");
    } catch (error) {console.log("Error en la verificación de Email:", error);}
}
export async function verificarMatricula(inputElement, errorElement, ruta, accion, metodo) {
    try {const matriculaValue = inputElement.val().trim();
        if (matriculaValue === "") {inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("El campo de matricula no puede estar vacío").show();
            return;
        }
        const response = await $.post(`${ruta}`, {
            accion: `${accion}`,data: {metodo: `${metodo}`,
                data: { matricula: matriculaValue }}
        });
        if (response.Status === true) { inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("La matricula ya existe").show();
        } else {inputElement.removeClass("is-invalid").addClass("is-valid");
            errorElement.hide();}
    checkValidacion("#d-nombre, #d-paterno, #d-materno, #d-curp, #d-rfc, #d-horas, #d-correo, #n-estudios, #d-area, #d-status, #d-carrera","#regdoc");
    checkValidacion("#est-nombre, #est-paterno, #est-materno, #est-matricula, #est-generacion, #est-correo, #est-carrera, #est-grupo, #est-semestre", "#regestudiante");
    checkValidacion("#est-nombreED, #est-paternoED, #est-maternoED, #est-matriculaED, #est-generacionED, #est-correoED, #est-carreraED, #est-grupoED, #est-semestreED", "#regestudianteED");
    } catch (error) { console.log("Error en la verificación de Email:", error);}
}
export async function verificarEscuela(slctElement,inputElement, errorElement) {
    try {
        const dependenciaValue = slctElement.val(); 
        const escuelaValue = inputElement.val().trim(); 
        if (escuelaValue === "") {
            inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("El campo de Nombre Escuela no puede estar vacío").show();
            return;
        }
        const response = await $.post('controller/rutas.php', {
            accion: 'bachilleratos',
            data: {
                metodo: 'verificarEscuela',
                data: {
                    dependNombre: dependenciaValue,
                    nombreEscuela: escuelaValue
                }
            }
        });
        if (response.status === true) {
            inputElement.removeClass("is-valid").addClass("is-invalid");
            errorElement.text("La Escuela ya existe").show();
        } else {
            inputElement.removeClass("is-invalid").addClass("is-valid");
            errorElement.hide();
        }
        checkValidacion("#slct-depen, #nomb-escue", "#btn-escue");
        checkValidacion("#slct-editDepen, #nomb-editEscue", "#btn-EditEscue");

    } catch (error) {
        console.log("Error en la verificación de Escuela:", error);
    }
};