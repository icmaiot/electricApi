'use strict';
module.exports = (sequelize, DataTypes) => {
    var Maquina = sequelize.define('Maquina', {
        idmaquina: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        maquina: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Descripcion: {
            type: DataTypes.STRING
        },
        idarea: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'area',
                key: 'idarea'
            }
        },
        tipoequipo: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'tipoequipo',
                key: 'idtipo'
            }
        },
        idmodulo: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'modulointerfaz',
                key: 'idmodulo'
            },
            allowNull: true,
        },
        idrmt: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        turnoac: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        skuac: {
            type: DataTypes.STRING,
            allowNull: true
        },
        prodprogramada: {
            type: DataTypes.STRING,
            allowNull: true
        },
        prodesp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        distan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        delta: {
            type: DataTypes.STRING,
            allowNull: true
        },
        eficiencia: {
            type: DataTypes.STRING,
            allowNull: true
        },
        defsuma: {
            type: DataTypes.STRING,
            allowNull: true
        },
        scrapsuma: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tmuerto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        percent_calidad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oee: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oee_global: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estado_email: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        estado_desc: {
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
        tableName: 'maquina'
    });

    Maquina.associate = function (models) {
        Maquina.belongsTo(models.Area, { foreignKey: 'idarea' });
        Maquina.belongsTo(models.ModuloInterfaz, { foreignKey: 'idmodulo' });
        Maquina.belongsTo(models.TipoEquipo, { foreignKey: 'tipoequipo' });
    };
    return Maquina;

    // Maquina.belongsTo(models.ModuloInterfaz) idmodulo will be added on Maquina
    //Relacion 1-1 con ModuloInterfaz
}