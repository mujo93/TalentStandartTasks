/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Divider } from 'semantic-ui-react';
//import React from 'react';


export default class PhotoUpload extends Component {

    constructor(props) {
        super(props)

        const name = props.name ?
        Object.assign(props.name)
        : ''
        this.state = {
            id:name,
            selectedFile: '',
            imageSrc:null
        }
        this.loadImages = this.loadImages.bind(this);
        this.selectFileToUpload = this.selectFileToUpload.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.maxFileSize = 2097152;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

        
    }

    componentDidMount(){
        this.loadImages(this.state.id)
    }

    loadImages(Id) {

        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'http://localhost:60290/profile/profile/getProfileImage/?id=' + Id,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {

                    let source=""

                if (res.profileUrl) {
                    
                        source=res.profileUrl
                        console.log(source)
                }

                this.setState({
                    imageSrc: source,

                });

                console.log(this.state.imageSrc)
            }.bind(this)
        });
    }

    selectFileToUpload() {
        document.getElementById('file').click();
    }

     fileSelectedHandler (event) {
        if (event.target.files[0].size > this.maxFileSize || this.acceptedFileType.indexOf(event.target.files[0].type) == -1) 
            {
                
                 TalentUtil.notification.show("Max file size is 2 MB and supported file types are *.jpg, *.jpeg, *.png, *.gif", "error", null, null);
            } 
        
        else
            {
                this.setState({
                        selectedFile:event.target.files[0],
                        imageSrc:window.URL.createObjectURL(event.target.files[0])
                })
            }
    }


    fileUploadHandler() {

            let file = new FormData();
            console.log(this.state.selectedFile)
            if (this.state.selectedFile != "") {
                file.append("file", this.state.selectedFile);
                console.log(Array.from(file))
            }

            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url:'http://localhost:60290/profile/profile/updateProfilePhoto',
                headers: {
                    'Authorization': 'Bearer ' + cookies,

                },
                type: "POST",
                data: file,
                cache: false,
                processData: false,
                contentType: false,
                dataType:"JSON",
                success: function (res) {
                    if (res.success) {
                        TalentUtil.notification.show(res.message, "success", null, null);
                        console.log("SUCCEESSSSS")
                        //this.loadImages(Id);
                        console.log(res)
                    } else {
                        TalentUtil.notification.show(res.message, "error", null, null);
                    }
                }.bind(this),
                error: function (res, status, error) {
                    //Display error
                    console.log(res)
                    console.log(status)
                    console.log(error)
                    TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
                }
            });


        }


    render() {
        let showProfileImg ='';
        //let empty=''
            
            if (/*empty*/this.state.imageSrc == null) {
                showProfileImg=<span><img style={{ height: 112, width: 112, borderRadius: 55 }} 
                className="ui small" src={this.state.imageSrc} onClick={this.selectFileToUpload} alt="Image Not Found" /></span>;        
            }
            
            else{
            showProfileImg=<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>
            }
            
            let uploadButton=<button type="button" className="ui teal button" onClick={this.fileUploadHandler}> <i className="upload icon"></i>Upload</button>


        return (
            <div className="row">
                <div className="four wide column">
                </div>
                <div className="twelve wide column">
                    <section>
                        <div>
                                {showProfileImg}
                                
                            <input id="file"  type="file" style={{ display: 'none' }} onChange={this.fileSelectedHandler} accept="image/*" />
                            <br/>
                            <br/>
                            {this.state.imageSrc? uploadButton:''}
            
                        </div>
                    </section>
                </div>
            </div>
        )
    }

}

