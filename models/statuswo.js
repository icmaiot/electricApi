'use strict';
module.exports = (sequelize, DataTypes) => {
    var Statuswo = sequelize.define('Statuswo', {
        idstatuswo: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        statuswo: {
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
        tableName: 'statuswo'
    });

    Statuswo.associate = function (models) {
       // Statuswo.hasOne(models.Wo);
        
    };

    return Statuswo;
}