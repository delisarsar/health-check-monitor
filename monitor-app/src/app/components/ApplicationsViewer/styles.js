import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  createButton: {
    textTransform: "none",
  },
  resultsTitle: {
    paddingTop: theme.spacing(2),
  },
  appsGrid: {
    paddingTop: theme.spacing(2),
  },
}));

export default useStyles;
