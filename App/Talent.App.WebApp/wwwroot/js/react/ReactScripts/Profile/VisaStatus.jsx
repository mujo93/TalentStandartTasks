import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)


        const visaStus = props.visaStatus ?
            Object.assign(props.visaStatus)
            : {
                visaStatus: '',
            }
        const visaExpiry=props.visaExpiryDate?
            Object.assign(props.visaExpiryDate)
            : {
                visaExpiryDate: '',
            }

        this.state = {
            showVisaExpiry:false,
            visaStatus:visaStus.visaStatus,
            visaExpiryDate:visaExpiry.visaExpiryDate
        }

         this.handleChange=this.handleChange.bind(this);
         this.saveContact=this.saveContact.bind(this);
       
        

    }

    handleChange(event) {
        
        const data = Object.assign(this.state)
        data[event.target.name] = event.target.value
        console.log(this.state)
        this.setState({
            visaStatus: data.visaStatus,
            visaExpiryDate:data.visaExpiryDate
        })
        
            this.props.updateProfileData(this.state);
    }
    
    
    saveContact() {
        const data = Object.assign(this.state)
        console.log(data+"DATA")
        this.props.saveProfileData(data)
    }

    render() {
            const{visaStatus,visaExpiryDate}=this.props
            let visaOptions=[]
            let visaTypes = ['Citizen','Permanent Resident','Work Visa','Student Visa']
            let expiry=''
            visaOptions = visaTypes.map((x,index) => <option key={index} value={x}>{x}</option>);

   
            if (visaStatus== "Work Visa" || visaStatus=='Student Visa' ) {

                expiry = <div className="ui six wide column">
                                    <label><strong>Expiry Date:</strong></label>
                                    <input type="date"
                                    value={visaExpiryDate.slice(0,10)}
                                    onChange={this.handleChange}
                                    placeholder="Enter expiry date"  
                                    name="visaExpiryDate"  />
                                </div>   
                                }
    
            return (
                <React.Fragment>
                <div className="ui six wide column">
                    <label><strong>Visa Status:</strong></label>
                    <select className="ui right labeled dropdown"
                            placeholder="Visa Status"
                            value={visaStatus}
                            onChange={this.handleChange}
                            name="visaStatus">
                           
                            <option value="">Select your visa status</option>
                            {visaOptions}
                        </select>
                </div>
                {expiry}
                <div className="ui two wide column">
                    <button type="button" style={{marginTop:'26%'}}className="ui teal button" onClick={this.saveContact}>Save</button>
                </div>
                </React.Fragment>
                  
            
            )
        }
    }
