import React, {Component} from 'react';
import {Button} from 'material-ui';
import {PlayArrow, Pause, Stop} from 'material-ui-icons';
import {Slider} from 'office-ui-fabric-react/lib/Slider';
import {FileApi, FILE_API_URL} from '../api/fileApi';

export default class Player extends Component {

    constructor(props){
        super(props);
    }



    render() {
        return (
            <div>
                <audio  
                controls
                src= {`${FILE_API_URL}/2`}
                type="audio/mpeg"
                ></audio>
                <Slider
                    label='Basic example:'
                    min={1}
                    max={3}
                    step={1}
                    defaultValue={2}
                    showValue={true}/>

                <Button fab color="primary" aria-label="add">
                    <PlayArrow/>
                </Button>
                <Button fab color="primary" aria-label="add">
                    <Pause/>
                </Button>
                <Button fab color="primary" aria-label="add">
                    <Stop/>
                </Button>

            </div>
        );
    }
}
