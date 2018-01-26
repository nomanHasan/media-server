import React, {Component} from 'react';
import {Button} from 'material-ui';
import {PlayArrow, Pause, Stop} from 'material-ui-icons';
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
        }

    }

    play = () => {
        this.setState({play: true});
        this
            .audio
            .play();
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
        console.log(value);
        this.audio.currentTime = value;
    }

    changeVolume = value => {
        this.audio.volume = value/100;
    }

    render() {
        return (
            <div>
                <audio
                    controls
                    src={`${FILE_API_URL}/${this.props.url}`}
                    type="audio/mpeg"
                    ref=
                    {(audio) => {this.audio = audio} }></audio>
                <Slider
                    label='Seeker'
                    min={this.state.min}
                    max={this.state.max}
                    step={this.state.step}
                    defaultValue={2}
                    showValue={true}
                    onChange={this.seek}/>
                <Slider
                style={{height: '100px'}}
                label='Volume'
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={50}
                    showValue={true}
                    onChange={this.changeVolume}
                    vertical={true}/>
                <Button fab color="primary" onClick={this.play} aria-label="add">
                    <PlayArrow/>
                </Button>
                <Button fab color="primary" onClick={this.pause} aria-label="add">
                    <Pause/>
                </Button>
                <Button fab color="primary" onClick={this.stop} aria-label="add">
                    <Stop/>
                </Button>

            </div>
        );
    }
}
