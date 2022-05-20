'use strict';
module.exports = (sequelize, DataTypes) => {
    var Evento = sequelize.define('Evento', {
        idevento: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        evento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'evento'
    });

    Evento.associate = function (models) {
        Evento.hasOne(models.ConfiguracionModulo,  { foreignKey: 'idevento' });
        Evento.hasOne(models.Tiempomuertop, { foreignKey:'evento' });
    };
    return Evento;
}