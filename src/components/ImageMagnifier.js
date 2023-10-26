import ReactImageMagnify from 'react-image-magnify';
import React from 'react'



function ImageMagnifier({ props }) {

    return (
       
            <ReactImageMagnify  {...{
                smallImage: {
                    alt: '....',
                    isFluidWidth: true,
                    src: props,
                  
                },
                largeImage: {
                    src: props,
                    width: 950,
                    height: 1200
                },
                imageClassName: 'img-fluid rounded',
                imageStyle:{width: '25rem',height:'20rem',boxShadow: "3px 3px 2px 4px #60524a"},
                className:'rounded d-flex flex-wrap',
                enlargedImageContainerStyle:{
                    zIndex:'1'
                },
                
            }} />
     

    )
}

export default ImageMagnifier