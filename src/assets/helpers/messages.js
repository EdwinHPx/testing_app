export const alertsSave = (areSave) => {
    if (areSave.estado === true) {
        Swal.fire({
            icon: areSave.icon,
            title: areSave.title,
            text: areSave.text,
        });
    } else {
        Swal.fire({
            icon: areSave.icon1,
            title: areSave.title1,
            text: areSave.text,
        });
    }
}
export const showConfirmAlert = (title, text, callback) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cambiar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        callback(result);
    });
};
