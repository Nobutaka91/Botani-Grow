import React, { useState } from 'react';

import './SecondStepContent.scss';
import { BsEmojiTear } from 'react-icons/bs';
import { BsEmojiNeutral } from 'react-icons/bs';
import { BsEmojiKiss } from 'react-icons/bs';

export const SecondStepContent = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');

  const handleEmojiClick = (emoji: string) => {
    if (selectedEmoji !== emoji) {
      setSelectedEmoji(emoji);
    }

    setIsActive(true);
    console.log(selectedEmoji);
  };

  const getButtonClass = (emoji: string) => {
    return `button ${selectedEmoji === emoji ? 'button--active' : ''}`;
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <p className="text">今の状態は?</p>
          <div className="emoji">
            <button
              onClick={() => handleEmojiClick('bad')}
              className={getButtonClass('bad')}
            >
              <BsEmojiTear /> <span>悪い ...</span>
            </button>
            <button
              onClick={() => handleEmojiClick('normal')}
              className={getButtonClass('normal')}
            >
              <BsEmojiNeutral />
              <span>ふつう</span>
            </button>
            <button
              onClick={() => handleEmojiClick('good')}
              className={getButtonClass('good')}
            >
              <BsEmojiKiss /> <span>良い !</span>
            </button>
          </div>
        </div>

        <textarea
          className={`textarea ${isActive ? 'textarea--active' : ''}`}
          maxLength={100}
          placeholder="コメント"
        ></textarea>
      </div>
    </>
  );
};
