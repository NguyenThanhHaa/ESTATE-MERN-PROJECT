import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper"
import {Navigation, Pagination} from "swiper/modules"
import "swiper/css/bundle"
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';
import { API_URL } from '../config';

export default function Listing() {
    SwiperCore.use([Navigation, Pagination]);
    const params = useParams();

    const [listing, setListing] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const [copied, setCopied] = useState(false);
    
    const [contact, setContact] = useState(false);
    
    const { currentUser } = useSelector((state) => state.user);

    useEffect(()=>{
        const fetchListing = async()=>{
            try{
                setLoading(true);
                const res = await fetch(`${API_URL}/api/listing/get/${params.listingId}`)

                const data = await res.json();

                if(data.success === false){
                    setError(true);
                    setLoading(false);
                    return;
                }

                setListing(data);
                setLoading(false);
                setError(false);
            }catch(error){
                setError(true);
                setLoading(false);
            }
            
        }

        fetchListing();
    },[params.listingId])

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Đang tải...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Có lỗi xảy ra. Vui lòng thử lại!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation pagination={{ clickable: true }}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Đã copy link!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 gap-8'>
            <p className='text-2xl mt-5 font-semibold uppercase'>
              {listing.name} 
            </p>
            <p className='text-xl font-semibold uppercase'>
            {listing.offer
                ? listing.discountPrice.toLocaleString('vi-VN')
                : listing.regularPrice.toLocaleString('vi-VN')}
              {listing.type === 'rent' && ' VND / tháng'}
            </p>
            <p className='flex items-center gap-2 text-slate-600 '>
              <FaMapMarkerAlt className='text-green-700' />
              <p className="font-semibold text-black">Địa chỉ: </p>
              {listing.address}
            </p>
            <div className='flex items-center gap-4'>
              
              {listing.type === 'rent' ? (
                <p className='bg-red-900 cursor-pointer max-w-[200px] text-white text-center p-2 rounded-md'>Cho thuê</p>
              ) : (
                <p className='bg-red-900 cursor-pointer w-36 text-white text-center p-2 rounded-md'>Bán</p>
              )}
              
              {listing.offer && (
                <p className='bg-green-900  max-w-[300px] text-white text-center w-full p-2 rounded-md '>
                    ↓ 
                 {(+listing.regularPrice - +listing.discountPrice).toLocaleString('vi-VN')} VND trên giá gốc
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Mô tả: </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold  flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {`${listing.bedrooms} phòng ngủ `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {`${listing.bathrooms} phòng vệ sinh`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Bãi đỗ xe' : 'Không có bãi đỗ xe'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Có nội thất' : 'Không có nội thất'}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
              onClick={()=>{setContact(true)}}
              className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 p-3 font-semibold">Liên hệ chi tiết tại đây </button>
            )}
            {contact && (
              <Contact listing={listing}/>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
