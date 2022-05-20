'use strict'

module.exports = (sequelize, DataTypes) => {
    var TipoEquipo = sequelize.define('TipoEquipo', {
        idtipo: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        tipoequipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            defaultScope: {
                attributes: { exclude: ['createAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'tipoequipo'
        });

    TipoEquipo.associate = function (models) {
        TipoEquipo.hasMany(models.Maquina);
    };

    return TipoEquipo;
}