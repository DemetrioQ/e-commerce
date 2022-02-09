import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import ProductPageContent from './ProductPageContent';
import useStyles from './styles';

const ProductPage = ({ products }) => {
  const [product, setProduct] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const params = useParams();
  const classes = useStyles();
  const getProductPromise = () => {
    return new Promise((resolve, reject) => {
      const prod = products.find((product) => {
        return params.permalink === product.permalink;
      });
      if (prod) {
        resolve(prod);
      }
    });
  };

  const getProduct = async () => {
    setProduct(await getProductPromise(params.permalink, products));
    if (product) {
      setIsFetching(false);
    }
  };

  getProduct();

  useEffect(() => {}, []);

  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {!isFetching ? (
          <Grid container justifyContent='flex-start'>
            <Grid key={product.id} item xs={12} sm={5} md={5} lg={3}>
              <ProductPageContent product={product} />
            </Grid>
          </Grid>
        ) : (
          <CircularProgress className={classes.spinner} />
        )}
      </main>
    </>
  );
};

export default ProductPage;
