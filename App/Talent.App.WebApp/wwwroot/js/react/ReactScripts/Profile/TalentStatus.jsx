import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const data = props.status?
        Object.assign(props.status)
        :{
            
            status: "",
            availableDate: null
          }

        this.state={
            jobSeekingStatus:data,
        }
       this.handleChange=this.handleChange.bind(this)
       this.handleOptionChange=this.handleOptionChange.bind(this)
    }

    
    handleOptionChange (changeEvent) {
        console.log(changeEvent.target.name)
        let data=Object.assign(this.state.jobSeekingStatus)
        data[changeEvent.target.name]=changeEvent.target.value
        console.log(data)
        this.setState({
            jobSeekingStatus: data
        });

        console.log("Status State: "+this.state.jobSeekingStatus.status)
        console.log("Status State: "+this.state.jobSeekingStatus.availableDate)

        this.props.saveProfileData(this.state)
    }

    handleChange(event) {
        console.log(this.state)
        const data=Object.assign({},this.state.jobSeekingStatus)    
        data[event.target.name]=event.target.value
           this.setState({
                jobSeekingStatus:data
           })
           
        }

    render() {
        return (
         
        <div className="ui sixteen wide column" >
            <input type="radio" id="1" name="status" value="Actively looking for a job" 
                            checked={this.props.status.status==="Actively looking for a job"}
                            onChange={this.handleOptionChange}
                           />Actively looking for a job
            <br/>
            <br/>
            <input type="radio" id="2" name="status" value="Not looking for a job at the moment" 
                            checked={this.props.status.status==="Not looking for a job at the moment"}
                            onChange={this.handleOptionChange}
                            />Not looking for a job at the moment
            <br/>
            <br/>
            <input type="radio" id="3" name="status" value="Currently employed but open to offers" 
                            checked={this.props.status.status==="Currently employed but open to offers"}
                            onChange={this.handleOptionChange}
                            />Currently employed but open to offers
            <br/>
            <br/>
            <input type="radio" id="4" name="status" value="Will be available on later date" 
                            checked={this.props.status.status==="Will be available on later date"}
                            onChange={this.handleOptionChange}
                            />Will be available on later date
        </div>
            )
    }
}