import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ClassInfo } from "@/types/class";

interface ClassCardProps {
  classInfo: ClassInfo;
  isSelected: boolean;
  onClick: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ classInfo, isSelected, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-2 border-green-600" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={classInfo.image} 
              alt={classInfo.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-green-800">{classInfo.title}</h3>
            <p className="text-sm text-gray-500">{classInfo.level} • {classInfo.duration}</p>
            <div className="flex items-center text-sm mt-1 text-gray-600">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{classInfo.dates[0]}</span>
            </div>
            <p className="mt-1 text-sm font-medium">
              ${classInfo.price} • {classInfo.spotsLeft} spots left
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
