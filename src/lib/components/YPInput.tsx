import * as React from 'react';
import './YPInput.css';
import { YoutubeAPIService } from '../services/youtube-api.service';
import { Video } from '../interfaces/video';

interface State {
    formValue: string;
    formValid: boolean;
    processing: boolean;
}

interface Props {
    apiKey: string;
    onVideoAdd: Function;
}

export class YPInputComponent extends React.Component<Props, State> {

    state: State = {
        formValue: '',
        formValid: true,
        processing: false
    };
    private api: YoutubeAPIService = new YoutubeAPIService(this.props.apiKey);

    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Input change handler
     * @param e Input event
     */
    onChange(e: { target: { value: string; }}) {
        this.setState({
            formValue: e.target.value, 
            formValid: true
        });
    }

    /**
     * Form submit handler
     * @param e Form event
     */
    onSubmit(e: {preventDefault: Function; stopPropagation: Function }) {
        e.preventDefault();
        e.stopPropagation();

        let value: string = this.state.formValue;
        if (!value || value.length === 0) {
            return this.setState({ formValid: false });
        } else {
            let v = value.split('=');
            this.setState({processing: true});
            this.api.getVideoSnippet(v[v.length - 1])
            .then(
                (video: Video) => {
                    this.setState({processing: false, formValue: ''});
                    this.props.onVideoAdd(video);
                }, 
                err => {
                    this.setState({formValid: false});
                    this.setState({processing: false});
                }
            );
        }
    }

    render() {
        return (
            <div className="yp-input-wrapper col-12">
                <form className="form-inline" onSubmit={this.onSubmit}>
                    <div className="form-group col-9 w-100 px-0 pr-1 m-0">
                        <input 
                            type="text" 
                            className="form-control w-100"
                            placeholder="Enter Video URL or Video ID"
                            onChange={this.onChange}
                            value={this.state.formValue}
                            style={{borderColor: (this.state.formValid) ? 'rgba(0,0,0,0.125)' : '#dc3545'}}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary col-3" 
                        disabled={this.state.formValue.length === 0}
                    >
                        Add
                    </button>
                </form>
                <div className="row yp-invalid-feedback-row">
                    <div 
                        className="invalid-feedback col-12"
                        style={{display: (this.state.formValid) ? 'none' : 'block'}}
                    >
                    Wrong Video Id or URL
                    </div>
                    <div className="col-12 text-success" style={{display: (this.state.processing) ? 'block' : 'none'}}>
                        <span>Processing...</span>
                    </div>
                </div>
            </div>
        );
    }
}