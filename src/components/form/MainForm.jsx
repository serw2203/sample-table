import React from 'react'
import 'fetch-ie8'
import {Col, Grid, PageHeader, Row, Table, Navbar} from 'react-bootstrap'

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
            const cells = row.map(cell => <td key={c++}>{cell}</td>)
            return <tr key={r++}>{cells}</tr>
        })

        return (
            <div>
                <PageHeader className={'bs-docs-header'}>
                    Example page header <small>Subtext for header</small>
                </PageHeader>

                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Sample-table</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>

                <Grid>
                    <Row className='show-grid'>
                        <Col xs={6} md={4}>
                                    <Table bordered={true}>
                                        <thead>
                                        <tr>
                                            <th>Column 1</th>
                                            <th>Column 2</th>
                                            <th>Column 3</th>
                                            <th>Column 4</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {content}
                                        </tbody>
                                    </Table>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}