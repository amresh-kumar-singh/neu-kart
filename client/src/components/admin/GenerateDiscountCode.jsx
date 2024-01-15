import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Button, Grid } from "@mui/material";

function GenerateDiscountCode({ setError }) {
  const { auth } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState();

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      setLoading(true);
      const res = await fetch("api/admin/generateDiscountCode", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.user.id}`,
        },
      });
      const data = await res.json();
      if (data.data?.id) setCode(data.data?.id);
      if (data.error) setError(data.error);
    } catch (e) {
      console.log(e);
      // setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid>{code}</Grid>
      <Grid>
        <Button onClick={handleCheckout} disabled={loading}>
          Generate Discount Code
        </Button>
      </Grid>
    </Grid>
  );
}

export default GenerateDiscountCode;
