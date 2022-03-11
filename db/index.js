const { Password } = require("../config.js");
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "andy",
  password: `${Password}`,
  database: "sdcproducts",
});

const getAllProducts = (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  pool.query(
    "SELECT * FROM products LIMIT $2 OFFSET $1",
    [page * count - count, count],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(results.rows);
    }
  );
};

const getProduct = (req, res) => {
  const id = req.params.product_id;
  const query = `SELECT row_to_json(products)
  FROM (
    SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price,
      (
        SELECT json_agg(row_to_json(features))
        FROM features
        WHERE product_id=products.id
      ) AS features
    FROM products
    WHERE id=$1
  ) products`;

  pool.query(query, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows[0].row_to_json);
  });
};

const getStyles = (req, res) => {
  const id = req.params.product_id;
  const query = `
  SELECT row_to_json(products)
  FROM (
    SELECT products.id,
        (
        	  SELECT json_agg(row_to_json(nested_styles))
        	  FROM (
	        	      SELECT styles.style_id,
					               styles.name,
					               styles.original_price,
					               styles.sale_price,
					               "default?",
		     	  	      (
		     			       SELECT json_agg(row_to_json(nested_photos))
		     			       FROM (
		     			      	     SELECT
		     			      	     photos.url,
		     			      	     photos.thumbnail_url
			     		      	     FROM photos
			     		      	     WHERE photos.style_id = styles.style_id
		     			            ) AS nested_photos
		     		        ) AS photos,
				  			    (
                    SELECT json_object_agg(
							        skus.id, json_build_object(
							          'quantity', skus.quantity, 'size', skus.size)
                        )as skus
                    FROM skus
                    WHERE skus.style_id = styles.style_id
                    )
		              FROM styles
		              WHERE styles.product_id = products.id
        	  ) AS nested_styles
        ) AS results
    FROM products
    WHERE products.id = $1
  ) products;`;

  pool.query(query, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(results.rows[0].row_to_json);
  });
};

const getRelated = (req, res) => {
  const id = req.params.product_id;
  const query = `select array_agg(related_products.related_product_id)
	from related_products
	where product_id = $1`;

  pool.query(query, [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(results.rows[0].array_agg);
  });
};

module.exports = {
  getAllProducts,
  getProduct,
  getStyles,
  getRelated,
};
