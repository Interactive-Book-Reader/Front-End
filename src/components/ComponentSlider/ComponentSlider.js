import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, EffectCoverflow, Scrollbar, A11y } from 'swiper/modules';

const ComponentSlider = ({ components, ...otherProps }) => {
  return (
    <div style={{ marginTop: 30 }} {...otherProps}>
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation, A11y, Scrollbar]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 10,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
      >
        {components.map((item, index) => (
          <SwiperSlide key={index} style={{ width: '100%', height: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid black',
              }}
            >
              {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ComponentSlider;
