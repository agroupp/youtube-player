import * as React from 'react';

import { YPPlaylistComponent } from './YPPlaylist';
import { YPPlayerComponent } from './YPPlayer';
import { Video } from '../interfaces/video';

interface State {
    active: string;
    videos: Array<Video>;
}

interface Props {
    apiKey: string;
}

export class YPMainComponent extends React.Component<Props, State> {
    state: State = { active: '', videos: []};

    constructor(props: Props) {
        super(props);
        this.onVideoAdd = this.onVideoAdd.bind(this);
        this.onPlayerFinished = this.onPlayerFinished.bind(this);
        this.onVideoRemove = this.onVideoRemove.bind(this);
    }

    /**
     * Video Add handler
     * @param video 
     */
    onVideoAdd(video: Video) {
        if (this.state.videos.filter(v => v.id === video.id).length === 0) {
            let videos: Array<Video> = this.state.videos;
            videos.push(video);
            this.setState({videos: videos});
            if (this.state.videos.length === 1) {
                this.setState({ active: video.id });
            }
        }
    }

    /**
     * Player finished handler
     */
    onPlayerFinished() {
        let videos: Array<Video> = this.state.videos.filter(v => v.id !== this.state.active);
        if (videos.length > 0) {
            this.setState({videos: videos, active: videos[0].id});
        } else {
            this.setState({videos: [], active: ''});
        }
    }

    /**
     * Video remove from list handler
     * @param id Youtube video ID
     */
    onVideoRemove(id: string) {
        if (this.state.active === id) {
            this.onPlayerFinished();
        } else {
            let videos: Array<Video> = this.state.videos.filter(v => v.id !== id);
            this.setState({videos: videos});
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <YPPlaylistComponent
                            apiKey={this.props.apiKey}
                            onVideoAdd={this.onVideoAdd}
                            onVideoRemove={this.onVideoRemove}
                            videos={this.state.videos}
                            active={this.state.active}
                        />
                    </div>
                    <div className="col-12 col-lg-7">
                        <YPPlayerComponent 
                            videoId={this.state.active}
                            onPlayerFinished={this.onPlayerFinished}
                        />
                    </div>
                </div>
            </div>
        );
    }
}