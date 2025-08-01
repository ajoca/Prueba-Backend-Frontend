import React from 'react';

function FilterBar({ filterName, setFilterName, filterCompleted, setFilterCompleted }) {
  return (
    <div className="d-flex gap-2 mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
      <select
        className="form-select"
        value={filterCompleted}
        onChange={(e) => setFilterCompleted(e.target.value)}
      >
        <option value="all">Todas</option>
        <option value="true">Completadas</option>
        <option value="false">Pendientes</option>
      </select>
    </div>
  );
}

export default FilterBar;
