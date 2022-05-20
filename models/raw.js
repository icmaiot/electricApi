'use strict';
module.exports = (sequelize, DataTypes) => {
    var Raw = sequelize.define('Raw', {
        idraw: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        desc_raw: {
            type: DataTypes.STRING,
            allowNull: false
        },
        um_raw: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'um',
                key: 'idum'
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
        tableName: 'raw'
    });

    Raw.associate = function (models) {
        Raw.belongsTo(models.Um, { foreignKey: 'um_raw' });
    };
    return Raw;
}