'use strict';
module.exports = (sequelize, DataTypes) => {
    var Pais = sequelize.define('Pais', {
        idpais: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        pais: {
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
        tableName: 'pais'
    });

    Pais.associate = function (models) {
       // Pais.hasOne(models.Empresa, { foreignKey:'idpais' });
    };

    return Pais;
}