"use client";

import {
  SECTORES,
  PROVINCIAS,
  ZONAS,
  NUM_EMPLEADOS,
  ANOS_OPERACION,
  INGRESOS_MENSUALES,
  FORMALIZACION,
  GENEROS,
  EDADES,
  NIVELES_EDUCATIVOS,
} from "@/lib/constants";

interface Props {
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

function SelectField({
  label,
  field,
  options,
  value,
  onChange,
}: {
  label: string;
  field: string;
  options: readonly string[];
  value: string;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value || ""}
        onChange={(e) => onChange(field, e.target.value)}
        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Seleccione...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function DemographicsForm({ values, onChange }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Datos Generales de la Empresa</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Esta informacion nos ayuda a personalizar su diagnostico. No puntua en
        la evaluacion.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la empresa (opcional)
          </label>
          <input
            type="text"
            value={values.nombre || ""}
            onChange={(e) => onChange("nombre", e.target.value)}
            placeholder="Ej: Mi Negocio SRL"
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <SelectField
          label="Sector principal de actividad"
          field="sector"
          options={SECTORES}
          value={values.sector}
          onChange={onChange}
        />
        <SelectField
          label="Provincia donde opera principalmente"
          field="provincia"
          options={PROVINCIAS}
          value={values.provincia}
          onChange={onChange}
        />
        <SelectField
          label="Zona"
          field="zona"
          options={ZONAS}
          value={values.zona}
          onChange={onChange}
        />
        <SelectField
          label="Numero de empleados (incluyendo al dueno)"
          field="numEmpleados"
          options={NUM_EMPLEADOS}
          value={values.numEmpleados}
          onChange={onChange}
        />
        <SelectField
          label="Anos de operacion de la empresa"
          field="anosOperacion"
          options={ANOS_OPERACION}
          value={values.anosOperacion}
          onChange={onChange}
        />
        <SelectField
          label="Rango de ingresos mensuales aproximados"
          field="ingresosMensuales"
          options={INGRESOS_MENSUALES}
          value={values.ingresosMensuales}
          onChange={onChange}
        />
        <SelectField
          label="La empresa esta formalmente registrada"
          field="formalizacion"
          options={FORMALIZACION}
          value={values.formalizacion}
          onChange={onChange}
        />
        <SelectField
          label="Genero del propietario/a principal"
          field="genero"
          options={GENEROS}
          value={values.genero}
          onChange={onChange}
        />
        <SelectField
          label="Edad del propietario/a principal"
          field="edad"
          options={EDADES}
          value={values.edad}
          onChange={onChange}
        />
        <SelectField
          label="Nivel educativo del propietario/a principal"
          field="nivelEducativo"
          options={NIVELES_EDUCATIVOS}
          value={values.nivelEducativo}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
