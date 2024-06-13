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
    <div className="group border shadow-md hover:border-2 h-[500px] overflow-hidden rounded-lg sm:w-[450px] transition-all ">
        <Link
            to={`/listing/${listing._id}`}
        >
           <img 
            src={listing.imageUrls[0] }
            alt="Ảnh bìa ngôi nhà"
            className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"/>

            <div className="p-3 flex flex-col gap-4 w-full">
                <p className="truncate uppercase font-semibold">{listing.name}</p>
                <div className="flex gap-3 items-center">
                    <FaMapMarkerAlt className="text-slate-500"/>
                    <p className="line-clamp-2">{listing.address}</p>
                </div>

                <div className="line-clamp-2 ">
                    {listing.description}
                </div>

                <div className="text-lg font-semibold flex gap-3 items-center ">
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

            </div>
            </Link>
        
    </div>
  )
}
