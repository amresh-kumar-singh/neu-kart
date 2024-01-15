import { React } from "react";
import CustomizedTables from "../../components/Table";
import useGetData from "../../hooks/useGetData";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Info from "@/components/Info";

function Invoice() {
  const { data } = useGetData();
  const headers = ["item", "quantity", "price", "total"];
  const mappedData = data.ordered.items?.flatMap(({ name, quantity, price }) =>
    quantity
      ? {
          item: name,
          quantity,
          price,
          total: quantity * price,
        }
      : []
  );
  const total = data.ordered.total;

  return (
    <Grid
      container
      width="80%"
      justifyContent="center"
      margin="auto"
      spacing={2}
    >
      <Grid xs={12} item>
        <CustomizedTables {...{ headers, data: mappedData }} />
      </Grid>
      <Grid item xs={12}>
        <Typography textAlign="right">Total : ₹{total}</Typography>
      </Grid>
      <Info message="Payment successful" severity="success" />
    </Grid>
  );
}

export default Invoice;
