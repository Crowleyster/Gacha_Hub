"use client";

import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ActiveEventContext = createContext({
    selectedEvent: null,
    isOpen: false,
    openEvent: () => {},
    closeEvent: () => {},
});

export function ActiveEventProvider({ children }) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openEvent = useCallback((event) => {
        setSelectedEvent(event);
        setIsOpen(true);
    }, []);

    const closeEvent = useCallback(() => {
        setIsOpen(false);
        // We handle resetting selectedEvent with a delay in the RightSheet itself 
        // to avoid content flickering during the transition.
    }, []);

    const value = useMemo(() => ({
        selectedEvent,
        isOpen,
        openEvent,
        closeEvent
    }), [selectedEvent, isOpen, openEvent, closeEvent]);

    return (
        <ActiveEventContext.Provider value={value}>
            {children}
        </ActiveEventContext.Provider>
    );
}

export function useActiveEvent() {
    const context = useContext(ActiveEventContext);
    if (!context) {
        throw new Error("useActiveEvent must be used within an ActiveEventProvider");
    }
    return context;
}
