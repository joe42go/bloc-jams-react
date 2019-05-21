import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import { Card, CardDeck } from 'react-bootstrap';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }

    render () {
        return (
            <section className="library">
                {
                    this.state.albums.map( (album, index) =>
                        <Link to={`/album/${album.slug}`} key={index} >
                            <p></p>
                            <center><Card bg="secondary" text="white" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={album.albumCover} alt={album.title} />
                                    <Card.Body>
                                    <Card.Title>Title: {album.title}</Card.Title>
                                    <Card.Text>
                                        <div>Artist: {album.artist}</div>
                                        <div>Number of Songs: {album.songs.length}</div>
                                    </Card.Text>
                                    </Card.Body>
                            </Card></center>
                            <p></p>
                        </Link>
                    )
                }
            </section>
        );
    }
}


export default Library;
