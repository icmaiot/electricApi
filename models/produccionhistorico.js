'use strict';
module.exports = (sequelize, DataTypes) => {
    var Produccionhistorico = sequelize.define('Produccionhistorico', {
        loteac: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        distancia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        velocidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        code_bar: {
            type: DataTypes.STRING,
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
        tableName: 'produccion_historico'
    });

    return Produccionhistorico;
}