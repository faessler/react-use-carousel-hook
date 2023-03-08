import { useCarousel } from 'react-use-carousel-hook';
import { items } from './mock';
import 'react-use-carousel-hook/dist/index.css';
import './App.css';

function App() {
  const { Carousel, Slides, Control, Pagination } = useCarousel();
  return (
    <div className="App">
      <h1>useCarousel() hook in action</h1>
      <Carousel>
        <Slides className="slides">
          {items.map((item) => (
            <div key={item.id} className="slide">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </Slides>
        <div className="controls">
          <Control direction="prev" className="control">P</Control>
          <Pagination className="pagination" buttonClassName="paginationButton" />
          <Control direction="next" className="control">N</Control>
        </div>
      </Carousel>
    </div>
  );
}

export default App;
