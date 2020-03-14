import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';

import { ChildSingleInput } from '../Form/SingleInput.jsx';


export class Address extends React.Component {
    constructor(props) {
        super(props);
        const address = props.addressData ?
        Object.assign({}, props.addressData)
        : {
            number:"",
            street:"",
            suburb:"",
            country:"",
            city:"",
            postCode:""
        }

        this.state={
            showEditSection:false,
            newAddress: address
        }

        this.handleChange=this.handleChange.bind(this);
        this.openEdit=this.openEdit.bind(this);
        this.closeEdit=this.closeEdit.bind(this);
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }
    openEdit() {
        console.log(this.props.addressData)
        const address = Object.assign({}, this.props.addressData)
        console.log(address)
        
        this.setState({
            showEditSection: true,
            newAddress: address
        })
        console.log(this.state)
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
        console.log(this.state.newAddress)
    }


    saveContact() {
        console.log(this.state.newAddress)
        const data = Object.assign({}, this.state.newAddress)
        //creating a variable to be able to manipulate nested state 
        const add={address:data}
        this.props.saveProfileData(add)
        this.closeEdit()
    }

  
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    
    renderEdit() {
     
         let countriesOptions = [];
         let citiesOptions = [];

        const{number,street,suburb,country,city,postCode}=this.state.newAddress;
        
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (country != "" && country != null ) {
           
            var popCities = Countries[country].map(x => <option key={x} value={x}> {x}</option>);
           
        }

        return(
            <React.Fragment>
                
                <div className='ui four wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Number"
                    name="number"
                    value={number}
                    controlFunc={this.handleChange}
                    maxLength={120}
                    placeholder="Please enter a name"
                    errorMessage="Please enter a valid number"
                />
                </div>

                <div className='ui eight wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Street"
                    name="street"
                    value={street}
                    controlFunc={this.handleChange}
                    maxLength={120}
                    placeholder="Please enter a name"
                    errorMessage="Please enter a valid Street"
                />
                </div>

                <div className='ui four wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Suburb"
                    name="suburb"
                    value={suburb}
                    controlFunc={this.handleChange}
                    maxLength={120}
                    placeholder="Please enter a suburb name"
                    errorMessage="Please enter a valid suburb name"
                />
                </div>
                <div className="ui six wide column">
                    <label>Country:</label>
                    <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={country}
                            onChange={this.handleChange}
                            name="country">

                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>
                </div>

                <div className="ui six wide column">
                    <label>City:</label>
                    <select
                        className="ui dropdown"
                        placeholder="City"
                        value={city}
                        onChange={this.handleChange}
                        name="city">
                        <option value="0"> Select a town or city</option>
                        {popCities}
                    </select>
                </div>

                <div className='ui four wide column'>
                <ChildSingleInput
                    inputType="number"
                    label="Post Code"
                    name="postCode"
                    value={postCode}
                    controlFunc={this.handleChange}
                    maxLength={120}
                    placeholder="Please enter a Post Code"
                    errorMessage="Please enter a valid Post Cpde"
                />
                </div>
                <div className='ui twelve wide column'>
                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>

                </React.Fragment>
        
        )
        }

    renderDisplay(){
        const{number,street,suburb,country,city,postCode}=this.props.addressData;
            
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                    <p>Address: {`${number}, ${street}, ${suburb}, ${postCode}`}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )

    }

    }


export class Nationality extends React.Component {
    constructor(props) {
        super(props)


        const ntnality = props.nationalityData ?
            Object.assign(props.nationalityData)
            : {
                nationality: '',
            }

        this.state = {
            nationality:ntnality.nationality,
        }

         this.handleChange=this.handleChange.bind(this);
       
    }

    handleChange(event) {
        
        const data = Object.assign(this.state)
        data[event.target.name] = event.target.value
       
        this.setState({
            nationality: data.nationality,
        })
        console.log(this.state)
            this.props.saveProfileData(this.state);
    }

    render() {

        let countriesOptions = [];

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        return (
            <div className="ui six wide column">
            <select className="ui right labeled dropdown"
                    placeholder="nationality"
                    value={this.props.nationalityData}
                    onChange={this.handleChange}
                    name="nationality">

                    <option value=''>Select your nationality</option>
                    {countriesOptions}
                </select>
        </div>)
    }
}