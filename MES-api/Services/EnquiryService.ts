import Enquiry from "../Models/Enquiries";

interface IEnquiryService {
  createEnquiry(enquiry: any): Promise<any>;
  getAllEnquiries(): Promise<any>;
  getEnquiryById(id: string): Promise<any>;
}

export class EnquiryService implements IEnquiryService {
  async createEnquiry(enquiry: any): Promise<any> {
    try {
      if (!enquiry.email) {
        return { success: false, message: "Please provide email", data: null };
      }
      if (!enquiry.mobile) {
        return { success: false, message: "Please provide mobile", data: null };
      }
      const model = await Enquiry.create(enquiry);

      return { success: true, data: model._id };
    } catch (error: any) {
      return { success: false, message: error.message, data: null };
    }
  }

  async getAllEnquiries(): Promise<any> {
    try {
      const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
      return { success: true, data: enquiries };
    } catch (error: any) {
      return { success: false, message: error.message, data: null };
    }
  }

  async getEnquiryById(id: string): Promise<any> {
    try {
      const enquiry = await Enquiry.findById(id);
      return { success: true, data: enquiry };
    } catch (error: any) {
      return { success: false, message: error.message, data: null };
    }
  }
}
