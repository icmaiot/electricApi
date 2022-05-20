'use strict';
module.exports = (sequelize, DataTypes) => {
    var Subensamble = sequelize.define('Subensamble', {
        idsubens: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        subensamble: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc_subens: {
            type: DataTypes.STRING,
            allowNull: false
        },
        te_subens: {
            type: DataTypes.STRING,
            allowNull: false
        },
        um_subens: {
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
        tableName: 'subensamble'
    });

    Subensamble.associate = function (models) {
        Subensamble.belongsTo(models.Um, { foreignKey: 'um_subens' });
    };
    return Subensamble;
}