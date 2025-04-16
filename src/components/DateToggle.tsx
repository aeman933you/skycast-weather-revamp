
import React, { useState } from 'react';
import { Toggle } from "@/components/ui/toggle";
import { format } from 'date-fns';
import { Calendar, CalendarDays, CalendarClock } from 'lucide-react';

const dateFormats = {
  date: 'dd',
  month: 'MMM',
  year: 'yyyy'
};

const DateToggle: React.FC = () => {
  const [currentDate] = useState(new Date());
  const [selectedFormat, setSelectedFormat] = useState<keyof typeof dateFormats>('date');

  return (
    <div className="flex items-center space-x-1">
      <Toggle
        variant="outline"
        pressed={selectedFormat === 'date'}
        onPressedChange={() => setSelectedFormat('date')}
        className="h-8 w-8 p-0"
      >
        <Calendar className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="outline"
        pressed={selectedFormat === 'month'}
        onPressedChange={() => setSelectedFormat('month')}
        className="h-8 w-8 p-0"
      >
        <CalendarDays className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="outline"
        pressed={selectedFormat === 'year'}
        onPressedChange={() => setSelectedFormat('year')}
        className="h-8 w-8 p-0"
      >
        <CalendarClock className="h-4 w-4" />
      </Toggle>
      <span className="ml-2 text-sm text-muted-foreground">
        {format(currentDate, dateFormats[selectedFormat])}
      </span>
    </div>
  );
};

export default DateToggle;
