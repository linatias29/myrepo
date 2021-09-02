import React, { Component } from 'react';
import getFirebase from "../../Firebase";
import Button from '@material-ui/core/Button';

export default class MultiFileUploadComponent extends Component {

    filesArray = [];
    FilesCollection = [];
    UrlsImage = [];


    constructor(props) {

        super(props)

        this.state = {
            file: [null]
        }
        this.multiImagePreview = this.multiImagePreview.bind(this)
        this.imagePreview = this.imagePreview.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
    }
    firebase = getFirebase();

    multiImagePreview(event) {
        this.filesArray.push(event.target.files)
        for (let i = 0; i < this.filesArray[0].length; i++) {
            this.FilesCollection.push(URL.createObjectURL(this.filesArray[0][i]))
        }
        this.setState({ file: this.FilesCollection })
    }
    async uploadImage(event) {
        event.preventDefault()
        if (!this.firebase) return;
        let count=0;
        let urlsImage=[];
        console.log(this.filesArray)
        for (let i = 0; i < this.filesArray[0].length; i++) {
        

        const uploadedFile = this.filesArray[0][i];
        if (!uploadedFile) return;
    
        const storage = this.firebase.storage();
        const storageRef = storage.ref("child");

    var metadata = {
        contentType: uploadedFile.type,
      };
        try {
            storageRef.child(uploadedFile.name).put(uploadedFile,metadata).then((res)=>{

        
          res.ref.getDownloadURL().then((url)=>{
              
              urlsImage.push(url)

              count++

              if(count==this.filesArray[0].length)
              {     this.props.addEvet(urlsImage)

                

              }

         });
        });

        //   alert("Successfully uploaded picture!");
        } catch (error) {
          console.log("error", error);
        }
    }
    }
    imagePreview(event) {
        event.preventDefault()
        console.log(this.state.file)
    }

    render() {
        return (
            <form>
               

                <div className="form-group mb-3">
                    <input type="file" accept={'image/*'} className="form-control" onChange={this.multiImagePreview} multiple />
                </div>
                <div className="form-group multi-preview">
                    {(this.FilesCollection || []).map(res => (<div>
                        <img className='preview-multi' src={res} alt="..." />
                        <hr className='img-hr' />
                        </div>
                    ))}
                </div>
                <br/>
                {/* <button onClick={this.uploadImage} className='event-add-btn'>הוספה</button> */}
               {this.FilesCollection.length!=0?(<div><Button onClick={this.uploadImage} id='Gallery-submit-event' >שליחה</Button>
        <Button onClick={this.props.close} id='Gallery-submit-event-cancel' >ביטול</Button></div>):''} 
                {/* <button type="button" className="btn btn-success" onClick={this.imagePreview}>הוספה  </button> */}
            </form >
        )
    }
}