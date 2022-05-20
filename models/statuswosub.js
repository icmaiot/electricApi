'use strict';
module.exports = (sequelize, DataTypes) => {
    var Statuswosub = sequelize.define('Statuswosub', {
        idstwosub: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        stwosub: {
            type: DataTypes.STRING,
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
        tableName: 'statuswosub'
    });

    Statuswosub.associate = function (models) {
        // Statuswo.hasOne(models.Wo);
        Statuswosub.hasOne(models.Wosub, { foreignKey: 'idstwosub' });

    };

    return Statuswosub;
}