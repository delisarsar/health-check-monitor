import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    height: 150,
  },
  content: {
    color: theme.palette.primary.main,
  },
  cardActions: {
    paddingLeft: theme.spacing(37.5),
    paddingTop: 0,
    marginBottom: theme.spacing(3),
  },
  cardContent: {
    paddingTop: theme.spacing(2),
    paddingBottom: 0,
  },
}));

export default useStyles;
