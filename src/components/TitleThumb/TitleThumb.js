import React from 'react';

const TitleThumb = props => {
  const { id, thumbClickCb, imgUrl, title, description, startDate } = props;

  return (
    <div className="title_thumb" onClick={() => thumbClickCb(id)}>
      <div className="img_box">
        <img src={imgUrl}></img>
        <div className="inner_info">
          <span className="date_info">{startDate}</span>
          <span className="tit_info">{title}</span>
        </div>
      </div>
      <div className="desc_wrap">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TitleThumb;
