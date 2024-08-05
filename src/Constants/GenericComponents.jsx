import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

export const ConfirmDialog = (props) => {
  // const [open, setOpen] = useState(false);
  const {
    onAction,
    headerText,
    bodyText,
    cancelBtnText = "Cancel",
    actionBtnText = "Confirm",
    open,
    setOpen
  } = props;

  return (
    <Dialog open={open} maxWidth="sm" onClose={() => setOpen(false)} fullWidth>
      {headerText && <DialogTitle>{headerText}</DialogTitle>}
      <DialogContent>{bodyText}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>{cancelBtnText}</Button>
        {onAction && <Button onClick={onAction}>{actionBtnText}</Button>}
      </DialogActions>
    </Dialog>
  );
};
