'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tiempomuerto = sequelize.define('Tiempomuerto', {
        lote: {
            
            type: DataTypes.INTEGER(11)
        },
        idmaquina: {
            primaryKey: true,
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        modulo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duraciontm: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paroi:{
            type:DataTypes.INTEGER(11),
            allowNull: true
        },
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'tiempomuerto'
        });

    return Tiempomuerto;
}