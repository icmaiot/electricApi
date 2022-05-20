'use strict';
module.exports = (sequelize, DataTypes) => {
    var Evento_registro = sequelize.define('Evento_registro', {
        id_falla: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        id_evento: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        codigo_falla: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion_falla: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'evento_registro'
    });

    Evento_registro.associate = function (models) {
    Evento_registro.hasOne(models.Evento_asignacion);
    }
    return Evento_registro;
}