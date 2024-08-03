import React, { useEffect, useState } from 'react';
import Wordcloud from 'react-d3-cloud';
import axios from 'axios';

const App = () => {
  const [words, setWords] = useState([]);
  const [myColors] = useState(['red', '#E1B4B4', '#DB6E6E', '#A85454']);

  const onWordClick = (word) => {
    alert(`You clicked on: ${word.text}`);
  };

  const getWorldCloud = () => {
    const SERVER_URL = 'http://127.0.0.1:8000'; // Update with your backend URL
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

  return (
    <div>
      {words.length > 0 && (
        <Wordcloud
          data={words}
          fontSizeMapper={(word) => Math.log2(word.value) * 5}
          rotate={(word) => (word.value % 360)}
          onWordClick={(word) => onWordClick(word)}
        />
      )}
    </div>
  );
};

export default App;
