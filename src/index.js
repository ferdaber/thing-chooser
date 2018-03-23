import 'babel-polyfill'
import '@widen/patterns-style'

import React from 'react'
import { render } from 'react-dom'
import styled, { injectGlobal } from 'styled-components'

import { Autocomplete } from './Autocomplete'
import { Dropdown } from './Dropdown'
import { MultiAutocomplete } from './MultiAutocomplete'

injectGlobal`
    #root {
      padding: 24px;
    }
`

const AppRoot = styled.div`
    > * + * {
        margin-top: 24px;
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
    { label: 'Apple', value: 8 },
    { label: 'Banana', value: 9 },
    { label: 'Cherry', value: 10 },
    { label: 'Durian', value: 11 }
]

class AsyncAutocomplete extends React.Component {
    constructor() {
        super()
        this.state = {
            results: []
        }
    }

    fetchAndFilter(filterValue) {
        if (!filterValue || filterValue.length < 2) {
            return this.setState({
                results: []
            })
        }
        return fetch(this.props.fetchUrl || 'https://jsonplaceholder.typicode.com/albums?' + Date.now())
            .then(response => response.json())
            .then(results =>
                this.setState({
                    results: results
                        .map(result => ({
                            label: result.title,
                            value: result.id
                        }))
                        .filter(option => option.label.toLowerCase().indexOf(filterValue.toLowerCase()) > -1)
                })
            )
    }

    render() {
        return (
            <MultiAutocomplete
                onSelect={this.props.onSelect}
                onInputChange={inputValue => this.fetchAndFilter(inputValue)}
                options={this.state.results}
                placeholder="Enter a post title to search"
            />
        )
    }
}

const App = () => (
    <AppRoot>
        <Autocomplete onSelect={console.log} options={options} placeholder="Enter a fruit" />
        <Dropdown onSelect={console.log} options={options} />
        <MultiAutocomplete onSelect={console.log} options={options} placeholder="Enter a fruit" />
        <AsyncAutocomplete onSelect={console.log} />
        <MultiAutocomplete onSelect={console.log} options={options} placeholder="Enter another fruit" height={48} />
    </AppRoot>
)

render(<App />, document.getElementById('root'))
