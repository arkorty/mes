import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EventInfo } from "@/types/event";

interface EventCardProps {
  eventInfo: EventInfo;
  isSelected: boolean;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ eventInfo, isSelected, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-2 border-blue-600" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={eventInfo.image} 
              alt={eventInfo.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-blue-800">{eventInfo.title}</h3>
            <div className="flex items-center text-sm mt-1 text-gray-600">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{eventInfo.date}</span>
            </div>
            <div className="flex items-center text-sm mt-1 text-gray-600">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{eventInfo.location}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {eventInfo.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {eventInfo.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{eventInfo.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
