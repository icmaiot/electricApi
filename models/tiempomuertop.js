'use strict';
module.exports = (sequelize, DataTypes) => {
    var Tiempomuertop = sequelize.define('Tiempomuertop', {
        id_tm_periodo: {
            
            type: DataTypes.INTEGER(11)
        },
        lote: {
            primaryKey: true,
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        paroi: {
            type: DataTypes.STRING,
            allowNull: true
        },
        parof: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duracion_paro: {
            type: DataTypes.STRING,
            allowNull: true
        },
        evento:{
            type:DataTypes.INTEGER(11),
            allowNull: true
        },
        subcausa:{
            type:DataTypes.INTEGER(11),
            allowNull: true
        },
        inf: {
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
            tableName: 'tiempomuertoperiodo'
        });

        Tiempomuertop.associate = function (models) {
        Tiempomuertop.belongsTo(models.Evento, { foreignKey: 'evento' });
        Tiempomuertop.belongsTo(models.Eventocausa, { foreignKey: 'subcausa' });
        };

    return Tiempomuertop;
}