'use strict';
module.exports = (sequelize, DataTypes) => {
    var Condpago = sequelize.define('Condpago', {
        idcondpago: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        condpago: {
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
        tableName: 'condpago'
    });

    Condpago.associate = function (models) {
        Condpago.hasOne(models.Empresa, { foreignKey:'idcondpago' });
    };

    return Condpago;
}