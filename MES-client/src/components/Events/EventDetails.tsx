import React from "react";
import { Calendar, MapPin, Clock, Users, Tag, ArrowRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventInfo } from "@/types/event";

interface EventDetailsProps {
  eventInfo: EventInfo;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventInfo }) => {
  // Use the event-specific details
  const detailsContent = eventInfo.details || {
    whatToBring: [],
    refundPolicy: "",
    parkingInfo: "",
    transportation: ""
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Image */}
      <div className="h-64 relative">
        <img 
          src={eventInfo.image} 
          alt={eventInfo.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {eventInfo.tags.map((tag, index) => (
                <Badge key={index} className="bg-blue-600">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold text-white">{eventInfo.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-6">
            <p className="text-gray-700 mb-6">{eventInfo.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold">Date</h3>
                  <p className="text-gray-600">{eventInfo.date}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold">Time</h3>
                  <p className="text-gray-600">{eventInfo.time}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-600">{eventInfo.location}</p>
                  <p className="text-gray-500 text-sm">{eventInfo.locationDetails}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold">Capacity</h3>
                  <p className="text-gray-600">
                    {eventInfo.capacity === 0 
                      ? "Open to all" 
                      : eventInfo.spotsLeft > 0 
                        ? `${eventInfo.spotsLeft} spots remaining of ${eventInfo.capacity}`
                        : "Sold out"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Event Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {eventInfo.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-blue-600 mr-2" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold">
                    {eventInfo.price === 0 ? "Free" : `$${eventInfo.price}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    Organized by {eventInfo.organizer}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={eventInfo.capacity > 0 && eventInfo.spotsLeft === 0}
                  >
                    {eventInfo.capacity > 0 && eventInfo.spotsLeft === 0 
                      ? "Sold Out" 
                      : "Register Now"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Event Details</h3>
            <p className="text-gray-700 mb-6">{eventInfo.description}</p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Organizer</h4>
              <p className="text-gray-700">{eventInfo.organizer}</p>
              <p className="text-gray-600 mt-1">Contact: {eventInfo.contactEmail}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {eventInfo.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {eventInfo.price > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Refund Policy</h4>
                <p className="text-gray-700">
                  {detailsContent.refundPolicy}
                </p>
              </div>
            )}
            
            <div>
              <h4 className="font-semibold mb-2">What to Bring</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {detailsContent.whatToBring.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="location" className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Event Location</h3>
            <div className="bg-gray-100 rounded-lg h-72 mb-6 flex items-center justify-center">
              <p className="text-gray-500">
                Map will be displayed here <br/>
                {eventInfo.location}
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-gray-700">{eventInfo.location}</p>
              <p className="text-gray-600">{eventInfo.locationDetails}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Parking Information</h4>
              <p className="text-gray-700">
                {detailsContent.parkingInfo}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Public Transportation</h4>
              <p className="text-gray-700">
                {detailsContent.transportation}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventDetails;
