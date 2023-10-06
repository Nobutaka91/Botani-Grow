import React from 'react';
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
  return (
    <div className="commentSidebarContainer">
      <div className="comment-sidebar">
        <button className="close-btn" onClick={toggleCommentSidebar}>
          <IoIosClose className="close-icon" />
        </button>
        <div className="comment-input">
          <textarea
            placeholder="write comment here..."
            onFocus={(e) => e.currentTarget.parentElement?.focus()}
          ></textarea>
          <button className="submit-btn">Submit</button>
        </div>
        <div className="past-comments">aaaaaaaaa</div>
      </div>
    </div>
  );
};
