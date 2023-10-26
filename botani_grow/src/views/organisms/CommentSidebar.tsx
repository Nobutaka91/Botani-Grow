import React, { useState, useEffect } from 'react';
import './CommentSidebar.scss';
import { PlantInfo } from '../../types/plantInfo';

import { IoIosClose } from 'react-icons/io';
import { db } from '../../config/Firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
  orderBy,
  query,
} from 'firebase/firestore';

type CommentSidebarProps = {
  isSidebarOpen: boolean;
  toggleCommentSidebar: () => void;
  plant: PlantInfo;
};

type Comment = {
  text: string;
  date: Timestamp;
};

export const CommentSidebar: React.FC<CommentSidebarProps> = ({
  isSidebarOpen,
  toggleCommentSidebar,
  plant,
}) => {
  const [inputText, setInputText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  console.log('Before handleSubmit', comments, inputText);

  const handleSubmit = async (e: React.MouseEvent) => {
    console.log('do handleSubmit');
    // e.preventDefault();
    if (inputText) {
      setComments((prevComments) => [
        ...prevComments,
        {
          text: inputText,
          date: Timestamp.now(),
        },
      ]);

      const plantDocRef = doc(db, 'plants', plant.id);
      const newMemo = {
        text: inputText,
        date: Timestamp.now(),
      };
      await updateDoc(plantDocRef, {
        memos: arrayUnion(newMemo),
      });

      setInputText('');
    }
  };
  console.log('After handleSubmit', comments, inputText);

  useEffect(() => {
    const fetchComments = async () => {
      const plantDocRef = doc(db, 'plants', plant.id);
      const plantData = await getDoc(plantDocRef);
      if (plantData.exists()) {
        const data = plantData.data();
        if (data && data.memos) {
          const sortedMemos = data.memos.sort(
            (a: any, b: any) => b.date.seconds - a.date.seconds
          );
          setComments(data.memos);
        }
      }
    };

    fetchComments();
  }, [plant.id]);

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
              <span className="text-sm text-slate-400">
                {comment.date.toDate().toLocaleString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <div className="pt-1">{comment.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
