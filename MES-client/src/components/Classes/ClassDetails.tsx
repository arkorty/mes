import React from "react";
import { Calendar, MapPin, Clock, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassInfo } from "@/types/class";

interface ClassDetailsProps {
  classInfo: ClassInfo;
}

const ClassDetails: React.FC<ClassDetailsProps> = ({ classInfo }) => {
  // Use class-specific details
  const detailsContent = classInfo.details || {
    whatToBring: [],
    whatWeProvide: [],
    instructorCertifications: [],
    priceNote: ""
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Image */}
      <div className="h-64 relative">
        <img 
          src={classInfo.image} 
          alt={classInfo.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <div className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
              {classInfo.level}
            </div>
            <h1 className="text-3xl font-bold text-white">{classInfo.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-6">
            <p className="text-gray-700 mb-6">{classInfo.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold">Duration</h3>
                  <p className="text-gray-600">{classInfo.duration}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-600">{classInfo.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold">Class Size</h3>
                  <p className="text-gray-600">Max {classInfo.capacity} participants</p>
                </div>
              </div>
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold">Experience Level</h3>
                  <p className="text-gray-600">{classInfo.level}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Skills You'll Learn</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {classInfo.skillsCovered.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-green-600 mr-2" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold">${classInfo.price}</p>
                  <p className="text-sm text-gray-500">
                    {detailsContent.priceNote}
                  </p>
                </div>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Enroll Now
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Available Dates</h3>
            <div className="space-y-3 mb-8">
              {classInfo.dates.map((date, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-3" />
                    <span>{date}</span>
                  </div>
                  <Button size="sm" variant="outline">Select</Button>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-4">What to Bring</h3>
            <ul className="list-disc pl-5 space-y-2 mb-8">
              {detailsContent.whatToBring.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold mb-4">What We'll Provide</h3>
            <ul className="list-disc pl-5 space-y-2">
              {detailsContent.whatWeProvide.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="instructor" className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img 
                src={classInfo.instructorImage} 
                alt={classInfo.instructor} 
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">{classInfo.instructor}</h3>
                <p className="text-gray-700 mb-6">{classInfo.instructorBio}</p>
                <h4 className="font-semibold mb-2">Certifications</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {detailsContent.instructorCertifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClassDetails;
