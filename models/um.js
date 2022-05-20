'use strict';
module.exports = (sequelize, DataTypes) => {
    var Um = sequelize.define('Um', {
        idum: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        um: {
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
        tableName: 'um'
    });

    Um.associate = function (models) {
        Um.hasOne(models.Producto);
    };
    return Um;
}