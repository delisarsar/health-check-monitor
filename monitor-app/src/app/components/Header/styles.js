import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    //backgroundColor: theme.palette.primary.main,
    backgroundColor: "#f8f9fa",
  },
  logo: {
    width: theme.spacing(18.75),
    height: theme.spacing(6),
  },
}));

export default useStyles;
