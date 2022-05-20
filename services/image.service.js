/*jshint esversion: 6 */
const imageFileFormats = ['JPG', 'JPEG', 'PNG', 'JFIF', 'PJPEG', 'PJP'];
const fs = require('fs');
const path = require('path');

function uploadImage(object, req_files) {
    return new Promise((resolve, rejected) => {
        const file_path = req_files.image.path;
        const file_split = file_path.split('\\');
        const file_name = file_split[1];
        const ext_split = file_name.split('\.');
        const file_ext = ext_split[1];
        if (imageFileFormats.includes(file_ext.toUpperCase())) {
            if (object.image !== null) {
                deleteImage(object.image, './uploads/', false);
            }
            object.update({
                image: file_name
            }).then(() => {
                resolve(object.image);
            }).catch(err => {
                fs.unlink(file_path, (err) => {
                    if (err) {
                        rejected({ error: 'Ocurrio un error al intentar eliminar el archivo' });
                    }
                });
                rejected({ error: 'Ocurrio un error al actualizar el objeto' });
            });
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    rejected({ error: 'Error al intentar eliminar el archivo subido' });
                }
            });
            rejected({ error: 'La extensión del archivo no es valida' });
        }
    });
}

function getImage(image, route, thumb) {
    return new Promise((resolve, rejected) => {
        img_path = route + '/' + image;
        fs.stat(img_path, function (err, stats) {
            if (stats) {
                resolve(path.resolve(img_path));
            } else {
                return rejected({ status: 'error' });
            }
        });
    });
}

function deleteImage(image, route, hasThumbnail = false) {
    return new Promise((resolve, rejected) => {
        const delete_file_path = route + '/' + image;
        fs.unlink(delete_file_path, (err) => {
            if (err) {
                rejected({ status: 'error', message: 'No se elimina la imagen ya que la imagen indicada no existe' });
            } else {
                resolve({ status: 'ok' });
            }
        });
    });
}

module.exports = {
    uploadImage,
    deleteImage,
    getImage
};