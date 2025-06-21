import React, { useState, useEffect } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import ForestImage from "@/assets/forest.jpg";
import HeroBanner from "@/components/common/HeroBanner";
import EventList from "@/components/Events/EventList";
import EventDetails from "@/components/Events/EventDetails";
import { EventInfo } from "@/types/event";

interface EventApiResponse {
  success: boolean;
  data: EventInfo[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

const EventsPage: React.FC = () => {
  useScrollToTop();
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/event`);
    return res.json();
  };

  useEffect(() => {
    setLoading(true);
    fetchEvents()
      .then((data: EventApiResponse) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setEvents(data.data);
          setSelectedEvent(data.data[0] || null);
        } else {
          setEvents([]);
          setSelectedEvent(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
        setSelectedEvent(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner
        image={ForestImage}
        title="Mountain Events & Workshops"
        subtitle="Join our community at upcoming events, workshops, and gatherings"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Event List */}
          <div className="lg:w-1/3">
            <EventList
              events={events}
              loading={loading}
              selectedEvent={selectedEvent}
              onSelectEvent={setSelectedEvent}
            />
          </div>

          {/* Right Column - Event Details */}
          <div className="lg:w-2/3">
            {selectedEvent ? (
              <EventDetails eventInfo={selectedEvent} />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-500">
                  Please select an event to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
