import React , { Component } from 'react';



class PlayerBar extends Component {

    render () {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <button id="previous" onClick={this.props.handlePrevClick} >
                        <span className="ion-skip-backward"><ion-icon name="skip-backward"></ion-icon></span>
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick} >
                        <ion-icon name="play"></ion-icon>
                        <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
                    </button>
                    <button id="next" onClick={this.props.handleNextClick} >
                        <span className="ion-skip-forward"><ion-icon name="skip-forward"></ion-icon></span>
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">{this.props.currentTime_format}</div>
                    <input
                        type="range"
                        className="seek-bar"
                        value={(this.props.currentTime / this.props.duration) || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time">{this.props.duration_format}</div>
                </section>
                <section id="volume-control">
                    <div className="icon ion-volume-low"></div>
                    <input
                        type="range"
                        className="seek-bar"
                        value={(this.props.currentVolume) || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleVolumeChange}
                    />
                    <div className="icon ion-volume-high">{this.props.currentVolume}</div>
                </section>
            </section>
        );
    }
}

export default PlayerBar;
