import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class SelfIntroduction extends React.Component {

    constructor(props) {
        super(props);

         const desc = props.description ?
         Object.assign(props.description)
           : ''
         const sum=props.summary?
         Object.assign( props.summary)
         : ''
        
        // console.log(props.summary+desc)
        this.state = {
                description:desc,
                characters: 0,
                summary:sum,
                showEditSection: false

        };

        this.update = this.update.bind(this);
        this.saveDescription=this.saveDescription.bind(this)
        this.closeEdit=this.closeEdit.bind(this)
        this.openEdit=this.openEdit.bind(this)
    };

    update(event) {   
        const data =Object.assign(this.state);
        data[event.target.name] = event.target.value;
        let desc = event.target.value;
        this.setState({
            description:data.description,
            summary:data.summary,
            characters: desc.length
        })
        
        console.log(this.state)
    }

    saveDescription(){
        const data=Object.assign(this.state)
        this.props.saveProfileData(data)
        this.closeEdit()
    }
    
    openEdit() {
        console.log(this.props.details)
        const details = Object.assign({}, this.props.details)
        let desc=details.description
        let sum=details.summary
        console.log(details)
        
        this.setState({
            showEditSection: true,
            description: desc,
            summary:sum
        })
        
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    
    renderEdit() {
        const maxCharacterLimit = 600;
        const minCharacterLimit=150;
        let charactersForDesc = this.state.description ? this.state.description.length : 0;
        let charactersForSum=this.state.summary?this.state.summary.length:0

        return (
            <React.Fragment style>
                <div className="sixteen wide column">

                    <ChildSingleInput
                        inputType="text"
                        name="summary"
                        value={this.state.summary}
                        controlFunc={this.update}
                        maxLength={150}
                        placeholder="Please provide a short summary about yourself"
                        errorMessage="Please enter no more than 150 character first name"
                    />
                    <p>Characters remaining : {minCharacterLimit-charactersForSum} / {minCharacterLimit}</p>
                    <p>Summary must be no more than 150 characters.</p>  

                    <div className="field" >
                        <textarea maxLength={maxCharacterLimit} minLength={minCharacterLimit} name="description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={this.state.description} onChange={this.update} ></textarea>
                    </div>
                    <p>Description must be between 150-600 characters.</p>
                    <p>Characters remaining : {maxCharacterLimit-charactersForDesc} / {maxCharacterLimit}</p>

                    <button type="button" className="ui right floated teal button" onClick={this.closeEdit}>Cancel</button>
                    <button type="button" className="ui right floated teal button" onClick={this.saveDescription}>Save</button>
                   
                </div>
            </React.Fragment>
            
        )
    
    }

    renderDisplay(){
        let description = this.props.details ? `${this.props.details.description} ` : ""
        let summary = this.props.details ? `${this.props.details.summary}` : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Summary: {summary}</p>
                        <p>Description: {description}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}
    
