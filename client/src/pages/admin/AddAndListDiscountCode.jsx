import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useGetData from "@/hooks/useGetData";
import CustomizedTables from "@/components/Table";
import { Grid, Typography } from "@mui/material";
import GenerateDiscountCode from "@/components/admin/GenerateDiscountCode";
import Error from "@/components/Info";

function SoldProductAndDiscount() {
  const { auth } = useAuth();
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const {
    data: { discountCodesAndTotal },
    setData,
  } = useGetData();

  useEffect(() => {
    handleFetchData();
  }, []);

  async function handleFetchData() {
    //   setLoading(true);
    setError("");
    try {
      const res = await fetch("api/admin/soldProductAndDiscount", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user.id}`,
        },
      });

      const dataFetched = await res.json();
      if (dataFetched.discountCodesAndTotal) {
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

  const headers = ["id", "used", "totalDiscount"];

  return (
    <Grid
      container
      width="80%"
      justifyContent="center"
      margin="auto"
      spacing={2}
      marginTop="2.5rem"
    >
      <GenerateDiscountCode setError={setError} />
      {!discountCodesAndTotal.discountCodes?.length ? (
        <Typography variant="h6" textAlign="center">
          {" "}
          No Discount codes to show!{" "}
        </Typography>
      ) : (
        <>
          <Grid xs={12} item>
            <CustomizedTables
              {...{ headers, data: discountCodesAndTotal.discountCodes }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign="right">
              Total discount amount : ₹{discountCodesAndTotal.total}
            </Typography>
          </Grid>
        </>
      )}
      <Error message={error} severity="error" />
    </Grid>
  );
}
export default SoldProductAndDiscount;
