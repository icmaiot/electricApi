'use strict';
module.exports = (sequelize, DataTypes) => {
    var Funcusu = sequelize.define('Funcusu', {
        IDfuncusu: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        funcusu: {
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
        tableName: 'Funcionusuario'
    });

    // Funcusu.associate = function (models) {
    //     Funcusu.hasOne(models.Usuario);
    // };
    return Funcusu;
}