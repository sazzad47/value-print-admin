import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Manage({ params }) {
  return (
    <>
      <strong>
        <Link to={`/orders/${params.row.id}`}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
          >
            View
          </Button>
        </Link>
      </strong>
    </>
  );
}
