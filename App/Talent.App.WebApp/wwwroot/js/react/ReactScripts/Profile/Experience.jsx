/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Popup,Icon } from 'semantic-ui-react';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        const data = Object.assign([], props.experienceData)

        this.state={
            index:null,
            experiencesArray:data,
            newExperience:{company:'',position:'',start:null,end:null,responsibilities:''},
            showEdit:false,
            showAdd:false
        }
        
        this.handleChange=this.handleChange.bind(this)
        this.saveContact=this.saveContact.bind(this)
        this.updateLanguage=this.updateLanguage.bind(this)
    }


    handleChange(event) {

       const data=Object.assign({},this.state.newExperience)      
       data[event.target.name]=event.target.value
          this.setState({
            newExperience:data
          })
          console.log(this.state.newExperience)}

    updateLanguage(){
        let data=this.props.experienceData
        data[this.state.index]=this.state.newExperience
        this.props.updateProfileData(data)
    }

    saveContact() {
        const data=Object.assign({}, this.state.newExperience)
        console.log(data)
        const experience=this.props.experienceData
        experience.push(data)
        let add={experience:experience}
        this.props.updateProfileData(add)
        this.resetInput()
    }

    resetInput() {
        this.setState( {newExperience:{company:'',
                                       position:'',
                                       start:null,
                                       end:null,
                                       responsibilities:''}} )
      }

    deleteSkill(index){

        let data=this.props.experienceData
        console.log(data)
        let removed = data.splice(index, 1)
        console.log("Removed element: "+removed)

        this.props.updateProfileData(data)
        this.setState({showEdit:false})
    }

    

    
    render() { 
        return(
            this.renderExperienceTable())}


renderExperienceTable(){
    let experiences=  this.props.experienceData.map((experience,index)=>
    <tr key={index}>
             <td>{experience.company}</td>
             <td>{experience.position}</td>
             <td>{experience.responsibilities}</td>
             <td>{experience.start.slice(0,10)}</td>
             <td>{experience.end.slice(0,10)}</td>
             <td style={{textAlign:'right'}}>
                 <Icon onClick={()=> this.deleteSkill(index)} name='close'/>
                 <Icon onClick={()=> this.setState({showEdit:true, newExperience:experience, index:index})} name='pencil'/>
             </td>

     </tr>
    )
  
    return ( 
        
    <React.Fragment> 
        {this.state.showAdd?this.addSection():''}
        <table className="ui single line table" style={{margin:'7px'}}>
                  <thead>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Responsibilities</th>
                    <th>Start</th>
                    <th>End</th>
                    <th><button type="button" className="ui right floated teal button" onClick={()=>this.setState({showAdd:true})}><Icon name='plus' />Add New</button></th>
                </thead>
                <tbody>
                    {this.state.showEdit?this.updateSection():''}
                    {experiences}     
                </tbody>
        </table>
    </React.Fragment>
)
}

addSection(){
    const {company,position,start,end,responsibilities}=this.state.newExperience;
return(
    <React.Fragment>
        <div className='ui eight wide column' >
        <label><strong>Company:</strong></label>
        <input type="text" 
               value={company} 
               onChange={this.handleChange}
               placeholder="Add Company" 
               name="company"/>
               
       </div>
      
        <div className='ui eight wide column'>
        <label><strong>Position:</strong></label>
        <input type="text" 
               value={position} 
               onChange={this.handleChange}
               placeholder="Add Position" 
               name="position"/> 
       </div>

       <div className='ui eight wide column'>
       <label><strong>Start Date:</strong></label>
        <input type="date"
               value={start}
               onChange={this.handleChange} 
               placeholder="Enter start date"  
               name="start"  />
        </div>

       <div className='ui eight wide column'>
       <label><strong>End Date:</strong></label>
        <input type="date"
               value={end}
               onChange={this.handleChange} 
               placeholder="Enter end date"  
               name="end"  />
        </div>
        
        <div className='ui sixteen wide column'>
        <label><strong>Responsibilities:</strong></label>
        <input type="text" 
               value={responsibilities} 
               onChange={this.handleChange}
               placeholder="Add responsibility" 
               name="responsibilities"/>      
       </div>

        <div className='ui sixteen wide column'>
            <button type="button" className="ui teal button" onClick={this.saveContact}>Add</button>
            <button type="button" className="ui button" onClick={()=>this.setState({showAdd:false})}>Cancel</button>
        </div>
    </React.Fragment>
  )
}

updateSection(index){
    const {company,position,start,end,responsibilities}=this.state.newExperience;

    return(
        
        <React.Fragment>
        <tr>
        
            <td>
            <div className='ui four wide column'>
                <label><strong>Company:</strong></label>
                <br></br>
                <input type="text" 
                    value={company} 
                    onChange={this.handleChange}
                    placeholder="Add Company" 
                    name="company"/>
            </div>
            </td>

            <td>
            <div className='ui four wide column'>
                <label><strong>Position:</strong></label>
                <br></br>
                <input type="text" 
                    value={position} 
                    onChange={this.handleChange}
                    placeholder="Add Posiition" 
                    name="position"/>
            </div>
            </td>
            
        </tr>
       
        <tr>
           <td>
                <label><strong>Start Date:</strong></label>
                <br></br>
                <input type="date"
                    value={start}
                    onChange={this.handleChange} 
                    placeholder="Enter start date"  
                    name="start"/>
            </td>
            <td>
                <label><strong>End Date:</strong></label>
                <br></br>
                <input type="date"
                    value={end}
                    onChange={this.handleChange} 
                    placeholder="Enter end date"  
                    name="end"/>
            </td>
        </tr>
      
        <tr>
            <td>
                <label><strong>Responsibilities:</strong></label>
                <br></br>
                <input type="text" 
                    value={responsibilities} 
                    onChange={this.handleChange}
                    placeholder="Add responsibility" 
                    name="responsibilities"/>
            </td>  
        </tr>
        <tr>
            <td>
                <button type="button" className="ui inverted primary button" onClick={()=>this.updateLanguage(index)}>Update</button>
                <button type="button" className="ui inverted secondary button" onClick={()=>this.setState({showEdit:false})}>Cancel</button>
            </td>
        </tr>    
        </React.Fragment>
    )
}


}