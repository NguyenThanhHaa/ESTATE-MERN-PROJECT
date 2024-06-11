import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {

    const [landlord, setLandlord] = useState(null);

    const [message, setMessage] = useState('');

    useEffect(()=>{
        const fetchLandlord = async()=>{
            try{
                const res = await fetch (`/api/user/${listing.userRef}`)

                const data = await res.json();

                setLandlord(data);
            }catch(error){
                console.log(error)
            }
        }

        fetchLandlord();
    },[listing.userRef])

    const onChange = (e) =>{
        setMessage(e.target.value);
    }

  return (
    <>
        {landlord && (
            <div className="flex flex-col gap-4">
                <p>Liên hệ chủ nhà 
                    <span className="font-bold"> {landlord.username} </span>
                    <span> về</span> <span className="uppercase font-bold">{listing.name}</span>
                </p>

                <textarea 
                    name="message" 
                    id="message" 
                    rows="3" 
                    value={message} 
                    onChange={onChange}
                    placeholder="Nhập tin nhắn tại đây..."
                    className="p-3 w-full border rounded-lg "
                    >
                </textarea>

                <Link
                    to={`mailto:${landlord.email}?subject=${(listing.name).toUpperCase()}&body=${message}`}
                    className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90"
                >
                    Gửi tin nhắn 
                </Link>
            </div>
        )}
    </>
  )
}
