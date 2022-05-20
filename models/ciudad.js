'use strict';
module.exports = (sequelize, DataTypes) => {
    var Ciudad = sequelize.define('Ciudad', {
        idciudad: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        idestado: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        ciudad: {
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
        tableName: 'ciudad'
    });

    Ciudad.associate = function (models) {
     //   Ciudad.hasOne(models.Empresa, { foreignKey: 'idciudad' });
        Ciudad.hasOne(models.Estado, { foreignKey: 'idciudad' });
    };

    return Ciudad;
}