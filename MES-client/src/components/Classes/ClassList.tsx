import React from "react";
import { ClassInfo } from "@/types/class";
import ClassCard from "./ClassCard";

interface ClassListProps {
  classes: ClassInfo[];
  selectedClassId: string | null;
  loading: boolean;
  onClassSelect: (classInfo: ClassInfo) => void;
}

const ClassList: React.FC<ClassListProps> = ({
  classes,
  selectedClassId,
  loading,
  onClassSelect
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Classes</h2>
      <p className="text-gray-600 mb-6">
        Build your skills with our expert-led courses designed for all experience levels
      </p>
      <div className="space-y-4">
        {loading ? (
          <p>Loading classes...</p>
        ) : (
          classes.map((classItem) => (
            <ClassCard 
              key={classItem.id} 
              classInfo={classItem} 
              isSelected={selectedClassId === classItem.id}
              onClick={() => onClassSelect(classItem)} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ClassList;
