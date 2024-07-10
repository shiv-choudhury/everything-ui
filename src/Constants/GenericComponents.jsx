import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

export const ConfirmDialog = (props) => {
  // const [open, setOpen] = useState(false);
  const { onAction, headerText, bodyText, actionBtnText, open, setOpen } =
    props;

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{headerText}</DialogTitle>
      <DialogContent>{bodyText}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={onAction}>{actionBtnText}</Button>
      </DialogActions>
    </Dialog>
  );
};
