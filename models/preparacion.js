'use strict';
module.exports = (sequelize, DataTypes) => {
    var Preparacion = sequelize.define('Preparacion', {
        tname: {
            type: DataTypes.STRING
        },
        tnamep: {
            type: DataTypes.STRING
        },
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'preparacion'
        });
        
    return Preparacion;
}