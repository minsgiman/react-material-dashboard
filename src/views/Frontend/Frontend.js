import React from 'react';
import TableView from './../../layouts/TableView';
import { frontend } from './../../markdown/map';

const Frontend = () => {
  return (
    <TableView title="Frontend" items={frontend}></TableView>
  );
};

export default Frontend;
