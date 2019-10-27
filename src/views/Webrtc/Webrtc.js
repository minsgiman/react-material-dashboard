import React from 'react';
import TableView from './../../layouts/TableView';
import { webrtc } from './../../markdown/map';

const Webrtc = () => {
  return (
    <TableView title="WebRTC" items={webrtc}></TableView>
  );
};

export default Webrtc;
