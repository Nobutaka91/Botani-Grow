import React, { useState } from 'react';

import './SecondStepContent.scss';

export const SecondStepContent = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');

  const handleEmojiClick = (emoji: string) => {
    setIsActive(true);
    setSelectedEmoji(emoji);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  // 絵文字に応じて表示するテキストを定義するオブジェクト
  const emojiMessages = {
    soBad: '枯れる寸前',
    bad: 'わるい',
    normal: 'ふつう',
    good: '良い',
    soGood: 'とても良い',
  };

  return (
    <>
      {/* <div>step 2</div> */}
      <div className="container" onMouseLeave={handleMouseLeave}>
        <div className="wrapper">
          <div className="emoji">
            <button onClick={() => handleEmojiClick('🤕')} className="so bad">
              🤕
            </button>
            <button onClick={() => handleEmojiClick('😖')} className="bad">
              😖
            </button>
            <button onClick={() => handleEmojiClick('😐')} className="normal">
              😐
            </button>
            <button onClick={() => handleEmojiClick('😊')} className="good">
              😊
            </button>
            <button onClick={() => handleEmojiClick('😍')} className="so good">
              😍
            </button>
          </div>
          <p className="text">植物の状態</p>
        </div>

        <textarea
          className={`textarea ${isActive ? 'textarea--active' : ''}`}
          maxLength={100}
          placeholder="観察メモ"
        ></textarea>
      </div>
    </>
  );
};
