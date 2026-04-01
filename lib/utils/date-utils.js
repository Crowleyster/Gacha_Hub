/**
 * Date and Time utilities for Events and News
 */

export function formatDateShort(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
    });
}

export function getTimeInfo(event) {
    const { endDate, statusLabel } = event;

    // Próximamente — evento aún no iniciado
    if (statusLabel === 'Próximos' || event.status === 'upcoming') {
        return { label: 'Próximamente', color: 'bg-black/50 backdrop-blur-sm text-white border-white/10', expired: false };
    }

    if (!endDate) {
        return { label: 'Evento', color: 'bg-status-success text-white border-status-success/20', expired: false };
    }

    const [ey, em, ed] = endDate.split('-').map(Number);
    const end = new Date(ey, em - 1, ed);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const diffMs = end - now;
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    // Expirado
    if (diffMs < 0) {
        return { label: 'Finalizado', color: 'bg-white/10 text-white/50 border-white/10', expired: true };
    }

    // Permanente
    if (diffDays > 365 || event.category === 'Permanente') {
        return { label: 'Permanente', color: 'bg-status-info text-white border-status-info/20', expired: false };
    }

    // Últimas horas (≤ 24h)
    if (diffHours <= 24) {
        return { label: `${diffHours} ${diffHours === 1 ? 'Hora' : 'Hrs'}`, color: 'bg-status-danger text-white border-status-danger/20', expired: false };
    }

    // Últimos días (> 24h y ≤ 7 días)
    if (diffDays <= 7) {
        return { label: `${diffDays} ${diffDays === 1 ? 'Día' : 'Días'}`, color: 'bg-status-warning text-white border-status-warning/20', expired: false };
    }

    // Activo con tiempo
    return { label: `${diffDays} Días`, color: 'bg-status-success text-white border-status-success/20', expired: false };
}
