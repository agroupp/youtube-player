import { YoutubeAPIService } from './youtube-api.service';
import { YOUTUBE_API_KEY } from '../../api-key';

const api = new YoutubeAPIService(YOUTUBE_API_KEY);

it('should get data about video', () => {
    return expect(api.getVideoSnippet('wPT3K3w6JtU'))
    .resolves.toEqual({
        id: 'wPT3K3w6JtU',
        title: 'Angular Material Tutorial',
        duration: {hours: 0, minutes: 36, seconds: 19}
    });
});