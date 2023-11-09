import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import './CommentSidebar.scss';
import { PlantInfo } from '../../types/plantInfo';
import { PlantMemo } from '../../types/plantMemo';

import { IconContext } from 'react-icons';
import { IoIosClose } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { db } from '../../config/Firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
  orderBy,
  query,
  arrayRemove,
} from 'firebase/firestore';

type CommentSidebarProps = {
  isCommentSidebarOpen: boolean;
  toggleCommentSidebar: () => void;
  plant: PlantInfo;
  memos: PlantMemo[];
  setMemos: React.Dispatch<React.SetStateAction<PlantMemo[]>>;
  onCommentAdded: (newComment: PlantMemo) => void;
};

export const CommentSidebar: React.FC<CommentSidebarProps> = ({
  isCommentSidebarOpen,
  toggleCommentSidebar,
  plant,
  memos,
  setMemos,
  onCommentAdded,
}) => {
  const [inputText, setInputText] = useState('');
  // const [comments, setComments] = useState<Comment[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  console.log('Before handleSubmit', memos, inputText);

  const handleSubmit = async (e: React.MouseEvent) => {
    console.log('do handleSubmit');
    // e.preventDefault();
    if (inputText) {
      const timestampNow = Timestamp.now();

      const newMemo = {
        text: inputText,
        date: timestampNow,
      };

      const plantDocRef = doc(db, 'plants', plant.id);
      await updateDoc(plantDocRef, {
        memos: arrayUnion(newMemo),
      });

      setInputText('');
      onCommentAdded(newMemo); //Detailsへ新しいコメントを伝える
    }
  };
  console.log('After handleSubmit', memos, inputText);

  useEffect(() => {
    setMemos([]); // コメントのクリア(リンクで別の植物に遷移したときに別植物のコメントに切り替えるため)

    const fetchComments = async () => {
      const plantDocRef = doc(db, 'plants', plant.id);
      const plantData = await getDoc(plantDocRef);
      if (plantData.exists()) {
        const data = plantData.data();
        if (data && data.memos) {
          const sortedMemos = data.memos.sort(
            (a: any, b: any) => b.date.seconds - a.date.seconds
          );
          setMemos(sortedMemos);
        }
      }
    };

    fetchComments();
  }, [plant.id]);

  const handleDeleteComment = async (memoToDelete: PlantMemo) => {
    // Firebase空コメントを削除
    const plantDocRef = doc(db, 'plants', plant.id);
    await updateDoc(plantDocRef, {
      memos: arrayRemove(memoToDelete),
    });

    // ローカルからもコメントを削除
    setMemos(memos.filter((memo) => memo.date !== memoToDelete.date));
  };

  return ReactDOM.createPortal(
    <div
      className={`commentSidebarContainer ${
        isCommentSidebarOpen ? 'open' : ''
      }`}
    >
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
          {memos.map((memo, id) => (
            <div key={id} className="single-comment">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">
                  {memo.date.toDate().toLocaleString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <button
                  className="delete-memo-button"
                  onClick={() => handleDeleteComment(memo)}
                >
                  {' '}
                  <IconContext.Provider value={{ color: '#4b4a4a' }}>
                    <AiOutlineDelete className="close-icon" />
                  </IconContext.Provider>
                </button>
              </div>
              <div className="pt-1">{memo.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('comment-sidebar-root')!
  );
};
