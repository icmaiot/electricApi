'use strict';
module.exports = (sequelize, DataTypes) => {
    var Modulormt = sequelize.define('Modulormt', {
        idrmt: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        serialrmt: {
            type: DataTypes.STRING,
            allowNull: false
        },/*
        ciclormt: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        segrmt: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        fereset: {
            type: DataTypes.STRING,
            allowNull: true
        }, */
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'modulormt'
    });

    return Modulormt;
}