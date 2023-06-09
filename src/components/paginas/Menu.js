import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';

import Platillo from '../ui/Platillo';

export const Menu = () => {

  // definir el state para los platillos
  const [platillos , guardarPlatillos ] = useState([]);

  const { firebase } = useContext(FirebaseContext)

  // consultar la base de datos al cargar
  useEffect(() => {
    const obtenerPlatillos = async () => {
      const resultado = await firebase.db.collection('productos').onSnapshot(manejarSnapShot);
        // console.log(resultado);
    }
    obtenerPlatillos();
  }, []);

  //Snapshot nos permite utilzar la BD de firebase en tiempo real
  function manejarSnapShot(snapshot){
        const platillos = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });

        // almacenar los resultados en el state 
        guardarPlatillos(platillos);
  }

  
  return (
    <>
        <h1 className='text-3xl font-light mb-4'>Menu</h1>
        <Link to="/nuevo-platillo" className="  bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
          Agregar Platillo
        </Link>

        {platillos.map( platillo => (
          <Platillo
             key={platillo.id}
             platillo={platillo}
          />
        ))}
    </>
  )
}

export default Menu;
