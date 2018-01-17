import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Slider } from 'office-ui-fabric-react/lib/Slider';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  render() {
    let { disabled, checked } = this.props;

    return (
      <div>

        <div style={{ display: 'flex', alignItems: 'stretch', height: '40px' }}>
        <Slider
            label='Basic example:'
            min={ 1 }
            max={ 300 }
            step={ 1 }
            defaultValue={ 2 }
            showValue={ true }
            // tslint:disable-next-line:jsx-no-lambda
            onChange={ (value) => console.log(value) }
          />

          <CommandBarButton
            data-automation-id='test'
            disabled={disabled}
            checked={checked}
            iconProps={{ iconName: 'Add' }}
            text='Create account'
            menuProps={{
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail'
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar'
                }
              ]
            }}
          />
          <CommandBarButton
            data-automation-id='test2'
            disabled={disabled}
            checked={checked}
            iconProps={{ iconName: 'Mail' }}
            text='Send Mail'
          />
        </div>
      </div>
    );
  }
}

export default App