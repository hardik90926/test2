import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ThumbnailView } from '../../Table/Cell';
import { errorToast } from "../../../utils/notifications";

export const forceDownloadFile = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";

  xhr.onload = function () {
    const urlCreator = window.URL || window.webkitURL;
    const fileUrl = urlCreator.createObjectURL(this.response);
    const tag = document.createElement("a");
    tag.href = fileUrl;
    tag.download = url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };

  xhr.onerror = () => {
    errorToast("File not available!");
  };

  xhr.ontimeout = () => {
    errorToast("Timed out");
  };

  xhr.send();
};

export const IFrameComponent = ({ url }) => <embed src={`${url}#toolbar=0&navpanes=0&scrollbar=0`} title={url} loading="lazy" />;

export const ImageComponent = ({url}) => <img src={url} alt={url} crossOrigin="anonymous" referrerPolicy="no-referrer" loading="lazy" />;

export const DownloadIcon = ({ url }) => <a className="" href="" onClick={() => { forceDownloadFile(url); }} ><i className="fa fa-download" aria-hidden="true"> </i></a>;

export const ExtensionBasedView = ({ url }) => {
  const extension = url.match(/[^.]+$/)[0];
  switch (extension) {
    case "pdf":
      return <IFrameComponent url={url} />;

    case "jpg":
    case "png":
      return <ImageComponent url={url} />;

    default:
      return <ThumbnailView css="SliderIconBox" IconCss="SliderIcon" url={url} />;
  }
}

export const CorouselComponent = ({ data }) => {
  const settings= {
    autoPlay: false,
    dynamicHeight: false,
    stopOnHover: true,
    swipeable: true,
    useKeyboardArrows: true,
    infiniteLoop: true,
    showThumbs: false,
    autoFocus: false,
    showStatus:false,
  };
    return(<Carousel {...settings}  >

      {data?.map((record, i) => (
        <div key={i} className="sliderButton">
          <div className="w-full">
            <ExtensionBasedView url={record} />
            <div className="sliderBoxIcon">
              <DownloadIcon url={record} />
              <p className="textColor"> {record.substring(record.lastIndexOf('/')+1)}</p>
            </div>
          </div>
      </div>))}
    </Carousel>
)}

export const FileViewer = ({data}) => {
  return (
    <div className="sliderButton">
      <div className="w-full">
      {typeof data === "object" &&
        <CorouselComponent data={data} />}
      {typeof data === "string" &&
       <>
          <ExtensionBasedView url={data} />
           <div className="sliderBoxIcon">
            <DownloadIcon url={data} />
            <p className="textColor"> {data.substring(data.lastIndexOf('/')+1)}</p>
          </div>
      </>
      }
      </div>
    </div>
  )
}
