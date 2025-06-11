import React, { useState, useEffect } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import ForestImage from "@/assets/forest.jpg";
import HeroBanner from "@/components/common/HeroBanner";
import ClassList from "@/components/Classes/ClassList";
import ClassDetails from "@/components/Classes/ClassDetails";
import { ClassInfo } from "@/types/class";

const ClassesPage: React.FC = () => {
  useScrollToTop();
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/class`);
    return res.json();
  };

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setClasses(data.data);
          setSelectedClass(data.data[0] || null);
        } else {
          setClasses([]);
          setSelectedClass(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setClasses([]);
        setSelectedClass(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <HeroBanner
        image={ForestImage}
        title="Mountain Skills Classes"
        subtitle="Learn essential mountaineering skills from expert instructors"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Class List */}
          <div className="lg:w-1/3">
            <ClassList
              classes={classes}
              selectedClassId={selectedClass?._id || null}
              loading={loading}
              onClassSelect={setSelectedClass}
            />
          </div>

          {/* Right Column - Class Details */}
          <div className="lg:w-2/3">
            {selectedClass ? (
              <ClassDetails classInfo={selectedClass} />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-500">
                  Please select a class to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
