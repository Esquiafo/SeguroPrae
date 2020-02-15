module.exports = (sequelize, DataTypes) => {
	let alias = 'products';

	let columns = {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		description: DataTypes.STRING,
		price: DataTypes.INTEGER,
		image: DataTypes.STRING,
		prdCategId: DataTypes.INTEGER
	};

	const product = sequelize.define(alias, columns);

	product.associate = (models) => {
		// belongsTo 
		product.belongsTo(models.brands, {
			as: 'prdCategory',
			foreignKey: 'prdCategId'
		});
		
	}

	// product.prototype.getRoundPrice = function () {
	//	return Number(this.price).toFixed();
	// }
 
	return product;
}