module.exports = (sequelize, DataTypes) => {
	let alias = 'usrCategories';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: DataTypes.STRING,
	};

	const usrCategory = sequelize.define(alias, columns);

	usrCategory.associate = (models) => {
		// hasMany
		usrCategory.hasMany(models.users, {
			as: 'users',
			foreignKey: 'usrCategId'
		})
	}

	return usrCategory;
}