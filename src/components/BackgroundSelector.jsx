import React, {useState} from 'react';

function BackgroundSelector(props) {
  const backgrounds = [
    { url: 'https://anhdepfree.com/wp-content/uploads/2018/10/Wallpaper-4K-dep-11.jpg' },
    { url: 'https://thptcandang.edu.vn/wp-content/uploads/2023/03/anh-nen-phong-canh-4k-dep-1920x1080.jpg' },
    { url: './img/home-background-img.png' },
  ];

  const handleBackgroundChange = (newBackground) => {
    if (props.onBackgroundChange) {
      props.onBackgroundChange(newBackground);
    }
  };

  return (
    <div className="background-selector">
      <h3 className='bg-select'>Thay đổi hình nền</h3>
      <div className="background-list">
        {backgrounds.map(bg => (
          <div
            key={bg.id}
            className="background-item"
            style={{ backgroundImage: `url(${bg.url})` }}
            onClick={() => handleBackgroundChange(bg.url)}
          >
          </div>
        ))}
      </div>
    </div>
  );
}

export default BackgroundSelector;

