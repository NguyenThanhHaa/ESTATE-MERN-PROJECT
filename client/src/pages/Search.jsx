import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate  = useNavigate();

    const [sidebardata, setSideBarData] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc'
    });

    const [loading, setLoading] = useState(false);
    
    const [listing, setListing] = useState([]);

    // console.log(sidebardata);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);

        const searchTermFromUrl = urlParams.get('searchTerm');

        const typeFromUrl = urlParams.get('type');

        const parkingFromUrl = urlParams.get('parking');

        const furnishedFromUrl = urlParams.get('furnished');

        const offerFromUrl = urlParams.get('offer');

        const sortFromUrl = urlParams.get('sort');

        const orderFromUrl = urlParams.get('order');

        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
            
        ) {
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc' 
            });
        }

        console.log(listing);
        const fetchListing = async()=>{
            setLoading(true);

            const searchQuery = urlParams.toString();

            const res = await fetch (`/api/listing/get?${searchQuery}`);

            const data = await res.json();

            setListing(data);
            setLoading(false);

        }

        fetchListing();
    },[location.search]);

    const handleChange = (e) =>{
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id==='sale'){
            setSideBarData({...sidebardata,type:e.target.id});
        }

        if(e.target.id === 'searchTerm'){
            setSideBarData({...sidebardata,searchTerm:e.target.value});
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideBarData({...sidebardata,[e.target.id]:e.target.checked || e.target.checked ==='true' ? true : false});
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSideBarData({...sidebardata, sort, order});
        }
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);

        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);

    }


  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:min-w-96">
            <form 
                className="flex flex-col gap-8"
                onSubmit={handleSubmit}>
                <div className="flex items-center gap-3">
                    <label className="whitespace-nowrap font-semibold">Tìm kiếm: </label>
                    <input
                        type="text"
                        id="searchTerm"
                        placeholder='Nhập tại đây...'
                        className="border rounded-lg p-3 w-full"
                        value={sidebardata.searchTerm}
                        onChange={handleChange}
                        />
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex gap-3">
                        <label className="whitespace-nowrap font-semibold">Lọc:</label>
                        <div className="flex  gap-3 flex-wrap">
                            <input 
                                type="checkbox" 
                                id="all"
                                className="w-5"
                                checked={sidebardata.type==='all'}
                                onChange={handleChange}/>
                            <span>Thuê & Bán</span>
                            <input 
                                type="checkbox" 
                                id="rent"
                                className="w-5"
                                checked={sidebardata.type==='rent'}
                                onChange={handleChange}/>
                            <span>Thuê</span>
                            <input 
                                type="checkbox" 
                                id="sale"
                                className="w-5"
                                checked={sidebardata.type==='sale'}
                                onChange={handleChange}/>
                            <span>Bán</span>
                            <input 
                                type="checkbox" 
                                id="offer"
                                className="w-5"
                                checked={sidebardata.offer}
                                onChange={handleChange}/>
                            <span>Ưu đãi</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <label className="whitespace-nowrap font-semibold">Tiện nghi: </label>
                        <div className="flex  gap-3 flex-wrap">
                            <input 
                                type="checkbox" 
                                id="furnished"
                                className="w-5"
                                checked={sidebardata.furnished}
                                onChange={handleChange}/>
                            <span>Nội thất</span>
                            <input 
                                type="checkbox" 
                                id="parking"
                                className="w-5"
                                checked={sidebardata.parking}
                                onChange={handleChange}/>
                            <span>Bãi đỗ xe</span>
                        </div>
                    </div>
                </div>

                <div className="flex  gap-5  flex-wrap ">
                    <div className="flex items-center gap-3">
                        <label className="whitespace-nowrap font-semibold">Giá: </label>
                        <select 
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id="sort_order"
                            className="p-2 rounded-lg">
                            <option value="regularPrice_desc">Giảm dần</option>
                            <option value="regularPrice_asc">Tăng dần</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="whitespace-nowrap font-semibold">Hiển thị: </label>
                        <select 
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id="sort_order"
                            className="p-2 rounded-lg">
                            <option value="createdAt_desc">Mới nhất</option>
                            <option value="createdAt_asc">Cũ nhất</option>
                        </select>
                    </div>
                   
                </div>
                <button 
                    className="bg-slate-700 text-white rounded-lg p-3 cursor-pointer uppercase hover:opacity-90">Tìm kiếm</button>  
            </form>
      </div>

      <div className="flex flex-col">
            <h1 className="font-semibold text-3xl border-b p-3 text-slate-700 m-5">Kết quả: </h1>
            <div className="p-7 flex gap-8 flex-wrap">
                {!loading && listing.length === 0 && (
                    <p className="text-xl text-center text-slate-700">Không có kết quả cần tìm!</p>
                )}

                {loading &&(
                    <p className="text-xl text-center text-slate-700 w-full">Đang tải...</p>
                )}

            {!loading &&
            listing &&
            listing.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
            </div>
      </div>
    </div>
  )
}
