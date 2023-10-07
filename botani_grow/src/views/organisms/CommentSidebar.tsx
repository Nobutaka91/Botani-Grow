import React, { useState } from 'react';
import './CommentSidebar.scss';

import { IoIosClose } from 'react-icons/io';

type CommentSidebarProps = {
  isSidebarOpen: boolean;
  toggleCommentSidebar: () => void;
};

export const CommentSidebar: React.FC<CommentSidebarProps> = ({
  isSidebarOpen,
  toggleCommentSidebar,
}) => {
  const [inputText, setInputText] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  console.log('Before handleSubmit', comments, inputText);

  const handleSubmit = (e: React.MouseEvent) => {
    console.log('do handleSubmit');
    // e.preventDefault();
    if (inputText) {
      setComments((prevComments) => [...prevComments, inputText]);
      setInputText('');
    }
  };
  console.log('After handleSubmit', comments, inputText);

  return (
    <div className={`commentSidebarContainer ${isSidebarOpen ? 'open' : ''}`}>
      <div className="comment-sidebar">
        <button className="close-btn" onClick={toggleCommentSidebar}>
          <IoIosClose className="close-icon" />
        </button>
        <div className="comment-input">
          <label>
            Add Memo
            <textarea
              className={isExpanded ? 'expanded' : ''}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
              name="commentText"
              maxLength={100}
              spellCheck="true"
              placeholder="write comment here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              // onFocus={(e) => e.currentTarget.parentElement?.focus()}
            ></textarea>
            <button
              className="addComment-btn"
              type="button"
              onMouseDown={handleSubmit}
            >
              Add
            </button>
          </label>
        </div>
        <div className="past-comments">
          {comments.map((comment, id) => (
            <div key={id} className="single-comment">
              {comment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
