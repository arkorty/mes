
import bgImage from "../../assets/Home/contact-us_bg.png"; 

export default function Contactus() {
  return (
    <div
      className="min-h-screen   bg-cover bg-center px-4 "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/40 md:bg-white relative left shadow-lg rounded-lg p-6 xl:p-12 md:w-[40%] top-10 md:left-[26rem] lg:left-[36rem] xl:left-[46rem]  max-w-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600">
          Share Your Details
        </h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Share your vacation details with us and we will get back to you with the best gears and options.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="abc@example.com"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="999-999-9999"
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Your Comments (Optional)</label>
            <textarea
              
              placeholder="Let us know if you have other comments."
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Max. 2000 characters</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
