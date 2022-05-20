'use strict';
module.exports = (sequelize, DataTypes) => {
    var SKU = sequelize.define('SKU', {
        idskumaquina: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        idproducto: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idmaquina:{
            type: DataTypes.INTEGER(11),
            references: {
                model: 'maquina',
                key: 'idmaquina'
            }
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'SKUmaquina'
    });

    SKU.associate = function (models) {
        SKU.belongsTo(models.Maquina, { foreignKey: 'idmaquina' });
    };

    return SKU;
}