import React, {Component} from 'react';
import './GalleryEvent.css';



export default class MyImageViewer extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
        item:'',
  currentImage:0,
  image:[],

       }
    

this.plus=this.plus.bind(this);
this.minous=this.minous.bind(this);


    }
    image=[];
    currentImage=0;
    componentDidMount(){
        console.log(this.props.currentIndex)
      this.setState({currentImage:this.props.currentIndex})
      this.setState({image:this.props.images})
      this.props.images.map((item,index)=>{
          this.image.push(item);
      })

    }
    plus(){
        this.setState({currentImage:this.state.currentImage+1})

    }
    minous(){
        this.setState({currentImage:this.state.currentImage-1})

    }

      render() {
      
    return (
      
    <div  className='image-viewer'>
       <button  className='image-viewer-exit' onClick={this.props.onClose} ><span class="iconify" data-icon="bx:bx-x" ></span></button>
    <p className='image-viewer-title'>{this.props.date}</p>

       <img  className='img-view' src={this.image[this.state.currentImage]} />
{this.state.currentImage<this.image.length-1?<button className='next' onClick={this.plus} ><span class="iconify" data-icon="grommet-icons:form-next-link"></span></button>:''}
{this.state.currentImage!=0?<button  className='prev' onClick={this.minous}><span class="iconify" data-icon="grommet-icons:form-previous-link"></span></button>:''}

    </div>

    );
  }
}
