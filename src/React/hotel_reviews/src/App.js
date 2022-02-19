import './App.css';
import NewReview from './NewReview.js';
import Footer from './Footer.js';
import DataView from './DataView.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h1 className='Titel'>Hotel Reviews</h1>
      <div class="centered">
        <NewReview></NewReview>
        <div className="HorizontalSeparator"></div>
        <DataView></DataView>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
