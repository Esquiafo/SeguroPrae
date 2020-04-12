module.exports = (sequelize, DataTypes) => {
	let alias = 'users';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		docType: DataTypes.STRING,
		docNum: DataTypes.INTEGER,
		avatar: DataTypes.STRING,
		usrCategId: DataTypes.INTEGER
	};

	const user = sequelize.define(alias, columns);

	user.associate = (models) => {
		// belongsTo 
		user.belongsTo(models.usrCategories, {
			as: 'usrCategory',
			foreignKey: 'usrCategId'
		});
		
	}

	return user;
}