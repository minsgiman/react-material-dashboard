import React from 'react';
import DevTable from './../../components/DevTable';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TableView = props => {
  const { title, items } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 className={"dev-title"}>{title}</h2>
      <div className={classes.content}>
        <DevTable items={items} />
      </div>
    </div>
  );
};

export default TableView;
