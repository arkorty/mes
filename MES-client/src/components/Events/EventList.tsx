import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/Events/EventCard";
import { EventInfo } from "@/types/event";

interface EventListProps {
  events: EventInfo[];
  loading: boolean;
  selectedEvent: EventInfo | null;
  onSelectEvent: (event: EventInfo) => void;
}

interface FilterBadgeProps {
  label: string;
  value: string;
  currentFilter: string;
  onClick: (value: string) => void;
}

const FilterBadge: React.FC<FilterBadgeProps> = ({ label, value, currentFilter, onClick }) => (
  <Badge 
    onClick={() => onClick(value)} 
    className={`cursor-pointer ${currentFilter === value ? 'bg-blue-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
  >
    {label}
  </Badge>
);

const EventList: React.FC<EventListProps> = ({ 
  events, 
  loading, 
  selectedEvent, 
  onSelectEvent 
}) => {
  const [filter, setFilter] = useState("all");
  
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter || event.tags.includes(filter));

  const filterOptions = [
    { label: "All Events", value: "all" },
    { label: "Workshops", value: "workshop" },
    { label: "Community", value: "community" },
    { label: "Festivals", value: "festival" },
    { label: "Training", value: "training" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
      
      {/* Filter Options */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((option) => (
          <FilterBadge
            key={option.value}
            label={option.label}
            value={option.value}
            currentFilter={filter}
            onClick={setFilter}
          />
        ))}
      </div>
      
      <div className="space-y-4">
        {loading ? (
          <p>Loading events...</p>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard 
              key={event.id} 
              eventInfo={event} 
              isSelected={selectedEvent?.id === event.id}
              onClick={() => onSelectEvent(event)} 
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No events found for this filter</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
