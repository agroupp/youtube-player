import { Video } from '../interfaces/video';
import { Duration } from '../interfaces/duration';

export class YoutubeAPIService {

    private _url = `https://www.googleapis.com/youtube/v3/videos`;
    private _apiKey: string;
    
    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    /**
     * Returns promise that gets data from Youtube API about specified video
     * @param id Youtube video ID
     */
    getVideoSnippet(id: string): Promise<Video> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            let url = `${this._url}?part=snippet,contentDetails&id=${id}&key=${this._apiKey}`;
            xhr.responseType = 'json';
            xhr.open('GET', url);
            xhr.onload = () => {
                let res = xhr.response;
                if (res.pageInfo && res.pageInfo.totalResults > 0) {
                    let snippet: Video = {
                        id: res.items[0].id,
                        title: res.items[0].snippet.title,
                        duration: this._convertYoutubeTime(res.items[0].contentDetails.duration)
                    };
                    resolve(snippet);
                } else {
                    reject(res);
                }
            };
            xhr.onerror = (err) => reject(err);
            xhr.send();    
        });
    }

    /**
     * Converts Youtube duration time to Duration class object
     * @param ytTime Duration time in Youtube format PT00H00M00S
     */
    private _convertYoutubeTime(ytTime: string): Duration {
        const match: RegExpMatchArray | null = ytTime.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        let hours: number = 0, minutes: number = 0, seconds: number = 0;

        if (match) {
            hours = parseInt(match[1], 10) || 0;
            minutes = parseInt(match[2], 10) || 0;
            seconds = parseInt(match[3], 10) || 0;
        }
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
}