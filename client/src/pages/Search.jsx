import React from 'react'

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                    <label className="whitespace-nowrap font-semibold">Tìm kiếm: </label>
                    <input
                        type="text"
                        id="searchTerm"
                        placeholder='Nhập tại đây...'
                        className="border rounded-lg p-3 w-full"
                        />
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex gap-3">
                        <label className="whitespace-nowrap font-semibold">Lọc:</label>
                        <div className="flex  gap-3 flex-wrap">
                            <input 
                                type="checkbox" 
                                id="all"
                                className="w-5"/>
                            <span>Thuê & Bán</span>
                            <input 
                                type="checkbox" 
                                id="rent"
                                className="w-5"/>
                            <span>Thuê</span>
                            <input 
                                type="checkbox" 
                                id="sale"
                                className="w-5"/>
                            <span>Bán</span>
                            <input 
                                type="checkbox" 
                                id="offer"
                                className="w-5"/>
                            <span>Ưu đãi</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <label className="whitespace-nowrap font-semibold">Tiện nghi: </label>
                        <div className="flex  gap-3 flex-wrap">
                            <input 
                                type="checkbox" 
                                id="furnished"
                                className="w-5"/>
                            <span>Nội thất</span>
                            <input 
                                type="checkbox" 
                                id="parking"
                                className="w-5"/>
                            <span>Bãi đỗ xe</span>
                        </div>
                    </div>
                </div>

                <div className="flex  gap-5  flex-wrap ">
                    <div className="flex items-center gap-3">
                        <label className="whitespace-nowrap font-semibold">Giá: </label>
                        <select 
                            id="sort_order"
                            className="p-2 rounded-lg">
                            <option>Giảm dần</option>
                            <option>Tăng dần</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="whitespace-nowrap font-semibold">Hiển thị: </label>
                        <select 
                            id="sort_order"
                            className="p-2 rounded-lg">
                            <option>Mới nhất</option>
                            <option>Cũ nhất</option>
                        </select>
                    </div>
                   
                </div>
                <button 
                    className="bg-slate-700 text-white rounded-lg p-3 cursor-pointer uppercase hover:opacity-90">Tìm kiếm</button>  
            </form>
      </div>

      <div className="">
            <h1 className="font-semibold text-3xl border-b p-3 text-slate-700 m-5">Kết quả: </h1>
      </div>
    </div>
  )
}
