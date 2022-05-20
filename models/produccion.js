'use strict';
module.exports = (sequelize, DataTypes) => {
    var Produccion = sequelize.define('Produccion', {
        idproduccion: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        idmaquina: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        lote: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        Cantidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Fecha: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Intervalo:{
            type:DataTypes.STRING,
            allowNull: true
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'Produccion'
        });

    return Produccion;
}