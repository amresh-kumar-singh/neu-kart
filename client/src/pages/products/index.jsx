import { Box, Button, Grid } from "@mui/material";
import { React, useCallback, useEffect, useRef, useState } from "react";
import useGetData from "@/hooks/useGetData";
import SingleProduct from "@/components/products/SingleProduct";
import useAuth from "@/hooks/useAuth";
import uniqueObjects from "@/utils/uniqueFromArray";

function Products() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, setData } = useGetData();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState();

  // Using Intersection Observer for infinity loading
  const observer = useRef();
  const lastProductRefrence = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        // Hard coding the condition since knowing there is only 100 products
        if (entries[0].isIntersecting && data.products?.length <= 100) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  // Getting more products when page size is changed
  useEffect(() => {
    fetchProducts();
  }, [page]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch(`api/products?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user.id}`,
        },
      });
      const data = await res.json();

      if (data.products) {
        setData((prev) => ({
          ...prev,
          products: uniqueObjects([...(prev.products || []), ...data.products]),
        }));
      }
      if (data.error) {
        setData({});
        setAuth({});
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "90vw",
        margin: "auto",
        marginTop: "1.5rem",
      }}
    >
      {data.products?.map((item, index) => {
        return (
          <Grid
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            xl={3}
            sx={{
              marginBottom: "1.5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {data.products.length === index + 1 ? (
              <SingleProduct ref={lastProductRefrence} data={item} />
            ) : (
              <SingleProduct data={item} />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Products;
