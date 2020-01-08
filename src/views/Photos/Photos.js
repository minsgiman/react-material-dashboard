import React from 'react';
import TitleThumb from '../../components/TitleThumb';
import dataMap from './map';

const MarkdownList = () => {
  return (
    <div className="photolist_cont">
      <div className="photolist_wrap">
        {dataMap.map((item) => (
          <TitleThumb id={item.id}
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
