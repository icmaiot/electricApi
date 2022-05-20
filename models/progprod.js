'use strict';
module.exports = (sequelize, DataTypes) => {
    var ProgProd = sequelize.define('ProgProd', {
        idprogprod: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        cant: {
            type: DataTypes.DECIMAL(10,2)
        },
        prioridad: {
            type: DataTypes.INTEGER(10)
        },
        idwosub: {
            type: DataTypes.INTEGER(10)
        },
        idstatus: {
            type: DataTypes.INTEGER(11)
        },
        idmaquina:{
            type:DataTypes.INTEGER(11)
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'progprod'
        });
        
    return ProgProd;
}