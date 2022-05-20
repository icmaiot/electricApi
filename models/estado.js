'use strict';
module.exports = (sequelize, DataTypes) => {
    var Estado = sequelize.define('Estado', {
        idestado: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        idpais: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        estado: {
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
        tableName: 'estado'
    });

    Estado.associate = function (models) {
     //   Estado.hasOne(models.Empresa, { foreignKey:'idestado' });
    };

    return Estado;
}