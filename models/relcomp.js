'use strict';
module.exports = (sequelize, DataTypes) => {
    var Relcomp = sequelize.define('Relcomp', {
        idrelcomercial: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        relcomercial: {
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
        tableName: 'relcomp'
    });

    Relcomp.associate = function (models) {
        Relcomp.hasOne(models.Empresa, { foreignKey:'idrelacion' });
    };

    return Relcomp;
}