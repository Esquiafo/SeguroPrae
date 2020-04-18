const db = require('../../database/models/');
const Products = db.products;
const PrdCategories = db.prdCategories;

module.exports = {
	productsAll: (req, res) => {
        let offsetPage = 0;
                
        if (req.query.page){
            if (Number(req.query.page) == 1){
                offsetPage = 0;
            }
            offsetPage = (Number(req.query.page) - 1) * 10;
        }

        Products
            .findAndCountAll({
                attributes: ["id", "description", "price",'image'],
                include: [{ 
                    association: 'prdCategory',
                    attributes: ["id", "name"]
                }],
                limit: 10,
                offset: offsetPage
            })
            .then( async products => {
                let categories = await PrdCategories.findAll({
                    include: [{ 
                        association: 'products',
                        attributes: ["id"]
                    }]
                });        
            
                let totalPages = Math.ceil(products.count/2);    
                let productList = products.rows.map( oneProduct => {
                    return oneProduct = {
                        id: oneProduct.id,
                        image: oneProduct.image,
                        description: oneProduct.description,
                        price: oneProduct.price,
                        category: oneProduct.prdCategId,
                        url: `http://localhost:3000/api/products/allProducts/${oneProduct.id}`,
                        }
                });

                let page = Number(req.query.page);
                let nextUrl = `http://localhost:3000/api/products/allProducts/?page=2`;
                let prevUrl = null;
                if(page && page != 1 ){
                    
                    prevUrl = `http://localhost:3000/api/products/allProducts/?page=${(page - 1)}`;
                    
                    if( page < totalPages ) {
                        nextUrl = `http://localhost:3000/api/products/allProducts/?page=${page + 1}`;
                    } else {
                        nextUrl = null;
                    }
                    
                }

                return res.status(200).json({
                    status: 200,
                    total_results: products.count,
                    total_categories: categories.length,
                    next: nextUrl,
                    prev: prevUrl,
                    total_pages: totalPages,
                    products: productList
                });
                
			})
			.catch(error => res.send(error));
	},
}