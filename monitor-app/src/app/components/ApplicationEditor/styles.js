import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #808080",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  actionButton: {
    textTransform: "none",
  },
  actionButtonsGrid: {
    paddingTop: theme.spacing(3),
  },
}));

export default useStyles;
