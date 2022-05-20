'use strict';
module.exports = (sequelize, DataTypes) => {
    var Paro = sequelize.define('Paro', {
        idparos: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        maquina: {
            type: DataTypes.INTEGER(11)
        },
        sensor: {
            type: DataTypes.INTEGER(11)
        },
        hri:{
            type: DataTypes.DATE
        },
        hrf:{
            type: DataTypes.DATE
        },
        desbloqueo:{
            type: DataTypes.STRING
        },
        tiempoe:{
            type: DataTypes.DECIMAL
        },
        paroi:{
            type: DataTypes.DATE
        },
        parof:{
            type: DataTypes.DATE
        },
        tiempop:{
            type: DataTypes.DECIMAL
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'paros'
        });

    return Paro;
}