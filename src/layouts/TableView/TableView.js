import React from 'react';
import { useHistory } from 'react-router-dom';
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
  const { title, id, items } = props;
  const history = useHistory();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2 className={'dev-title'}>
        <span className="upper_dir" onClick={() => {history.push('/develop')}}>Develop</span>
        <span className="triangle-right"></span>
        <span>{title}</span>
      </h2>
      <div className={classes.content}>
        <DevTable items={items} devTitle={title} devId={id}/>
      </div>
    </div>
  );
};

export default TableView;
