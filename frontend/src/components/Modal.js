import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        color={"inherit"}
        onClick={handleOpen}
        className="information-button"
        style={{
          position: "absolute",
          right: "10px",
          fontSize: "calc(20px + 2vmin)",
        }}
      >
        &#x1F6C8; rules
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Rules
          </Typography>

          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Ξ Vote for the choice you think will have the minority votes with
            0.1 ETH per vote
            <br />
            <br />Ξ The total pool will be split among the voters who chose the
            minority choice
            <br />
            <br />Ξ The game is renewed weekly
            <br />
            <br />Ξ Game Master's commission of only 5%
            <br />
            <br />Ξ Rinkeby ETH used, currency is not worth any value
          </Typography>
          <Button onClick={handleClose}> Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
