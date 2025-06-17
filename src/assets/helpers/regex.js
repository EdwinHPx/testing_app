
export const valCurp = (inputCurp) => {
    const regCurp = /^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[A-Z0-9][0-9]$/;
    return regCurp.test(inputCurp);
};
export const valRFC = (inputRFC) => {
    const regRFC = /^([A-Z]{4})([0-9]{6})([A-Z0-9]{3})$/;
    return regRFC.test(inputRFC);
};
export const valAbre = (inputAbre) => {
    const regAbre = /^[A-Z]{4}$/;
    return regAbre.test(inputAbre);
};
export const valTel = (inputTel) => {
    const regTel = /^[0-9]{10}$/;
    return regTel.test(inputTel);
};
export const valCP = (inputCP) => {
    const regCP = /^[0-9]{5}$/;
    return regCP.test(inputCP);
};
export const valNum = (inputNum) => {
    const regNum = /^[0-9]{1,2}$/;
    return regNum.test(inputNum);
};
export const valSeme = (inputSeme) => {
    const regSeme = /^(?:[1-9]|1[0-2])$/;
    return regSeme.test(inputSeme);
};
export const valNom = (inputNom) => {
    const regNom = /^[a-zA-Z'-]+(?: [a-zA-Z'-]+)?$/;
    return regNom.test(inputNom);
};
export const valLetras = (inputLetras) => {
    const regLetras = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
    return regLetras.test(inputLetras);
};
export const valTexto = (inputTexto) => {
    const expresion_texto = /^[A-Za-zÀ-ÿ.,][A-Za-zÀ-ÿ.,\s]*$/;
    return expresion_texto.test(inputTexto);
};
export const valTextoNum = (inputTextoNum) => {
    const regTextoNum = /^[A-Za-zÀ-ÿ0-9. ]+$/;
    return regTextoNum.test(inputTextoNum);
};

export const valEspeciales = (inputEspeciales) => {
    const regEspeciales = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return regEspeciales.test(inputEspeciales);
};
export const valCorreoInstitucional = (inputCorreo) => {
    const regCorreo = /[a-z]+\.[a-z]+@(itsvc.edu.mx|vcarranza.tecnm.mx)/;
    return regCorreo.test(inputCorreo);
};
export const valEmail = (inputEmail) => {
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regEmail.test(inputEmail);
};
export const valMatricula = (inputMatricula) => {
    const regMatricula = /\d{2}VC\d{4}/;
    return regMatricula.test(inputMatricula);
};
export const valGeneracion = (inputGeneracion) => {
    const regGeneracion = /\d{4}-\d{4}/;
    return regGeneracion.test(inputGeneracion);
};
export const valFecha = (inputFecha) => {
    const regFecha = /\d{4}-\d{2}-\d{2}/;
    return regFecha.test(inputFecha);
};
export const valClaveAsignatura = (inputClaveAsignatura) => {
    const clvAsignatura = /^[A-Z]{3}-\d{4}$/;
    return clvAsignatura.test(inputClaveAsignatura);
};
export const valClaveReticula = (inputClaveReticula) => {
    const clvReticula = /^[A-Z]{4}-\d{4}-\d{3}$/;
    return clvReticula.test(inputClaveReticula);
};
export const valGrupo = (inputGrupo) => {
    const regGrupo = /^\d{1,2}[A-Z]$/;
    return regGrupo.test(inputGrupo);
};
