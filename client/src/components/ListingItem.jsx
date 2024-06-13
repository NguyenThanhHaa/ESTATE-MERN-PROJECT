import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';

import { FaMoneyBill1Wave } from "react-icons/fa6";


export default function ListingItem({listing}) {
  return (
    <div className='group relative border shadow-md hover:border-2 h-[490px] overflow-hidden rounded-lg  bg-white sm:w-[300px] transition-all'>
    <Link to={`/listing/${listing._id}`}>
      <img
        src={listing.imageUrls}
        alt='listing cover'
        className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
      />
    </Link>
    <div className='p-3 flex flex-col gap-4'>
      <p className='text-lg font-semibold uppercase truncate'>{listing.name}</p>
      <div className="flex gap-3 items-center">
        <FaMapMarkerAlt className="text-slate-500"/>
        <span className='italic text-sm'>{listing.address}</span>
      </div>
      
      <span className='italic text-sm line-clamp-2'>{listing.description}</span>
      <div className="flex gap-3 items-center font-semibold text-lg">
        <FaMoneyBill1Wave className="text-slate-500"/>
            {listing.offer ? (listing.discountPrice).toLocaleString('vi-VN') : (listing.regularPrice.toLocaleString('vi-VN') )}

            {listing.type === 'rent' && ' VND / tháng'}
      </div>

      <div className="flex gap-4 items-center font-semibold text-sm"> 
                    <div className="flex gap-2 items-center">
                        <FaBath/>
                        <p>{listing.bathrooms} phòng vệ sinh</p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <FaBath/>
                        <p>{listing.bedrooms} phòng ngủ</p>
                    </div>
                </div>
      <Link
        to={`/listing/${listing._id}`}
        className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border bg-slate-700  text-white hover:opacity-90  transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
      >
        Xem chi tiết
      </Link>
    </div>
  </div>
  )
}
