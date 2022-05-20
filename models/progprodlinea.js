'use strict';
module.exports = (sequelize, DataTypes) => {
    var Progprodlinea= sequelize.define('Progprodlinea', {
        idprogprodlinea: {
            primaryKey: true,
            type: DataTypes.INTEGER(11),
            
        },
        idlineaprod: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idturnoprodlinea: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idskunow: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idskunext: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        cant:{
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        statprodlinea:{
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        tipoprod:{
            type:DataTypes.STRING,
            allowNull: true
        },

    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'progprodlinea'
        });

        Progprodlinea.associate = function (models) {
            Progprodlinea.hasMany(models.Producto, { foreignKey: 'idproducto' });
        };

    return Progprodlinea;
}