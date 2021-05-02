import React, { useEffect, useState, useRef } from 'react';
import "./styles/app.scss"
import SettingBar from "./components/SettingBar";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import Header from "./components/Header";
import Files from "./components/Files";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import JoditEditor from "jodit-react";
//import { Editor } from "react-draft-wysiwyg";
import Editor from "./components/Editor";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';





const App = () => {
    const [user_id, setId] = useState(uuidv4())
    // const [socket, setSocket] = useState(new WebSocket(`ws://25.42.86.134:5000/`))
    const [socket, setSocket] = useState(new WebSocket(`ws://localhost:5000/`))
    const editor = useRef(null)
    // const [content, setContent] = useState(EditorState.createEmpty())
    const [content, setContent] = useState('')
    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    // const [quillRef, setQuillRef] = useState(null)
    // const [reactQuillRef, setReactQuillRef] = useState(null)

    // useEffect(() => {
    //     // if (typeof(reactQuillRef.getEditor) !== 'function') return;
    //     // Skip if Quill reference is defined:
    //     if (quillRef != null) return;

    //     setQuillRef(reactQuillRef.getEditor())
    //     if (quillRef != null) setQuillRef(quillRef);
    // })



    // const handleClick=() =>{
    //     var range = quillRef.getSelection();
    //     console.log(range);
    //     let position = range ? range.index : 0;
    //     quillRef.insertText(position, '\n')
    // }
    Editor.modules = {}
    Editor.modules.toolbar = [
        ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
        ['blockquote', 'code-block'],                    // blocks
        [{ 'header': 1 }, { 'header': 2 }],              // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // lists
        [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
        [{ 'direction': 'rtl' }],                        // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
        [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
        [{ 'font': [] }],                                // font family
        [{ 'align': [] }],                               // text align
        ['clean'],                                       // remove formatting
    ]

    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    Editor.formats = [
        'header', 'font', 'background', 'color', 'code', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'script', 'align', 'direction',
        'link', 'image', 'code-block', 'formula', 'video'
    ]




    // Editor.propTypes = {
    //     placeholder: React.PropTypes.string,
    // }

    // useEffect(() => {
    //     socket.onmessage = (event) => {
    //         let msg = JSON.parse(event.data)
    //         switch (msg.method) {
    //             case "connection":
    //                 console.log(`пользователь ${msg.username} присоединился`)
    //                 break
    //             case "write":
    //                 console.log(msg.user_id);
    //                 if (msg.user_id != user_id) {
    //                     /* setContent(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(msg.text).contentBlocks)))} */
    //                     setContent(msg.text)
    //                 }
    //                 break
    //         }
    //     }
    // })
    return (
        <>

            <Router>
                <Header />
                <Switch>

                    <Route path='/paint/:id'>
                        <Toolbar />
                        <SettingBar />
                        <Canvas />
                    </Route>
                    <Route path='/word/:id'>
                        <Editor />
                    </Route>
                    <Route path='/'>
                        <Files/>
                    </Route>
                    <Redirect to={`f${(+new Date).toString(16)}`} />
                </Switch>
            </Router>
        </>
    );
};

export default App;














































{/* <ReactQuill
                            ref={(el) => { setReactQuillRef(el); }}
                            theme={'snow'}
                            onChange={setContent}
                            modules={Editor.modules}
                            formats={Editor.formats}
                        // defaultValue={this.state.editorHtml}
                        // placeholder={this.props.placeholder}
                        /> */}






































































































































































































































































































{/* {/* <JoditEditor
                            ref={editor}
                            value={content} 
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => { setContent(newContent);
                                socket.send(JSON.stringify({
                                    method: 'write',
                                    text: newContent
                                }))         }}  // preferred to use only this option to update the content for performance reasons
                            onChange={
                                newContent => {
                                    setContent(newContent); 
                                    console.log(editor.current)
                                    socket.send(JSON.stringify({
                                        method: 'write',
                                        text: newContent
                                    }))  
                                }}
                        /> 
                        <Editor
                            editorState={content}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={newCont => {
                                console.log(content);
                                setContent(newCont);
                                socket.send(JSON.stringify({
                                    method: 'write',
                                    user_id,
                                    text: draftToHtml(convertToRaw(newCont.getCurrentContent()))
                                }))  
                            }
                        }
                        /> 
                        <AceEditor
                            mode="java"
                            theme="github"
                            value={content}
                            onChange={newCont => {
                                console.log(content);
                                setContent(newCont);
                                socket.send(JSON.stringify({
                                    method: 'write',
                                    user_id,
                                    text: content
                                    }))
                                }
                            }
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{ $blockScrolling: true }}
                        />  */}