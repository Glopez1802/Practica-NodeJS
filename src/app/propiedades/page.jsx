"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

async function loadPropiedades() {
  try {
    const response = await axios.get('/api/propiedades');
    return response.data;
  } catch (error) {
    console.error('Error al cargar las propiedades:', error);
    return [];
  }
}

function PropiedadesList() {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const fetchPropiedades = async () => {
      const propiedadesData = await loadPropiedades();
      setPropiedades(propiedadesData);
    };
    fetchPropiedades();
  }, []);
  const deletePropiedad = async (propiedadId) => {
    try {
      if (confirm('Estas Seguro que quieres eliminar esta Propiedad?')) {
        const res = await axios.delete(`/api/propiedades/${propiedadId}`);
        if (res.status === 204) {

          setPropiedades((prevPropiedades) =>
            prevPropiedades.filter((propiedad) => propiedad.id !== propiedadId)
          );
        }
      }
    } catch (error) {
      console.error('Error al Eliminar la Propiedades:', error);
    }
  };

  const updatePropiedad = async (propiedad) => {
    try {
      
    } catch (error) {
      
    }
  }


  return (
    <>
      <h2 className="text-2xl font-extrabold dark:text-white m-8">
        Propieadades {' '}
        <a href="/propiedades/new" className="bg-blue-500
         hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 
         rounded mt-5">
          Nueva Propiedad
        </a>
      </h2>
      <div className='shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
        <table className='min-w-full text-center text-sm font-light'>
          <thead>
            <tr className='border-b font-medium bg-gray-300'>
              <th>Options</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Caracteristicas</th>
              <th>Estado</th>
              <th>Precio Alquiler</th>
              <th>Fecha Creacion</th>
              <th>Fecha Actualizacion</th>
            </tr>
          </thead>
          <tbody>
          {propiedades.map((propiedad, index) => {
              return (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="whitespace-nowrap px-6 py-4"> 
                    <button
                      className="text-white bg-red-500 hover:bg-red-700 mr-2 py-2 px-3 rounded"
                      onClick={() => deletePropiedad(propiedad.id)}>Delete
                    </button> 
                    <button
                      className="text-white bg-green-500 hover:bg-green-700 py-2 px-3 rounded"
                      onClick={() => updatePropiedad(propiedad.id)}>Actualizar
                    </button></td>
                    
                <td className="whitespace-nowrap px-6 py-4">{propiedad.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedad.nombre}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedad.direccion}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedad.caracteristicas}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedad.estado}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedad.precioalquiler}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedad.created_at}</td>
                <td className="whitespace-nowrap px-6 py-4">{propiedad.updated_at}</td>
              </tr>
              ); 
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PropiedadesList