import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore from "swiper"
import {Navigation, Pagination} from "swiper/modules"
import "swiper/css/bundle"
import ListingItem from '../components/ListingItem';

const Home = () => {
  
  const [offerListing, setOfferListing] = useState([]);

  const [saleListing, setSaleListing] = useState([]);

  const [rentListing, setRentListing] = useState([]);

  SwiperCore.use([Navigation, Pagination]);

  useEffect(()=>{
    const fetchOfferListing = async () =>{
      try{
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);

        const data = await res.json();

        setOfferListing(data);

        fetchRentListing();
      }catch(err){
        console.log(err);
      }
    }

    

    const fetchSaleListing = async () =>{
      try{
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);

        const data = await res.json();

        setSaleListing(data);
      }catch(err){
        console.log(err);
      }
    }

    const fetchRentListing = async() =>{
      try{
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);

        const data = await res.json();

        setRentListing(data);
        fetchSaleListing();
      }catch(err){
        console.log(err);
      }
    }

    fetchOfferListing();
    

  },[]);

console.log(offerListing);

  return (
    <div>
      {/* Top */}
      <div className="flex flex-col gap-8 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-500 font-bold text-3xl lg:text-6xl flex flex-col gap-5  ">
          <span className="text-slate-700 ">Ngôi nhà mơ ước,</span>  
          <span>hiện thực trong tầm tay</span>
          
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm ">
        Với Hee Estate, bạn dễ dàng tìm được ngôi nhà mơ ước, phù hợp với nhu cầu và ngân sách của mình.
        </div>

        <Link
          to={'/search'}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline "
        >Sở hữu ngay bây giờ →  </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation pagination={{ clickable: true }}>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      

      {/* Listing results for offer, sale and rent  */}
      <div className='max-w-7xl mx-auto p-3 flex flex-col gap-10 my-10'>
        {offerListing && offerListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Giá ưu đãi</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Xem thêm những ưu đãi khác</Link>
            </div>
            <div className='flex gap-12 flex-wrap '>
              {offerListing.map((listing) => (
                <ListingItem listing={listing} size={385} key={listing._id}  />
              ))}
            </div>
          </div>
        )}
        {rentListing && rentListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Cho Thuê</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Xem thêm danh mục cho thuê khác</Link>
            </div>
            <div className='flex flex-wrap gap-12'>
              {rentListing.map((listing) => (
                <ListingItem listing={listing} size={385} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListing && saleListing.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Bán</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Xem thêm danh mục bán khác</Link>
            </div>
            <div className='flex flex-wrap gap-12'>
              {saleListing.map((listing) => (
                <ListingItem listing={listing} size={385} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
