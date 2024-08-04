import React, { useEffect, useState } from 'react';
import Wordcloud from 'react-d3-cloud';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';

const App = () => {
  const [words, setWords] = useState([]);
  const [myColors] = useState(['#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FF8C00']);

  const onWordClick = (word) => {
    alert(`You clicked on: ${word.text}`);
  };

  const getWorldCloud = () => {
    const SERVER_URL = 'http://127.0.0.1:8000';
    const category = 1;
    const url = `${SERVER_URL}/wordcloud/${category}/`;

    axios
      .get(url)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setWords(res.data);
        } else {
          console.error('Unexpected data format:', res.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching word cloud data:', err);
      });
  };

  useEffect(() => {
    getWorldCloud();
  }, []);

  const fontSizeMapper = (word) => Math.log2(word.value) * 5;

  // Rotate function to keep most words horizontally aligned
  const rotate = () => 0; // 0 degrees, keeps words horizontally

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F8FF',
      }}
    >
      <div data-tip="" data-for="wordcloud">
        {words.length > 0 && (
          <Wordcloud
            data={words}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}
            fill={(word, index) => myColors[index % myColors.length]}
            onWordClick={(word) => onWordClick(word)}
            style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}
            width={600} // 컴팩트한 배치를 위해
            height={400} // 컴팩트한 배치를 위해
            padding={2} // 단어를 타이트하게 묶기 위해
          />
        )}
        <ReactTooltip id="wordcloud" place="top" type="dark" effect="solid">
          <span>단어를 클릭해보세요!</span>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default App;
