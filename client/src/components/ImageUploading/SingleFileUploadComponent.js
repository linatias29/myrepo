import React, { Component } from 'react';
import './imageUploading.css';
import getFirebase from "../../Firebase";

export default class SingleFileUploadComponent extends Component {

    constructor(props) {
        
        super(props)

        this.state = {
            file: null,
            url:null,
        }
        this.fileUpload = this.fileUpload.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        
    }
     firebase = getFirebase();

    fileUpload(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    async uploadImage(event) {
        event.preventDefault()
        if (!this.firebase) return;

        const uploadedFile = event.target.files[0];
        if (!uploadedFile) return;
    
        const storage = this.firebase.storage();
        const storageRef = storage.ref("child");
    console.log(storage)
    var metadata = {
        contentType: uploadedFile.type,
      };
        try {
          const r= await storageRef.child(uploadedFile.name).put(uploadedFile,metadata);

          console.log(r.ref)
          r.ref.getDownloadURL().then((url)=>{
            this.props.setImage(url)
            this.setState({url:url})

         });

        //   alert("Successfully uploaded picture!");
        } catch (error) {
          console.log("error", error);
        }
        console.log(this.state.file)
    }

    render() {
        let preview;
        console.log(this.state.url)
        if (this.props.url) {
            
            preview = <img className='preview' src={this.props.url} alt='' />;
        }
        return (
            <form className='image-form'>
                

                <div id='image-table' className="form-group mb-3">
                    <input type="file" onChange={this.uploadImage}  accept={'image/*'}className="form-control" />
                </div>
                {/* <button type="button" onClick={this.uploadImage} className="btn btn-danger">Upload Single File</button> */}
                <div className="form-group">
                    {preview}
                </div>
            </form >
        )
    }
}