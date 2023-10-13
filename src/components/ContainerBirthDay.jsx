import React from 'react';
import { Avatar, Button, Tooltip, Form, Input, Image, Alert } from 'antd';
import { useContext, useState, useRef, useEffect } from 'react';
import addDocument from '../services';
import TextArea from 'antd/es/input/TextArea';
// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import anh1 from '../img/anh/anh1.jpg'
import anh2 from '../img/anh/anh2.png'
import anh3 from '../img/anh/anh3.jpg'
import anh4 from '../img/anh/anh4.jpg'
import anh5 from '../img/anh/anh5.jpg'
import anh6 from '../img/anh/anh6.jpg'
import hoa from '../img/anh/hoa.png'

const ContainerBirthday = () => {

    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm();
    const inputRef = useRef(null);

    console.log(inputValue)

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleOnSubmit = () => {
        addDocument('birth', {
            text: inputValue,
        });
        form.resetFields(['birth']);
        Alert('Gửi thành công');

    };

    return (
        <div className='containerBirthDay'>
            <img src={hoa} alt="" className='hoa-birth'/>
            <h2><i>Happy Birth Day To Bạn Hiền</i></h2>
            <div className='Container-birthday'>
                <div className="content-text-bd">
                    <div className='TamThu'>
                        <h2><i>This Is 'Tâm Thư' Bạn Bảo Gửi Bạn Hiền🤩</i></h2>
                        <p>Không có gì đặc biệt trong bức tâm thư này!</p>
                        <p>Hiện tại mình đang ở 1 cương vị mới😎</p>
                        <p>Thực sự là một bước tiến nhảy vọt so với 1 năm trước🤗</p>
                        <p>Nên vẫn như thường lệ để khẳng định vị thế bản thân với bạn Hiền</p>
                        <p>Để bạn nhớ rằng bạn vẫn có một chiến thần IT đứng sau bạn</p>
                        <p>"Bạn còn đứa nào nữa hay không thì kệ"🤧</p>
                        <p>Đã là chiến thần thì phải khác bọt🙄, nên...chúc mừng sinh nhật cũng phải khác bọt</p>
                        <p>Với bạn thì nó không lạ lẫm, nhưng không phải ai cũng được cmsn theo cách này</p>
                        <p>Nên đề nghị bạn biết nâng's niu và quý trọng mềnh hơn😋</p>
                        <p>Một lần nữa</p>
                        <p>Xin kính Trọng Chúc Bạn Hiền Tuổi Mới Xinh Gái Học Giỏi🎉✨✨</p>
                        <p>Tuổi mới ra trường kiếm được công việc ổn định lương vài nghìn $ 🎈🎁</p>
                        <p>Để bao mình đi ăn chơi😋</p>
                        <p>Chúc bạn một ngày sinh nhựt vui's vẽ ✨🎉🎁🎂</p>
                        <p>Hẹn gặp bạn vào mùa HOA ĐÀO NỞ 🍖🍻🥂</p>
                    </div>
                    <Form id='message-birthday' form={form}>
                        <p><i>Nơi viết lời chăng chối với coder sắp thất nghiệp (nếu có)</i></p>
                        <div className='NoiDeFlex'>
                            <Form.Item className='input-birthday' name='message'>
                                <TextArea
                                    className='input-message-birthday'
                                    ref={inputRef}
                                    onChange={handleInputChange}
                                    // onPressEnter={handleOnSubmit}
                                    placeholder='Nhập tin nhắn...'
                                    autoComplete='off'
                                />
                            </Form.Item>
                            <Button className='button-birthday' type='primary' onClick={handleOnSubmit}>
                                Gửi
                            </Button>
                        </div>

                    </Form>
                </div>
                <div className="content-video-bd">
                    <div className='video-birth'>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/WJq6k-qE4JY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                    <div className='image-birth'>
                        <Swiper
                            // install Swiper modules
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={50}
                            slidesPerView={3}
                            navigation
                            // pagination={{ clickable: true }}
                            // scrollbar={{ draggable: true }}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >
                            <SwiperSlide><Image src={anh1}/></SwiperSlide>
                            <SwiperSlide><Image src={anh2}/></SwiperSlide>
                            <SwiperSlide><Image src={anh3}/></SwiperSlide>
                            <SwiperSlide><Image src={anh4}/></SwiperSlide>
                            <SwiperSlide><Image src={anh5}/></SwiperSlide>
                            <SwiperSlide><Image src={anh6}/></SwiperSlide>
                        </Swiper>
                        <h3><i>Top Album Ảnh Bạn Hiền</i></h3>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ContainerBirthday