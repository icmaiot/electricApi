'use strict';
module.exports = (sequelize, DataTypes) => {
    var Acumcal = sequelize.define('Acumcal', {
        Idacdef: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        Idprogprod: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        acdef: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'Acumcal'
    });

    return Acumcal;
}