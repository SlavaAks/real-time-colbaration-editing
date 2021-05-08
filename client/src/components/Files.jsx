import React from 'react';
import axios from 'axios'
import { withRouter } from "react-router";

class Files extends React.Component {
    state = { files: [] }
    componentDidMount() {
        axios.get(`http://localhost:5000/all_files`)
            .then(response => {
                this.setState({ files: response.data.files })
            })
    }


    handleClickFile = (file) => {
        const { history } = this.props
        const [uuid, format] = file.split('.')
        switch (format) {
            case "jpg":
                history.push(`/paint/${uuid}`);
                break;

            case "txt":
                history.push(`/word/${uuid}`)
                break;
        }
    }

    render() {
        const { files } = this.state
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>file_name</th>
                        <th>type</th>
                        <th>Size</th>

                    </tr>
                </thead>
                <tbody>
                    {files.map(file => {
                        const [uuid, format] = file.split('.')
                        return (
                            <tr >
                                <td onClick={() => this.handleClickFile(file)}>{uuid} </td>
                                <td>{format}</td>
                                <td>{ }</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        )
    }
}

export default withRouter(Files);