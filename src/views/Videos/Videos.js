import React from 'react';
import TitleThumb from '../../components/TitleThumb';
import dataMap from './map';
import { useHistory } from 'react-router-dom';

const MarkdownList = () => {
  const history = useHistory();

  function thumbClickCb(id) {
    history.push('/videoviewer?id=' + id);
  }

  return (
    <div className="photolist_cont">
      <div className="photolist_wrap">
        {dataMap.map((item) => (
          <TitleThumb id={item.id}
            key={item.id}
            thumbClickCb={thumbClickCb}
            imgUrl={item.titleImgUrl}
            title={item.title}
            description={item.description}
            startDate={item.startDate}/>
        ))}
      </div>
    </div>
  );
};

export default MarkdownList;
