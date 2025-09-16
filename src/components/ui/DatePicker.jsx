// src/components/ui/DatePicker.jsx

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { format, isValid, parseISO } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css'; // Default styles
import { CalendarIcon } from 'lucide-react';

const DatePicker = ({ selectedDate, onSelectDate, placeholder = "Select Date" }) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const pickerRef = useRef(null);

    const handleDayClick = (day) => {
        onSelectDate(day);
        setIsPickerOpen(false);
    };

    const handleClickOutside = (event) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setIsPickerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formattedDate = selectedDate && isValid(selectedDate) ? format(selectedDate, 'dd MMMM yyyy') : '';

    return (
        <div className="relative" ref={pickerRef}>
            <button
                onClick={() => setIsPickerOpen(!isPickerOpen)}
                className="flex items-center gap-2 text-gray-600 text-sm font-medium border rounded-md px-3 py-1.5 hover:bg-gray-50 bg-white min-w-[120px] justify-between"
            >
                <CalendarIcon size={16} />
                <span>{formattedDate || placeholder}</span>
                {/* Optional: Add a clear button */}
                {selectedDate && (
                    <span 
                        onClick={(e) => { e.stopPropagation(); onSelectDate(null); }}
                        className="ml-2 text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                        &times;
                    </span>
                )}
            </button>
            {isPickerOpen && (
                <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 right-0 md:right-auto">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDayClick}
                        showOutsideDays
                        // Custom styles to match the image
                        styles={{
                            caption: { display: 'flex', justifyContent: 'center' },
                            head_row: { display: 'flex', justifyContent: 'center' },
                            row: { display: 'flex', justifyContent: 'center' },
                            cell: { padding: '0.25rem' },
                            button: { borderRadius: '0.5rem', padding: '0.5rem' },
                            day_selected: { backgroundColor: 'rgb(59 130 246)', color: 'white' }, // bg-blue-500
                            day_today: { fontWeight: 'bold', color: 'rgb(59 130 246)' }, // text-blue-500
                        }}
                        className="p-4"
                        formatters={{
                            formatCaption: (month, options) => {
                                const y = month.getFullYear();
                                const m = month.getMonth();
                                const monthName = options.formatCaption(month, { month: 'long' });
                                return (
                                    <div className="flex justify-between items-center text-gray-700 font-medium">
                                        <button
                                            onClick={() => {
                                                const newMonth = new Date(y, m - 1);
                                                onSelectDate(newMonth); // Pass a new month to update picker
                                            }}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                        >
                                            &lt;
                                        </button>
                                        <div>{monthName} {y}</div>
                                        <button
                                            onClick={() => {
                                                const newMonth = new Date(y, m + 1);
                                                onSelectDate(newMonth); // Pass a new month to update picker
                                            }}
                                            className="p-1 rounded-full hover:bg-gray-100"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                );
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePicker;