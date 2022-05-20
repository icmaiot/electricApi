'use strict';
module.exports = (sequelize, DataTypes) => {
    var Cia = sequelize.define('Cia', {
        idcia: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        razon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rfc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colonia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        eslogan: {
            type: DataTypes.STRING,
        }/*,
        logotipo_nombre:{
            type: DataTypes.STRING
        },
        logotipo_ext:{
            type: DataTypes.STRING
        }*/
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'cia'
        });

    Cia.associate = function (models) {
        Cia.hasMany(models.Departamento);
        Cia.hasMany(models.Area);
    };
    return Cia;
}