import React, {Component} from 'react';
import {Button} from 'material-ui';
import {PlayArrow, Pause, Stop, SkipPrevious, SkipNext} from 'material-ui-icons';
import {Slider} from 'office-ui-fabric-react/lib/Slider';
import {FileApi, FILE_API_URL} from '../api/fileApi';

import './player.css';

export default class Player extends Component {

    constructor(props) {
        super(props);
        this.state = {
            play: false,
            min: 0,
            max: 0,
            step: 1
        }
    }

    componentDidMount() {
        this.audio.onloadedmetadata = event => {
            this.setState({max: this.audio.duration});
            this.play();
        }

        this.audio.ontimeupdate = event => {
            this.setState({
                currentTime: this.audio.currentTime
            });
        }
    }

    playpause = () => {
        if(this.state.play) {
            this.pause()
        }else {
            this.play();
        }
    }

    play = () => {
        this.setState({play: true});
        this.audio.play();
    }

    pause = () => {
        this.setState({play: false});
        this
            .audio
            .pause();
    }

    stop = () => {
        this.setState({play: false});
        this
            .audio
            .pause();
    }

    seek = value => {
        this.audio.currentTime = value;
    }

    changeVolume = value => {
        this.audio.volume = value/100;
    }

    render() {
        return (
            <div>
                <audio
                    src={`${FILE_API_URL}/${this.props.url}`}
                    type="audio/mpeg"
                    ref=
                    {(audio) => {this.audio = audio} }></audio>
                <Slider
                    min={this.state.min}
                    max={this.state.max}
                    step={this.state.step}
                    value={this.state.currentTime}
                    defaultValue={0}
                    showValue={true}
                    onChange={this.seek}/>
                <Slider
                style={{height: '100px'}}
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={50}
                    showValue={true}
                    onChange={this.changeVolume}
                    vertical={true}/>
                <Button fab color="primary" onClick={this.playpause} aria-label="add">
                {this.state.play ? (
                    <Pause/>
                ): (
                    <PlayArrow/>
                )}
                </Button>
                <Button fab color="primary" onClick={this.play} aria-label="add">
                    <SkipPrevious/>
                </Button>
                <Button fab color="primary" onClick={this.play} aria-label="add">
                    <SkipNext/>
                </Button>
                <Button fab color="primary" onClick={this.stop} aria-label="add">
                    <Stop/>
                </Button>

            </div>
        );
    }
}
