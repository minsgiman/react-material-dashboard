import React from 'react';
import TableView from './../../layouts/TableView';
import { getUrlParams } from './../../common/util';
import map from './../../markdown/map';

const MarkdownList = () => {
  const urlParams = getUrlParams(window.location.href),
        mapId = urlParams.id,
        title = urlParams.title;

  return (
    <TableView title={title} id={mapId} items={map[mapId]}></TableView>
  );
};

export default MarkdownList;
