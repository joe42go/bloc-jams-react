import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import { Nav, Badge } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
            <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link href="/"><Link to='/'>Landing</Link></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="library"><Link to='/library'>Library</Link></Nav.Link>
                </Nav.Item>
            </Nav>
        </nav>
        <h1><Badge variant="success">Bloc Jams</Badge></h1>
      </header>
      <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
      </main>
    </div>
  );
}

export default App;
