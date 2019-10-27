import React from 'react';
import TableView from './../../layouts/TableView';
import { backend } from './../../markdown/map';

const Backend = () => {
  return (
    <TableView title="Backend" items={backend}></TableView>
  );
};

export default Backend;
