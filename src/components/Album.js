import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {

    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug == this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration:album.songs[0].duration,
            isPlaying: false,
            hoveredIdx: null,
            currentVolume: null

        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            },
            volumechange: e => {
                this.setState({ currentVolume: this.audioElement.volume });
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }

    play () {
        this.audioElement.play();
        this.setState({ isPlaying: true});
    }

    pause () {
        this.audioElement.pause();
        this.setState({ isPlaying: false});
    }

    setSong (song) {
        this.audioElement.src = song.audioSrc;
        this.setState({currentSong: song});
    }

    handleSongClick (song) {
        const isSameSong = this.state.currentSong == song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song);}
            this.play();
        }
    }

    handlePrevClick () {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex]
        this.setSong(newSong);
        this.play();
    }

    handleNextClick () {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex]
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.currentVolume = newVolume;
        this.setState({ currentVolume: newVolume });
    }

    _onMouseEnter (index) {
        this.setState({hoveredIdx: index});
    }

    _onMouseLeave (index) {
        this.setState({hoveredIdx: null});
    }

    formatTime (time) {
        const minutes = Math.floor(time/60);
        let seconds = time - minutes * 60;

        if (seconds < 10) {seconds = "0"+ Math.floor(seconds)}
        else {seconds = Math.floor(seconds)};

        return minutes+':'+ seconds;
    }

    renderIcon (song, index) {
        const isSameIdx = this.state.hoveredIdx == index;
        const isSameSong = this.state.currentSong == song;
        if (this.state.isPlaying && isSameSong) {
            return <ion-icon name="pause"></ion-icon>;
        } else if (!this.state.isPlaying && isSameIdx) {
            return <ion-icon name="arrow-dropright-circle"></ion-icon>;
        } else {
            return index + 1;
        }
    }

    render () {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {
                            this.state.album.songs.map( (song, index) =>
                                <tr className="song" key={index}>
                                    <td>
                                        <span className="ion-play" onClick={() => this.handleSongClick(song, index)} onMouseEnter={() => this._onMouseEnter(index)} onMouseLeave={() => this._onMouseLeave(index)}>{this.renderIcon(song, index)}</span>
                                    </td>
                                    <td>{song.title}</td>
                                    <td>{this.formatTime(song.duration)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <PlayerBar
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentTime_format={this.formatTime(this.audioElement.currentTime)}
                    currentTime={this.audioElement.currentTime}
                    duration_format={this.formatTime(this.audioElement.duration)}
                    duration={this.audioElement.duration}
                    currentVolume={this.audioElement.currentVolume}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    formatTime={() => this.formatTime()}
                />
            </section>
        );
    }
}

export default Album;
