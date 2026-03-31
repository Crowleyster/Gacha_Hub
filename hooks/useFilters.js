import { useState, useMemo, useEffect } from 'react';

/**
 * useFilters Hook
 * 
 * Unifica la lógica de filtrado, ordenamiento y paginación (Load More) 
 * para las secciones de Juegos, Noticias y Eventos.
 * 
 * @param {Array} initialData - El listado base de elementos (allNews, allEvents, etc.)
 * @param {Object} config - Configuración de filtrado y ordenamiento
 * @returns {Object} - Estados y funciones controladoras
 */
export function useFilters(initialData = [], {
    filterFn = (item, filters) => true,
    sortFn = (a, b, mode) => 0,
    initialSort = '',
    initialFilters = {},
    initialVisible = 8,
    pageSize = 4
} = {}) {
    const [filters, setFilters] = useState(initialFilters);
    const [sortMode, setSortMode] = useState(initialSort);
    const [visibleCount, setVisibleCount] = useState(initialVisible);

    // 1. Filtrado y Ordenamiento Combinado
    const filteredAndSortedData = useMemo(() => {
        if (!Array.isArray(initialData)) return [];
        
        let result = initialData.filter(item => filterFn(item, filters));
        
        if (sortMode) {
            result = [...result].sort((a, b) => sortFn(a, b, sortMode));
        }
        
        return result;
    }, [initialData, filters, sortMode, filterFn, sortFn]);

    // 2. Data visible para el renderizado
    const visibleData = useMemo(() => {
        return filteredAndSortedData.slice(0, visibleCount);
    }, [filteredAndSortedData, visibleCount]);

    // 3. Resetear contador cuando cambian los filtros o el orden
    useEffect(() => {
        setVisibleCount(initialVisible);
    }, [filters, sortMode, initialVisible]);

    // 4. Funciones controladoras
    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => setFilters(initialFilters);

    const loadMore = () => {
        setVisibleCount(prev => prev + pageSize);
    };

    const hasMore = visibleCount < filteredAndSortedData.length;
    
    const hasActiveFilters = useMemo(() => {
        return Object.keys(filters).some(key => {
            const val = filters[key];
            const initialVal = initialFilters[key];
            if (Array.isArray(val)) return val.length > (initialVal?.length || 0);
            return val !== initialVal;
        });
    }, [filters, initialFilters]);

    return {
        filters,
        setFilters,
        updateFilter,
        clearFilters,
        sortMode,
        setSortMode,
        visibleData,
        filteredCount: filteredAndSortedData.length,
        totalCount: initialData?.length || 0,
        loadMore,
        hasMore,
        hasActiveFilters
    };
}
