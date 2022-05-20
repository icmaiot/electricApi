'use strict';
module.exports = (sequelize, DataTypes) => {
    var Acumscrap = sequelize.define('Acumscrap', {
        Idacscrap: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        Idprogprod: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        acscrap: {
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
        tableName: 'Acumscrap'
    });

    return Acumscrap;
}