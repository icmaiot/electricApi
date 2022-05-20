'use strict';
module.exports = (sequelize, DataTypes) => {
    var Turnosdescanso= sequelize.define('Turnosdescanso', {
        idturdesc: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        idturno: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        numdesc: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        desc1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc1dur: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        desc2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc2dur: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        desc3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc3dur: {
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
        tableName: 'turnosdescanso'
    });

    return Turnosdescanso;
}