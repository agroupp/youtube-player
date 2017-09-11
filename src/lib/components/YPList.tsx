import * as React from 'react';
import './YPList.css';
import { Video } from '../interfaces/video';

interface Props {
    videos: Array<Video>;
    onVideoRemove: Function;
    active: string;
}
    
interface State {
    
}

export class YPListComponent extends React.Component<Props, State> {

    state: State = {};

    constructor(props: Props) {
        super(props);
    }

    remove(id: string) {
        this.props.onVideoRemove(id);
    }

    render() {
        let videos = this.props.videos.map((video: Video) => {
            let listClassName = (this.props.active === video.id) ? 
                'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action';
            return (
                <li className={listClassName} key={video.id}>
                    <div className="row align-items-center">
                        <div className="col-8 yp-list-title">{video.title}</div>
                        <div className="col-3">
                            <span className="badge badge-pill badge-secondary">
                                {video.duration.hours}:{video.duration.minutes}:{video.duration.seconds}
                            </span>
                        </div>
                        <div className="yp-list-remove-button" onClick={() => this.remove(video.id)}>
                            &times;
                        </div>
                    </div>
                </li>
            );
        });
        
        return (
            <div className="yp-list-wrapper">
                <ul className="list-group">
                    {videos}
                </ul>
            </div>
        );
    }
}