'use strict';
module.exports = (sequelize, DataTypes) => {
    var Prodregisro = sequelize.define('Prodregisro', {
        idprogprod: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        cant: {
            type: DataTypes.DECIMAL(10)
        },
        prioridad: {
            type: DataTypes.INTEGER(10)
        },
        idwo: {
            type: DataTypes.INTEGER(10)
        },
        idmaquina:{
            type:DataTypes.INTEGER(11)
        },
        idempresa:{
            type:DataTypes.INTEGER(11)
        },
        tcarga:{
            type:DataTypes.INTEGER(11)
        },
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'prodregisro'
        });
        
    return Prodregisro;
}