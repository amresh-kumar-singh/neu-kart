import { Alert } from "@mui/material";

function Info({ message, severity }) {
  return message ? (
    <Alert
      severity={severity}
      sx={{
        width: "80%",
        margin: "auto",
        bottom: 0,
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      {message}
    </Alert>
  ) : (
    ""
  );
}
export default Info;
