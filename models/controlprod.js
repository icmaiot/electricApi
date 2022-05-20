'use strict';
module.exports = (sequelize, DataTypes) => {
    var Controlprod = sequelize.define('Controlprod', {
        idcontrolprod: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        skuprod: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mts: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        mtsmin: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
        skunext: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        statusprod: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
        },
    }, {

        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'controlprod'
    });

    return Controlprod;
}