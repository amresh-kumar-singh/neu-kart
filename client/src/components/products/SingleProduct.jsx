import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useGetData from "../../hooks/useGetData";
import useAuth from "../../hooks/useAuth";
import Box from "@mui/material/Box";

export default React.forwardRef(function SingleProduct({ data }, ref) {
  const { brand, title, description, price, thumbnail, id } = data;
  const { setData, data: d } = useGetData();
  const { auth, setAuth } = useAuth();
  const [quantity, setQuatity] = React.useState(
    d.orders?.cart?.items?.find((item) => item.productId == id)?.quantity || 0
  );

  React.useEffect(() => {
    addToCart();
  }, [quantity]);

  async function addToCart() {
    const res = await fetch("api/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId: id, quantity, userId: auth.user.id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${auth.user.id}`,
      },
    });
    const data = await res.json();
    if (data.message) {
      setData((prev) => ({ ...prev, orders: data }));
    }
    if (data.error) {
      setAuth({});
      setData({});
    }
  }

  return (
    <Card sx={{ width: 280 }} ref={ref}>
      <CardMedia sx={{ height: 120 }} image={thumbnail} title={title} />
      <CardContent sx={{ height: 80 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontSize: "1.2rem" }}
        >
          {title}
        </Typography>
        <Typography gutterBottom component="div">
          Price: ₹{price}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small" onClick={() => setQuatity(quantity ? 0 : 1)}>
          {quantity ? "Remove" : "Add to cart"}
        </Button>
        {!!quantity && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              size="small"
              onClick={() => setQuatity((prev) => (prev ? prev - 1 : 0))}
            >
              -
            </Button>
            <Typography>{quantity}</Typography>
            <Button size="small" onClick={() => setQuatity((prev) => prev + 1)}>
              +
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
});
