import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState();
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirecting to respective pages if user already logged in
  useEffect(() => {
    if (auth.user?.isAdmin) {
      navigate("/details");
    } else if (auth.user?.id) {
      navigate("/products");
    }
  }, []);

  const handleUsernameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("api/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      if (data.message) {
        setAuth({ user: data.data });
        const from = data.data.isAdmin ? "/admin/details" : "/products";
        navigate(from, { replace: true });
      }
      if (data.error) throw new Error(data.error.message);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "18rem",
        width: "15rem",
        justifyContent: "space-between",
        margin: "auto",
        marginTop: "8rem",
      }}
    >
      <Typography gutterBottom textAlign="center">
        {" "}
        Signup
      </Typography>
      <TextField
        type="text"
        label="User Name"
        onChange={handleUsernameChange}
      />
      <TextField
        type="password"
        label="password"
        onChange={handlePasswordChange}
      />
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      <Button onClick={handleSignup} disabled={loading}>
        Signup
      </Button>
      <Typography>
        Already have an account? <Link to="/login">Login</Link>{" "}
      </Typography>
    </Box>
  );
};

export default Signup;
