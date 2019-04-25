import React from 'react';
import IMAGE_PREVIEW from '../../../assets/images/upload.svg';
import { Icon } from 'semantic-ui-react';

interface Props {
    onImageChange: (files: File) => any
}

class ImagePreview extends React.Component<Props> {
    state = {image:'', imagePreviewUrl: IMAGE_PREVIEW};

    // image preview
    _handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        const { target: { files } } = e;
        const { onImageChange } = this.props;
        let reader = new FileReader();    
        reader.onloadend = () => {
          this.setState({
            image: files![0],
            imagePreviewUrl: reader.result
          });

        }

        onImageChange(files![0])
        reader.readAsDataURL(files![0])
    }
    

    render() {
       
        var divStyle = {
            backgroundImage: 'url(' + this.state.imagePreviewUrl + ')',
            backgroundSize: 'cover',
            height: '240px',
            width: '240px',
        }
    
        
        return (
            <div>
                <div className="image-upload">
                   <div className="image-preview">
                        <label htmlFor="imageUpload">
                            <div className="imageUpload__edit">
                                <Icon name="pencil" color="black" />
                            </div>
                            <div id="imagePreview" style={divStyle} />
                        </label>
                    </div>
                    <div className="image-edit ui center aligned">
                        <input type='file' id="imageUpload" onChange={this._handleImageChange}  accept=".png, .jpg, .jpeg" />
                        <label htmlFor="imageUpload">Upload Image</label>
                    </div>
                   
                </div>
            
            </div>
        )
    }
}

export default ImagePreview;