import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req,res,next) =>{
   try{
    const listing = await Listing.create(req.body)
    
    return res.status(201).json(listing);
   }catch(error){
    next(error);
   }
}

export const deleteListing = async(req,res,next)=>{
      const listing = await Listing.findById(req.params.id);

      if(!listing){
         return next(errorHandler(404, 'Không tìm thấy danh sách!'));
      }

      if(req.user.id !== listing.userRef){
         return next(errorHandler(401, 'Người dùng chỉ có thể tự xóa danh sách của chính mình!'));
      }

      try{
         await Listing.findByIdAndDelete(req.params.id);
         res.status(200).json('Xóa danh sách thành công!');

      }catch(error){
         next(error);
      }
}

export const updateListing = async (req,res,next) => {
   const listing = await Listing.findById(req.params.id);

   if(!listing){
      return next(errorHandler(404, 'Không tìm thấy danh sách'))
   }

   if(req.user.id !== listing.userRef){
      return next(errorHandler(401, 'Chỉ người dùng mới có thể tự cập nhật danh sách của chính mình!'));
   }

   try{
      const updatedListing = await Listing.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true
         }
      )

      res.status(200).json(updatedListing)
   }catch(error){
      next(error);
   }
}