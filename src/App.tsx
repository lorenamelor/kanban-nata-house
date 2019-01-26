import * as React from 'react';

import { Route } from 'react-router-dom';

// Pages

import { Kanban } from './pages';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
				<Route exact path='/' component={Kanban} />
      </div>
    );
  }
}

export default App;
