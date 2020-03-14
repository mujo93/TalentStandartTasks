/* Language section */
import React from 'react';
import { Popup,Icon } from 'semantic-ui-react';
import Cookies from 'js-cookie';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const data = Object.assign([], props.languageData)

        this.state={
            index:null,
            languagesArray:data,
            display:'none',
            newLanguage:{name:'',level:''},
            showEdit:false
        }

        this.openAddDisplay=this.openAddDisplay.bind(this)
        this.closeAddDisplay=this.closeAddDisplay.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.saveContact=this.saveContact.bind(this)
        this.updateLanguage=this.updateLanguage.bind(this)
    }


    handleChange(event) {

       const data=Object.assign({},this.state.newLanguage)      
       data[event.target.name]=event.target.value
          this.setState({
              newLanguage:data
          })
          console.log(this.state.newLanguage)}

    updateLanguage(){
        let data=this.props.languageData
        data[this.state.index]=this.state.newLanguage
        this.props.updateProfileData(data)
    }

    saveContact() {
        const data=Object.assign({}, this.state.newLanguage)
        console.log(data)
        const lang=this.props.languageData
        lang.push(data)
        let add={languages:lang}
        this.props.updateProfileData(add)
        this.resetInput()
    }

    resetInput() {
        this.setState( {newLanguage:{name:'', level:''}} )
      }

    deleteLanguage(index){
        console.log('index: '+index)
        console.log('delete is clicked.')
        let data=this.props.languageData
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
        console.log('close')
        this.setState({
            display:'none'
        })
    }

updateSection(index){

        let languageLevels =[] 
        let levels = ['Basic','Conversational','Fluent','Native/Bilingual'];
        languageLevels = levels.map((x) => <option key={x} value={x}>{x}</option>);
        const {name, level}=this.state.newLanguage;

        return(
    <tr>
            <td>
                <input type="text" 
                    value={name} 
                    onChange={this.handleChange}
                    placeholder="Add Language" 
                    name="name"/>     
            </td>
            <td>
                <select className="ui right labeled dropdown"
                    placeholder="language level"
                    value={level}
                    onChange={this.handleChange}
                    name="level">

                    <option value="">Language level</option>
                    {languageLevels}
                </select>
            </td>

            <td>
                <button type="button" className="ui inverted primary button" onClick={()=>this.updateLanguage(index)}>Update</button>
                <button type="button" className="ui inverted secondary button" onClick={()=>this.setState({showEdit:false})}>Cancel</button>
            </td>
    </tr>

        )
    }

    render() {
        return ( 
                 this.renderLanguageTable()
            )
    }

    renderLanguageTable(){

        let languageLevels =[] 
        let levels = ['Basic','Conversational','Fluent','Native/Bilingual'];
        let knownLanguages=[]
        
        const{language}=this.props.languageData

       const{name,level}=this.state;
       
       languageLevels = levels.map((x) => <option key={x} value={x}>{x}</option>);
       knownLanguages=  this.props.languageData.map((lang,index)=>
       <tr key={index}>
                <td>{lang.name}</td>
                <td>{lang.level}</td>
                <td style={{textAlign:'right'}}>
                    <Icon onClick={()=> this.deleteLanguage(index)} name='close'/>
                    <Icon onClick={()=> this.setState({showEdit:true, newLanguage:lang, index:index})} name='pencil'/>
                </td>
   
        </tr>
        
        )
        return ( 
            <React.Fragment>
            <div className='ui four wide column'  style={{display: this.state.display}} >
            <input type="text" 
                   value={this.state.newLanguage.name} 
                   onChange={this.handleChange}
                   placeholder="Add Language" 
                   name="name"/>
                   
           </div>
           <div className='ui four wide column'  style={{display: this.state.display}}>
            <select className="ui right labeled dropdown"
                placeholder="language level"
                value={this.state.newLanguage.level}
                onChange={this.handleChange}
                name="level">

                <option value="">Language level</option>
                {languageLevels}
            </select>
            </div>

            <div className='ui four wide column'  style={{display: this.state.display}}>
                    <button type="button" className="ui teal button" onClick={this.saveContact}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAddDisplay}>Cancel</button>
                </div>
           
        <table className="ui single line table" style={{margin:'7px'}}>
                <thead className="">
                    <th className="">Language</th>
                    <th className="">Level</th>
                    <th className=""><button type="button" className="ui right floated teal button" onClick={this.openAddDisplay}><Icon name='plus' />Add New</button></th>
                </thead>
                <tbody className="">
                    {this.state.showEdit?this.updateSection():''}
                    {knownLanguages}     
                </tbody>
        </table>
        </React.Fragment>

    )
    }
}
