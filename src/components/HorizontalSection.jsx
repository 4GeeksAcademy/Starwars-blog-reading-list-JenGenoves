import React from 'react';
import { ChevronRight } from 'lucide-react';
import { EntityCard } from './EntityCard';

export function HorizontalSection({ title, items, type }) {
  return (
    <div className="mb-5"> {/* mb-5 para un buen espaciado */}
      <h2 className="fs-4 fw-bold text-danger mb-3 d-flex align-items-center">
        {title}
        <ChevronRight size={24} />
      </h2>
      {/* Usamos la clase custom para el scroll horizontal */}
      <div className="d-flex horizontal-scroll">
        {items.map(item => (
          // Usamos 'm-2' para espaciado entre tarjetas
          <EntityCard key={item.uid} item={item} type={type} className="m-2" />
        ))}
        {items.length === 0 && (
          <div className="w-100 text-center py-5 text-muted fst-italic">
            Cargando datos del imperio...
          </div>
        )}
      </div>
    </div>
  );
}