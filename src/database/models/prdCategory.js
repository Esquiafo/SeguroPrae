module.exports = (sequelize, DataTypes) => {
	let alias = 'prdCategories';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: DataTypes.STRING,
	};

	const prdCategory = sequelize.define(alias, columns);

	prdCategory.associate = (models) => {
		// hasMany
		prdCategory.hasMany(models.products, {
			as: 'products',
			foreignKey: 'prdCategId'
		})
	}

	return prdCategory;
}