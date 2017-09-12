import * as React from 'react';

interface State {
    videoId: string;
}

interface Props {
    videoId: string;
    onPlayerFinished: Function;
}

interface YoutubePlayer {
    videoId: string;
    playVideo: Function;
    stopVideo: Function;
    loadVideoById: Function;
    getVideoUrl: Function;
}

export class YPPlayerComponent extends React.Component<Props, State> {
    player: YoutubePlayer;

    constructor(props: Props) {
        super(props);
        this.state = {videoId: ''};
        this.loadIframeApi().then(player => this.player = player);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    /**
     * Loads Youtube API, binds player to div and returns promise
     * that resolves to instance of Youtube player
     */
    loadIframeApi(): Promise<YoutubePlayer> {
        return new Promise((resolve, reject) => {
            const head: HTMLHeadElement = document.head;
            const apiScript: HTMLScriptElement = document.createElement('script');
            apiScript.src = `https://www.youtube.com/iframe_api`;
            apiScript.onload = () => {
                // eslint-disable-next-line
                window['onYouTubeIframeAPIReady'] = () => {
                    // eslint-disable-next-line
                    const YT = window['YT'];
                    const onPlayerReady = () => resolve(player);
                    const player = new YT.Player('player', {
                        events: {
                            onReady: onPlayerReady,
                            onStateChange: this.onPlayerStateChange
                        }
                    });
                };
            };
            apiScript.onerror = (err) => reject(err);
            head.appendChild(apiScript);    
        });
    }

    /**
     * Player finished handler
     * @param event 
     */
    onPlayerStateChange(event: {data: number}) {
        if (event.data === 0) {
            this.props.onPlayerFinished();
        }
    }

    render() {
        if (this.player) {
            if (this.props.videoId.length > 0) {
                let id = this.player.getVideoUrl().split('=')[1];
                if (!id || id !== this.props.videoId) {
                    this.player.loadVideoById(this.props.videoId);
                    this.player.playVideo();
                }
            } else {
                this.player.stopVideo();
            }
        }
        return (
            <div className="card">
                <div className="card-body h-100 d-flex flex-column">
                    <div className="embed-responsive embed-responsive-16by9" id="player" />
                </div>
            </div>
        );
    }
}