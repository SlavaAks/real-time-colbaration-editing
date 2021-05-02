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
            <div>
                {files.map(file => { return (<div onClick={()=>this.handleClickFile(file)}>{file}</div>) })}
            </div>
        )
    }
}

export default withRouter(Files);