'use strict';
module.exports = (sequelize, DataTypes) => {
    var Wosub = sequelize.define('Wosub', {
        idwosub: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        idwo: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        cantwosub: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        descwosub: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idproducto: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'producto',
                key: ' idproducto'
            }
        },
        /*  puwosub: {
              type: DataTypes.STRING,
              allowNull: true
          }, */
        descuentoemp: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        idstwosub: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'statuswosub',
                key: 'idstwosub'
            }
        },
        tipowosub: {
            type: DataTypes.INTEGER(11),
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
        tableName: 'wosub'
    });

    Wosub.associate = function (models) {
        Wosub.belongsTo(models.Producto, { foreignKey: 'idproducto' });

        Wosub.belongsTo(models.Statuswosub, { foreignKey: 'idstwosub' });

    };

    return Wosub;
}