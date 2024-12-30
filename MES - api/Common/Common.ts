import sharp from "sharp";
import fs from "fs";

export enum UserRole{
    Admin=0,
    SuperAdmin=1,
    Client=2,
}



export enum PaymentStatus{
    Processing="Processing",
    Success="Success",
    Failed="Failed",
    COD="COD"
}


export enum DashboardElements{
    Class,
    Booking,
    Enquiry,
    Product
}

export enum OrderStatus {
  Pending = 0,
  OrderReceived = 1,
  Processing = 2,
  Delivered = 3,
  Cancelled = 4,
  Expired = 5,
  PaymentFailed = 6,
}


export const rootDir = process.cwd();
export const baseUrl = `http://localhost:3000`;

export function EncodeBase64(input:string) {
    return btoa(input);
  }
export function DecodeBase64(input:string) {
    return atob(input);
  }

//export const razorPayGatewayUrl="https://api.razorpay.com/v1/checkout/embedded?payment_id="

export const FilePaths = {
    classFilePath: `/uploads/class`,
    serviceFilePath:`/uploads/service`,
    productFilePath:`/uploads/product`
};


//------------------ box section --------------------------------


export interface IBoxItem{
    type:string,
    length:number,
    width:number,
    height:number,
    price:number,
    weight?:number,
    volume:number
}


//---------origin address
export const OriginAddress={
    address1:``,
    city:``,
    state:``,
    zip:``
}

export const GenerateThumbnail= async(filePath:string, size:number, thumbnailFilePath:string)=>{
  try {
     let thumbnailBuffer = await sharp(`${filePath}`)
      .resize(size, size) // Resize to 200x200 pixels
      .toBuffer()
      fs.writeFileSync(`${thumbnailFilePath}`, thumbnailBuffer);
  } catch (error:any) {
    throw error;
  }
}