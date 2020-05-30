import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const DevTable = props => {
  const { className, items, devTitle, devId, ...rest } = props;

  const classes = useStyles();
  const history = useHistory();

  function cellClickCb(url) {
    history.push(`/markdown?url=${encodeURIComponent(url)}&devId=${devId}&devTitle=${devTitle}`);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sizesmall="true" size="small">Number</TableCell>
                  <TableCell>Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={item.fileUrl}
                    onClick={() => cellClickCb(item.fileUrl)}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <span className="table-count">{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

DevTable.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default DevTable;
