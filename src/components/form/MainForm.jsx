import React from 'react'
import 'fetch-ie8'

const simpleGet = (url) => {
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }
    }

    return fetch(url, options).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Request error')
        }
    })
}

export const requestTable = () => {
    const url = `api/table/all`
    return simpleGet(url)
}

export default class extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            'data': null
        }
    }

    componentDidMount() {
        requestTable()
            .then(data => this.setState({'data': data}))
            .catch(error => console.error(error))
    }

    render() {
        if (this.state.data == null) return null

        let r = 0
        let c = 0

        const content = this.state.data.map(row => {
            const cells = row.map( cell => <td key={c++}>{cell}</td> )
            return <tr key={r++}>{cells}</tr>
        })

        return (
            <div>
                <table style={{'border': '1'}}>
                    <thead>
                    <tr>
                        <th>Колонка 1</th>
                        <th>Колонка 2</th>
                        <th>Колонка 3</th>
                        <th>Колонка 4</th>
                    </tr>
                    </thead>
                    <tbody>
                        {content}
                    </tbody>
                </table>
            </div>
        )
    }
}