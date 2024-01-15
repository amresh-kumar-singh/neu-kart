import { React, useState } from "react";
import CustomizedTables from "../../components/Table";
import useGetData from "../../hooks/useGetData";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Error from "@/components/Info";

function AllProducts() {
  const { data, setData } = useGetData();
  const { auth } = useAuth();
  const [discountCode, setDiscountCode] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const headers = ["item", "quantity", "price", "total"];
  const mappedData = data.orders?.cart?.items?.flatMap(
    ({ name, quantity, price }) =>
      quantity
        ? {
            item: name,
            quantity,
            price,
            total: quantity * price,
          }
        : []
  );

  // In case cart is empty
  if (!mappedData?.length)
    return (
      <Typography variant="h6" textAlign="center">
        No Item in cart!
      </Typography>
    );

  const total = mappedData.reduce((acc, item) => acc + item.total, 0);
  const handleGetDiscountCode = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("api/getDiscountCode", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.user.id}`,
        },
      });
      const { data, error } = await res.json();
      if (data?.id) {
        setDiscountCode(data.id);
      }
      if (error) setError(error);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("api/checkout", {
        method: "POST",
        body: JSON.stringify({
          orderId: data.orders.cart.id,
          discountCode,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${auth.user.id}`,
        },
      });
      const { order, error } = await res.json();
      if (order?.paymentStatus === "paid") {
        setData((prev) => ({ ...prev, ordered: order, orders: null }));
        navigate("/invoice", { replace: true });
      }
      if (error) setError(error);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

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
      <Grid item xs={12} container justifyContent="space-between">
        <Typography>Total : ₹{total}</Typography>
        <TextField
          label="Discount code"
          type="text"
          size="small"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                title="Get Discount Code"
                onClick={handleGetDiscountCode}
                style={{ cursor: "pointer" }}
              >
                <RefreshIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleCheckout} disabled={loading}>
          Pay
        </Button>
      </Grid>
      <Error message={error} severity="error" />
    </Grid>
  );
}

export default AllProducts;
