import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useGetData from "@/hooks/useGetData";
import CustomizedTables from "@/components/Table";
import { Grid, Typography } from "@mui/material";

function SoldProductAndDiscount() {
  const { auth } = useAuth();
  const {
    data: { soldProductsLists },
    setData,
  } = useGetData();

  useEffect(() => {
    handleFetchData();
  }, []);

  async function handleFetchData() {
    //   setLoading(true);
    //   setError("");
    try {
      const res = await fetch("api/admin/soldProductAndDiscount", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user.id}`,
        },
      });
      const dataFetched = await res.json();
      if (dataFetched.soldProductsLists) {
        setData((prev) => ({ ...prev, ...dataFetched }));
      }

      if (dataFetched.error) setError(dataFetched.error);
    } catch (e) {
      console.log(e);
      // setError(e.message);
    } finally {
      // setLoading(false);
    }
  }

  const headers = ["name", "quantity", "price"];

  if (!Object.values(soldProductsLists || {}).filter((item) => item).length)
    return (
      <Typography variant="h6" textAlign="center">
        {" "}
        No products to show!{" "}
      </Typography>
    );

  return (
    <Grid
      container
      width="80%"
      justifyContent="center"
      margin="auto"
      spacing={2}
    >
      <Grid xs={12} item>
        <CustomizedTables
          {...{ headers, data: Object.values(soldProductsLists) }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign="right">
          Total purchase amount : ₹{soldProductsLists.total}
        </Typography>
      </Grid>
    </Grid>
  );
}
export default SoldProductAndDiscount;
