import * as React from 'react';
import { YPInputComponent } from './YPInput';
import { YPListComponent } from './YPList';
import { Video } from '../interfaces/video';
import './YPPlaylist.css';

interface Props {
    apiKey: string;
    onVideoAdd: Function;
    onVideoRemove: Function;
    videos: Array<Video>;
    active: string;
}

interface State {
    
}

export class YPPlaylistComponent extends React.Component<Props, State> {

    state: State = { };

    videos: Array<Video> = [];

    constructor(props: Props) {
        super(props);

        this.onVideoAdd = this.onVideoAdd.bind(this);
        this.onVideoRemove = this.onVideoRemove.bind(this);
    }

    /**
     * Video Add handler
     * @param video 
     */
    onVideoAdd(video: Video) {
        this.props.onVideoAdd(video);
    }

    /**
     * Video remove handler
     * @param id Youtube video ID
     */
    onVideoRemove(id: string) {
        this.props.onVideoRemove(id);
    }

    render() {
        return (
            <div className="yp-playlist-wrapper card h-100">
                <div className="card-body h-100 d-flex flex-column">
                    <div className="row">
                        <YPInputComponent apiKey={this.props.apiKey} onVideoAdd={this.onVideoAdd} />
                    </div>
                    <div className="yp-list-row">
                        <YPListComponent 
                            videos={this.props.videos} 
                            onVideoRemove={this.onVideoRemove}
                            active={this.props.active}
                        />
                    </div>
                </div>
            </div>
        );
    }
}