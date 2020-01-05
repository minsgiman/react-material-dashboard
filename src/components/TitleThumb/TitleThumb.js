import React from 'react';
import { useHistory } from 'react-router-dom';

const TitleThumb = props => {
  const { id, imgUrl, title, description, startDate, ...rest } = props;

  const history = useHistory();

  function thumbClickCb(id) {
    history.push('/photoviewer?id=' + id);
  }

  return (
    <div className="title_thumb"
         onClick={() => thumbClickCb(id)}>
      <div className="img_box">
        <img src={imgUrl}></img>
      </div>
      <div className="inner_info">
        <span className="date_info">{startDate}</span>
        <span className="tit_info">{title}</span>
      </div>
      <div className="desc_wrap">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default TitleThumb;
