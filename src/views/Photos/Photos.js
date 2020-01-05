import React from 'react';
import TitleThumb from '../../components/TitleThumb';

const MarkdownList = () => {
  const items = [
    {
      id: '1',
      imgUrl: '/images/my.jpg',
      title: 'My',
      description: 'My Photo',
      startDate: '2019-01-02'
    },
    {
      id: '1',
      imgUrl: '/images/my.jpg',
      title: 'My',
      description: 'My Photo',
      startDate: '2019-01-02'
    },
    {
      id: '1',
      imgUrl: '/images/my.jpg',
      title: 'My',
      description: 'My Photo',
      startDate: '2019-01-02'
    },
    {
      id: '1',
      imgUrl: '/images/my.jpg',
      title: 'My',
      description: 'My Photo',
      startDate: '2019-01-02'
    }
  ];

  return (
    <div className="photolist_cont">
      <div className="photolist_wrap">
        {items.map((item, index) => (
          <TitleThumb id={item.id}
                      imgUrl={item.imgUrl}
                      title={item.title}
                      description={item.description}
                      startDate={item.startDate}/>
        ))}
      </div>
    </div>
  );
};

export default MarkdownList;
