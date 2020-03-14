/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Popup,Icon } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        const data = Object.assign([], props.skillData)

        this.state={
            index:null,
            skillsArray:data,
            display:'none',
            newSkill:{name:'',level:''},
            showEdit:false
        }

        this.openAddDisplay=this.openAddDisplay.bind(this)
        this.closeAddDisplay=this.closeAddDisplay.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.saveContact=this.saveContact.bind(this)
        this.updateLanguage=this.updateLanguage.bind(this)
    }


    handleChange(event) {

       const data=Object.assign({},this.state.newSkill)      
       data[event.target.name]=event.target.value
          this.setState({
              newSkill:data
          })
          console.log(this.state.newSkill)}

    updateLanguage(){
        let data=this.props.skillData
        data[this.state.index]=this.state.newSkill
        this.props.updateProfileData(data)
    }

    saveContact() {
        const data=Object.assign({}, this.state.newSkill)
        console.log(data)
        const skill=this.props.skillData
        skill.push(data)
        let add={skills:skill}
        this.props.updateProfileData(add)
        this.resetInput()
    }

    resetInput() {
        this.setState( {newSkill:{name:'', level:''}} )
      }

    deleteSkill(index){

        let data=this.props.skillData
        console.log(data)
        let removed = data.splice(index, 1)
        console.log("Removed element: "+removed)

        this.props.updateProfileData(data)
    }

    openAddDisplay(){
        this.setState({
            display:'block'
        })
    }

    closeAddDisplay(){
        this.setState({
            display:'none'
        })
    }

    updateSection(index){

        let skillLevels =[] 
        let levels = ['Beginner', 'Intermediate' ,'Expert'];
        skillLevels = levels.map((x) => <option key={x} value={x}>{x}</option>);
        const {name, level}=this.state.newSkill;

        return(
    <tr>
            <td>
                <input type="text" 
                    value={name} 
                    onChange={this.handleChange}
                    placeholder="Add Skill" 
                    name="name"/>     
            </td>
            <td>
                <select className="ui right labeled dropdown"
                    placeholder="skill level"
                    value={level}
                    onChange={this.handleChange}
                    name="level">

                    <option value="">Skill level</option>
                    {skillLevels}
                </select>
            </td>

            <td>
                <button type="button" className="ui inverted primary button" onClick={()=>this.updateLanguage(index)}>Update</button>
                <button type="button" className="ui inverted secondary button" onClick={()=>this.setState({showEdit:false})}>Cancel</button>
            </td>
    </tr>

        )
    }

    render(){

        return(

            this.renderSkillTable()

        )
    }


    renderSkillTable(){

        let skillLevels =[] 
        let levels = ['Beginner', 'Intermediate' ,'Expert'];
        let skills=[]
        
        //const{language}=this.props.languageData

       //const{language,languageLevel}=this.state;
       
       skillLevels = levels.map((x) => <option key={x} value={x}>{x}</option>);
       skills=  this.props.skillData.map((skill,index)=>
       <tr key={index}>
                <td>{skill.name}</td>
                <td>{skill.level}</td>
                <td style={{textAlign:'right'}}>
                    <Icon onClick={()=> this.deleteSkill(index)} name='close'/>
                    <Icon onClick={()=> this.setState({showEdit:true, newSkill:skill, index:index})} name='pencil'/>
                </td>
   
        </tr>
        
        )
        return ( 
            <React.Fragment>
            <div className='ui four wide column'  style={{display: this.state.display}} >
            <input type="text" 
                   value={this.state.newSkill.skill} 
                   onChange={this.handleChange}
                   placeholder="Add Skill" 
                   name="name"/>
                   
           </div>
           <div className='ui four wide column'  style={{display: this.state.display}}>
            <select className="ui right labeled dropdown"
                placeholder="language level"
                value={this.state.newSkill.experienceLevel}
                onChange={this.handleChange}
                name="level">

                <option value="">Skill level</option>
                {skillLevels}
            </select>
            </div>

            <div className='ui four wide column'  style={{display: this.state.display}}>
                    <button type="button" className="ui teal button" onClick={this.saveContact}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAddDisplay}>Cancel</button>
                </div>
           
        <table className="ui single line table" style={{margin:'7px'}}>
                <thead className="">
                    <th className="">Skill</th>
                    <th className="">Level</th>
                    <th className=""><button type="button" className="ui right floated teal button" onClick={this.openAddDisplay}><Icon name='plus' />Add New</button></th>
                </thead>
                <tbody className="">
                    {this.state.showEdit?this.updateSection():''}
                    {skills}     
                </tbody>
        </table>
        </React.Fragment>

    )

        

}

}