import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setfecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)

  useEffect(() => {

    if( Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setfecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    } else {
      console.log('No hay nada')
    }

  }, [paciente])

  

  const generarId = () => {
    const currentTime = new Date().getTime().toString();
    return currentTime.slice(-6);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación del Formulario
    if( [nombre, propietario, email, fecha, sintomas].includes('') ) {
      console.log('Hay al menos un campo vacio')

      setError(true)

      return;

    } 

      setError(false)

      // Objetos de Paciente
      const objetoPaciente = {
        nombre, 
        propietario, 
        email, 
        fecha, 
        sintomas

      }

      // Editar Registros
      if(paciente.id) {
        
        objetoPaciente.id = paciente.id

        const pacientesActualizados = pacientes.map ( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

        setPacientes(pacientesActualizados)
        setPaciente({})

      } else {

        objetoPaciente.id = generarId()

        setPacientes([...pacientes, objetoPaciente])
      }

      //Reinicio de Form
      setNombre('')
      setPropietario('')
      setEmail('')
      setfecha('')
      setSintomas('')
    
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añadir Paciente y {''}
        <span className="text-indigo-600 font-bold text-lg">Adminitralos</span>
      </p>

      <form
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
            </label>

          <input
              id="mascota"
              type="text"
              placeholder="Nombre de la Mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={nombre}
              onChange={ (e) => setNombre(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre Propietario
            </label>

          <input
              id="propietario"
              type="text"
              placeholder="Nombre del Propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            E-Mail
            </label>

          <input
              id="email"
              type="email"
              placeholder="Correo electronico propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Fecha de Alta
            </label>

          <input
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={ (e) => setfecha(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
              Síntomas
            </label>

          <textarea
            id="sintomas"
            placeholder="Decripción de Sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>
    </div>
  )
}

export default Formulario

