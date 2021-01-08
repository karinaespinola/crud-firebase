import React from 'react';
import {app, database} from './firebase';
import 'firebase/database';
import firestore from 'firebase/firestore';

function App() {
  const [firebase, setFirebase] = React.useState({database: null});
  const [tareas, setTareas] =import React from 'react';
  import {app, database} from './firebase';
  import 'firebase/database';
  import firestore from 'firebase/firestore';
  
  function App() {
    const [firebase, setFirebase] = React.useState({database: null});
    const [tareas, setTareas] = React.useState([]);
    const [tarea, setTarea] = React.useState([]);
    const [modoEdicion, setModoEdicion] = React.useState(false);
    const [id, setId] = React.useState([]);
  
    React.useEffect(() => {
  
    obtenerDatos();
  }, []);
  
  const obtenerDatos = () => {
    if(database) {
      database.ref('tareas').on('value', (snapshot) => {
        const vals = snapshot.val();
        let _records = [];
        for(let key in vals){
            _records.push({
                ...vals[key],
                id: key
            });
        }
        setTareas(_records);
      });
    }
  }
  
  const agregar = (e) => {
    e.preventDefault();
    if(!tarea.trim())
    {
      return;
    }
    const nuevaTarea = {
      name : tarea,
      date : Date.now()
    }
    database.ref('tareas').push().set(nuevaTarea)
    .then((doc) => {
        // nothing to do here since you already have a 
        // connection pulling updates to Todos
        setTarea('');
    })
    .catch((error) => {
      console.error(error);
    });  
  }
  
  const eliminar = (id) => {
    const tareaEliminar = database.ref('tareas/' + id);
    if(tareaEliminar) {
      tareaEliminar.remove();
    }
  }
  
  const modoEdit = (item) => {
    setModoEdicion(true);
    setTarea(item.name);
    setId(item.id);
  }
  
  const editar = (e) => {
    e.preventDefault();
    let updates = {};
    updates['/tareas/' + id] = {name : tarea};
  
    database.ref().update(updates);
  
    setModoEdicion(false);
    setTarea('');
    setId([]);
  }
  
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6">
            <ul className="list-group">
              {
                tareas.map((item) => (
                  <li key={item.id} className="list-group-item">
                    {item.name} - {item.date}
                    <button className="btn btn-danger btn-sm float-right"
                    onClick={(e) => eliminar(item.id)}>
                      Eliminar
                    </button>
                    <button className="btn btn-warning btn-sm float-right"
                    onClick={(e) => modoEdit(item)}>
                      Editar
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="col-md-6">
            <h3>
              {
                modoEdicion ? "Editar Tarea" : "Agregar Tarea"
              }
            </h3>
            <form onSubmit={modoEdicion ? editar : agregar}>
              <input 
              type="text"
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}/>
              <button 
              className={modoEdicion ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}  
              type="submit">
                {
                  modoEdicion ? "Editar" : "Agregar"
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default App;
   React.useState([]);
  const [tarea, setTarea] = React.useState([]);

  React.useEffect(() => {

  obtenerDatos();
}, []);

const obtenerDatos = () => {
  if(database) {
    database.ref('tareas').on('value', (snapshot) => {
      const vals = snapshot.val();
      let _records = [];
      for(let key in vals){
          _records.push({
              ...vals[key],
              id: key
          });
      }
      setTareas(_records);
    });
  }
}

const agregar = (e) => {
  e.preventDefault();
  if(!tarea.trim())
  {
    return;
  }
  const nuevaTarea = {
    name : tarea,
    date : Date.now()
  }
  database.ref('tareas').push().set(nuevaTarea)
  .then((doc) => {
      // nothing to do here since you already have a 
      // connection pulling updates to Todos
      setTarea('');
  })
  .catch((error) => {
    console.error(error);
  });  
}

const eliminar = (id) => {
  const tareaEliminar = database.ref('tareas/' + id);
  if(tareaEliminar) {
    tareaEliminar.remove();
  }
}

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map((item) => (
                <li key={item.id} className="list-group-item">
                  {item.name} - {item.date}
                  <button className="btn btn-danger btn-sm float-right"
                  onClick={(e) => eliminar(item.id)}>
                    Eliminar
                  </button>
                  <button className="btn btn-warning btn-sm float-right">
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Formulario</h3>
          <form onSubmit={agregar}>
            <input 
            type="text"
            placeholder="Ingrese tarea"
            className="form-control mb-2"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}/>
            <button className="btn btn-dark btn-block" type="submit">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
