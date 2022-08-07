import { useState } from 'react';
import './App.css';
import Remover from './pages/Remover';
import Controller from './pages/Controller';

function App() {
  const [type, setType] = useState('west');

  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className='App'>
      <Remover />

      <h3>...</h3><br />
      <label>
        Pick a template to get started:
        <select value={type} onChange={handleSelectChange}>
          <option value='north'>north</option>
          <option value='south'>south</option>
          <option value='west'>west</option>
          <option value='east'>east</option>
        </select>
      </label>

      <Controller type={type} />
    </div>
  );
}

export default App;
