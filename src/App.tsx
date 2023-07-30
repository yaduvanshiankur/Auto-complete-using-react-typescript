import React from 'react';
import './App.css';
import Autocomplete from './Autocomplete';

const App: React.FC = () => {
  const suggestions: string[] = ['Banana', 'Code', 'Ankur', 'Apple', 'Cider', 'Hello', 'React', 'TypeScript'];

  return (
    <div className="App">
      <div className='autocomplete-wrapper'>
        <Autocomplete suggestions={suggestions} />
      </div>
    </div>
  );
};

export default App;
