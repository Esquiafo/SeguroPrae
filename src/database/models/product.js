module.exports = (sequelize, DataTypes) => {
 const products = sequelize.define('products',{
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
 })

	products.associate = (models) => {
		// belongsTo 
		products.belongsTo(models.prdCategories, {
			as: 'prdCategory',
			foreignKey: 'prdCategId'
		});
		
	}

	// product.prototype.getRoundPrice = function () {
	//	return Number(this.price).toFixed();
	// }
 
	return products;
}
