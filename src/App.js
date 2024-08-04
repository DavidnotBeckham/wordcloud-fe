import React, { useState } from 'react';
import Wordcloud from 'react-d3-cloud';
import axios from 'axios';
import { Tooltip as ReactTooltip } from 'react-tooltip'; // 올바른 import 문

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
        console.log('Data received:', res.data); // 데이터 수신 확인
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

  const fontSizeMapper = (word) => Math.log2(word.value) * 5;

  const rotate = () => 0; // 단어를 수평으로 유지

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column', // 세로 방향으로 정렬
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F8FF',
      }}
    >
      <button onClick={getWorldCloud} style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Generate Word Cloud
      </button>
      <div>
        {words.length > 0 ? (
          <Wordcloud
            data={words}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}
            fill={(word, index) => myColors[index % myColors.length]}
            onWordClick={(word) => onWordClick(word)}
            style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}
            width={600}
            height={400}
            padding={2}
          />
        ) : (
          <p>Click the button to generate the word cloud</p>
        )}
        <ReactTooltip
          anchorSelect=".wordcloud-word" // 툴팁을 적용할 요소 선택자
          place="top"
          effect="solid"
          content="Click on words to explore more!"
        />
      </div>
    </div>
  );
};

export default App;
