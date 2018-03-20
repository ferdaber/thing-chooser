import React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'

import { Autocomplete } from './Autocomplete'
import { Dropdown } from './Dropdown'
import { MultiAutocomplete } from './MultiAutocomplete'

injectGlobal`
    :root {
        font-size: 16px;
        font-family: Helvetica, serif;
    }
    
    input, textarea, select, button {
        font-size: inherit;
        font-family: inherit;
    }

    #root {
      padding: 24px;
       
      > * + * {
        margin-top: 24px;
      }
    }
`

const options = [
    { label: 'Apple', value: 0 },
    { label: 'Banana', value: 1 },
    { label: 'Cherry', value: 2 },
    { label: 'Durian', value: 3 },
    { label: 'Apple', value: 4 },
    { label: 'Banana', value: 5 },
    { label: 'Cherry', value: 6 },
    { label: 'Durian', value: 7 },
    { label: 'Apple', value: 8},
    { label: 'Banana', value: 9 },
    { label: 'Cherry', value: 10 },
    { label: 'Durian', value: 11 }
]

const App = () => (
    <React.Fragment>
        <Autocomplete
            onSelect={console.log}
            options={options}
            placeholder="Enter a fruit"
        />
        <Dropdown
            onSelect={console.log}
            options={options}
        />
        <MultiAutocomplete
            onSelect={console.log}
            options={options}
            placeholder="Enter a fruit"
        />
    </React.Fragment>
)

render(<App />, document.getElementById('root'))
