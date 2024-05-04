import React, { useState } from 'react'
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js'
import { app } from '../firebase';



const CreateListing = () => {
    const [files,setFiles] = useState([])
    const [uploading, setUploading] = useState(false);
    


    const [formData,setFormData] = useState({
        imageUrls: [],

    })

    const [imageUploadError,setImageUploadError] = useState(false);
    // console.log(formData)

    const handleImageSubmit = (e) =>{
        if(files.length > 0 && files.length + formData.imageUrls.length <7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for(let i =0; i<files.length; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)});

                setImageUploadError(false);
                setUploading(false);
         
            }).catch((err)=>{
                setImageUploadError('Tải ảnh thất bại! (chỉ cho phép kích thước mỗi ảnh tối đa: 2mb)');
                setUploading(false);
            })
            
        }
        else if(files.length<=0){
            setImageUploadError('Vui lòng tải ít nhất 1 ảnh!');
            setUploading(false);
        }
        else{
            setImageUploadError('Vui lòng chỉ tải tối đa 6 ảnh cho một lần tạo danh sách!');
            setUploading(false);
        }

    }

    const storeImage = async(file) =>{
        return new Promise((resolve,reject)=>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask =uploadBytesResumable(storageRef,file);
            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Đang tải ${progress}%`)
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL);
                    })
                }
            )

        }) 
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls:formData.imageUrls.filter((_,i)=> i !== index)
        })
    }

   
  return (
    <main className="p-3 max-w-4xl mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7">TẠO DANH SÁCH</h1> 

    <form className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-4 flex-1">
            <input type="text" placeholder="Tên" 
            id="name"
            maxLength='62'
            minLength='10'
            required
            className="border p-3 rounded-lg"/>

            <input type="text" placeholder="Mô tả" 
            id="description"
            required
            className="border p-3 rounded-lg py-8"/>

            <input type="text" placeholder="Địa chỉ" 
            id="address"
            required
            className="border p-3 rounded-lg"/>
            
            <div className="flex gap-10 flex-wrap my-8">
                <div className="flex gap-2">
                    <input type="checkbox"
                    id="sell"
                    className="w-5"/>
                    <span>Bán</span>
                </div>

                <div className="flex gap-2">
                <input type="checkbox"
                id="rent"
                className="w-5"/>
                <span>Cho Thuê</span>
                </div>

                <div className="flex gap-2">
                <input type="checkbox"
                id="parking"
                className="w-5"/>
                <span>Có bãi đậu xe</span>
                </div>

                <div className="flex gap-2">
                <input type="checkbox"
                id="furnished"
                className="w-5"/>
                <span>Đã có nội thất</span>
                </div>

                <div className="flex gap-2">
                <input type="checkbox"
                id="offer"
                className="w-5"/>
                <span>Giá ưu đãi</span>
                </div>
            </div>

            <div className="flex gap-8 mb-5 flex-wrap">
                <div className="flex gap-3 items-center">
                    <input type="number" id="bedroom" 
                    min="1" 
                    max="10" required
                    className="border-gray-300 p-3 rounded-lg"/>
                    <span>Phòng ngủ</span>
                </div>

                <div className="flex gap-3 items-center ">
                    <input type="number" id="bathroom" 
                    min="1" 
                    max="10" required
                    className="border-gray-300 p-3 rounded-lg"/>
                    <span>Nhà vệ sinh</span>
                </div>

                <div className="flex gap-2 items-center ">
                    <input type="number" id="regular-price" 
                    min="1" 
                    max="10" required
                    className="border-gray-300 p-3 px-7 rounded-lg"/>
                    <div className="flex flex-col">
                        <span>Giá </span>
                        <span className="text-sm">( VND / tháng )</span>
                    </div>
                    
                </div>

                <div className="flex gap-3 items-center ">
                    <input type="number" id="discounted-price" 
                    min="1" 
                    max="10" required
                    className="border-gray-300 p-3 px-7 rounded-lg"/>
                    <div className="flex flex-col">
                        <span>Giá đã giảm</span>
                        <span className="text-sm">( VND / tháng )</span>
                    </div>
                    
                </div>
            </div>

            
        </div>

        <div className="flex flex-col flex-1">
            <p className="font-semibold">Hình ảnh liên quan: 
                <span className="font-normal text-gray-600 "> Ảnh đầu tiên được chọn sẽ là ảnh bìa (tối đa: 6 ảnh)</span>
            </p>
            <div className="my-5 flex gap-5 items-center " >
                <input
                onChange={(e)=>setFiles(e.target.files)} 
                type="file" 
                id="images" 
                accept="image/*"
                multiple
                className=" border border-dashed border-gray-500 p-3 rounded-md w-full
                bg-slate-300"/>
                <button
                type='button'
                disabled={uploading} 
                onClick={handleImageSubmit}
                className="py-4 px-10 text-white
                bg-slate-700 borrder borrder-green-700 rounded-md uppercase hover:bg-slate-500 dissabled:opacity-80
                font-semibold
                 ">{uploading ? "😴" : 'Tải'}</button>
            </div>
            
            {imageUploadError &&(
                <p className="bg-red-100 rounded-md text-red-700 text-center py-2 px-2 mb-5">{imageUploadError}</p>
            )}

            {
                formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>
                    (
                    <div
                    key={url} 
                    className="flex justify-between p-3 border rounded-md items-center  my-2 bg-slate-50">
                        <img 
                        src={url} 
                        alt="Hình ảnh liên quan" 
                        className="w-32 h-32 my-5 object-cover rounded-md"/>

                        <button
                        type="button"
                        onClick={()=>handleRemoveImage(index)}
                        className="text-red-700 p-3 font-semibold hover:opacity-75">
                            Xóa
                        </button>
                    </div>
                        
                )
                )
            }

            <button 
            className="p-3 text-white
            bg-cyan-900 borrder borrder-green-700 rounded-md uppercase hover:bg-slate-800 dissabled:opacity-80
            font-semibold mt-3">Tạo danh sách</button>

            
        </div>
       
    </form> 

        
    </main>
    
  )
}

export default CreateListing
