/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup,Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: "",
            }

        this.state = {
                showEditSection: false,
                newAccount: linkedAccounts
            }

            this.openEdit = this.openEdit.bind(this)
            this.closeEdit = this.closeEdit.bind(this)
            this.handleChange = this.handleChange.bind(this)
            this.saveContact = this.saveContact.bind(this)
            this.renderEdit = this.renderEdit.bind(this)        

    }


    
    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openEdit() {
        console.log("click edit")
        const details = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newAccount: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.newAccount)
        data[event.target.name] = event.target.value
        this.setState({
            newAccount: data
        })
    }


    saveContact() {
        //console.log(this.props.componentId)
        console.log(this.state.newAccount)
        const data = Object.assign({}, this.state.newAccount)
        const add={linkedAccounts:data}
        console.log("ADD "+add)
        console.log(data)
        this.props.saveProfileData(add)
        this.closeEdit()
    }


    render() {
        return (
                    this.state.showEditSection ? this.renderEdit() : this.renderDisplay())
    }

    renderDisplay(){
        const btnStyle1={
            width:'170px',
            marginRight:'15px'
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <button className="ui primary  button" style={btnStyle1}  id="LinkedinBtn"><Icon name='linkedin' />Linkedln</button>
                        <button className="ui secondary  button" style={btnStyle1}  id="GitHubBtn"><Icon name='github' />GitHub</button>
                        <button type="button"  className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                    </React.Fragment>
                </div>
            </div>
        )

    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.props.linkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={120}
                    placeholder="Please enter LinkedIn Url"
                    errorMessage="Please enter a valid LinkedIn Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.props.linkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={120}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid GitHub Url"
                />

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
            )
}

}