import React, { useEffect, useState, useRef } from 'react';

import "../styles/ReactQuill.scss"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import JoditEditor from "jodit-react";
import canvasState from "../store/canvasState";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useParams } from "react-router-dom"
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { v4 as uuidv4 } from 'uuid';
// в‡Ё '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { render } from "react-dom";
import AceEditor from "react-ace";
import axios from 'axios'

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Delta from 'quill-delta';


import { withRouter } from "react-router";

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editorHtml: '<p>Сисястый цветочный лох</p>', mountedEditor: false, user_id: uuidv4() }
        this.quillRef = null;
        this.socket = new WebSocket(`ws://localhost:5000/`);
        //this.socket=new WebSocket(`ws://25.42.86.134:5000/`);
        this.reactQuillRef = null;
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.attachQuillRefs = this.attachQuillRefs.bind(this);
    }
    
    componentDidMount() {
        const { match } = this.props
        this.attachQuillRefs()
        this.listner()
        // axios.get(`http://25.42.86.134:5000/html?id=${"ochko"}`)
        // .then(response => {
        //     //this.quillRef.setText(response.data)
        //    // console.log("data  " , response.data)
        //     this.setState({ editorHtml: response.data });
        // })
        axios.get(`http://localhost:5000/html?id=${match.params.id}`)
        .then(response => {
            //this.quillRef.setText(response.data)
           // console.log("data  " , response.data)
            this.setState({ editorHtml: response.data });
        })

    }

    componentDidUpdate() {
        this.attachQuillRefs()
        //axios.get(`http://25.42.86.134:5000/html?id=${"ochko"}`)
        //.then(response => {
               //this.quillRef.setText(response.data)
        //    // console.log("data  ",response.data)
         //   this.setState({ editorHtml: response.data });  
        //})
    }

    attachQuillRefs() {
        // Ensure React-Quill reference is available:
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        // Skip if Quill reference is defined:
        if (this.quillRef != null) return;

        const quillRef = this.reactQuillRef.getEditor();
        if (quillRef != null) this.quillRef = quillRef;
    }

    handleClick() {
        // var range = this.quillRef.getSelection();
        // console.log(range);
        // let position = range ? range.index : 0;
        // console.log(`position:${position}`);
        // this.quillRef.insertText(position, '\n')
        this.setState({ editorHtml: "<p>чмо</p>" });
    }

    handleChange(html) {
        const { match } = this.props
       //axios.post(`http://25.42.86.134:5000/html?id=${"ochko"}`, { txt: html})
        axios.post(`http://localhost:5000/html?id=${match.params.id}`, { txt: html})
            .then(response => console.log(response.data))

        //axios.post(`http://localhost:5000/html?id=${"ochko"}`, { txt: html})
        //    .then(response => console.log(response.data))
        //this.setState({ editorHtml: html });
        // this.socket.send(JSON.stringify({
        //     method: 'write',
        //     user_id: this.state.user_id,
        //     text: html
        // }))
    }


    keydown = (event) => {
        {
            
            
            var range = this.quillRef.getSelection();
            console.log("range:::", range)
            let position = range ? range.index : 0;
            let length = range ? range.length : 0;
            console.log("input_Lenght+++++", length)
            if (event.ctrlKey && (event.keyCode == 86)) {

                navigator.clipboard.readText().then(text => {
                    this.socket.send(JSON.stringify({
                        method: 'write',
                        action: "add",
                        user_id: this.state.user_id,
                        text,
                        position,
                        length,
                        format: this.quillRef.getFormat()
                    }))

                })

            }
            else if (event.keyCode == 8)
                this.socket.send(JSON.stringify({
                    method: 'write',
                    action: 'delete',
                    user_id: this.state.user_id,
                    text: '',
                    position,
                    length,
                    format: this.quillRef.getFormat()
                }))
            else if (event.keyCode == 13)
                this.socket.send(JSON.stringify({
                    method: 'write',
                    action: "add",
                    user_id: this.state.user_id,
                    text: '\n',
                    position,
                    length,
                    format: this.quillRef.getFormat()
                }))
            else
                this.socket.send(JSON.stringify({
                    method: 'write',
                    action: "add",
                    user_id: this.state.user_id,
                    text: event.key,
                    position,
                    length,
                    format: this.quillRef.getFormat()
                }))
        }
    }



    listner = () => {
        this.socket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            switch (msg.method) {
                case "connection":
                    console.log(`РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ ${msg.username} РїСЂРёСЃРѕРµРґРёРЅРёР»СЃСЏ`)
                    break
                case "write":

                    if (msg.user_id != this.state.user_id) {
                        console.log("lenght-----", msg.length)
                        /* setContent(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(msg.text).contentBlocks)))} */
                        //this.setState({editorHtml:msg.text})
                        if (msg.length < 1) {
                    
                            if (msg.action == "delete") { this.quillRef.deleteText(msg.position-1, 1); }
                            else this.quillRef.insertText(msg.position, msg.text, msg.format)
                        }
                        else {
                            if (msg.action == "delete") {
                                this.quillRef.updateContents(new Delta()
                                    .retain(msg.position)                  // Keep 'Hello '
                                    .delete(msg.length)
                                   // .insert(msg.text)                 // 'World' is deleted
                                );
                            }
                            else {
                                this.quillRef.updateContents(new Delta()
                                    .retain(msg.position)                  // Keep 'Hello '
                                    .delete(msg.length)                  // 'World' is deleted
                                    .insert(msg.text)
                                    // .retain(1, { bold: true })  // Apply bold to exclamation mark
                                );
                            }
                        }
                    }
                    break
            }
        }
    }


    render() {
        console.log("Render", this.state.editorHtml)
        return (
            <div className="ReactQuill">
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    //value={this.state.editorHtml}
                    value={this.state.editorHtml}
                    onChange={this.handleChange}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    onKeyDown={this.keydown}
                    //defaultValue={this.state.editorHtml}
                    placeholder={this.props.placeholder} />
                <button onClick={this.handleClick}>Insert Text</button>
            </div>
        )
    }
}
export default withRouter(Editor);