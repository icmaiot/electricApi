'use strict';
module.exports = (sequelize, DataTypes) => {
    var Lineaprod= sequelize.define('Lineaprod', {
        idlineaprod: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        lineaprod: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Descripcion: {
            type: DataTypes.STRING,
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
            tableName: 'lineaprod'
        });

    return Lineaprod;
}