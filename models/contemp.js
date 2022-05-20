'use strict';

module.exports = (sequelize, DataTypes) => {
    var Contemp = sequelize.define('Contemp',
        {
            idcontemp: {
                primaryKey: true,
                type: DataTypes.INTEGER(11)
            },
            idempresa: {
                type: DataTypes.INTEGER(11),
                reference: {
                    model: 'empresa',
                    key: 'idempresa'
                }
            },
            nomcontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            depcontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            puestocontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pbxcontemp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            extcontemp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            movcontemp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            emailcontemp: {
                type: DataTypes.STRING,
                allowNull: true
            },
            activocontemp: {
                type: DataTypes.INTEGER(11),
                allowNull: true
            }
        },


        {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'contemp'
        });

    Contemp.associate = function (models) {
        Contemp.hasOne(models.Empresa, { foreignKey: 'idempresa' });

        //Contemp.hasOne(models.Wo);
    };

    return Contemp;
};

