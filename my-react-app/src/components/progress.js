import React from 'react';

function ProgressLine({ progress }) {
  return (
    <div  className="progress-line-container">
      <div className="progress-line" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressLine;
