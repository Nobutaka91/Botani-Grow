import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import './CommentSidebar.scss';
import { PlantInfo } from '../../types/plantInfo';
import { PlantMemo } from '../../types/plantMemo';

import { IconContext } from 'react-icons';
import { IoIosClose } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbChevronsRight } from 'react-icons/tb';
import { HiOutlineArrowSmDown } from 'react-icons/hi';
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
        <div className="plantIcon-container">
          {plant.iconUrl && (
            <img src={plant.iconUrl} alt={plant.name} className="plantIcon" />
          )}
          <div className="plantInfo">
            <h1 className="plantName">{plant.name}</h1>
            <h2 className="plantMemoCount ">{memos.length}コのメモ</h2>
          </div>
        </div>
        <span className="group">
          <button className="close-btn" onClick={toggleCommentSidebar}>
            <TbChevronsRight className="close-icon" />
          </button>
          <span className="whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-xs text-white absolute top-14 right-3 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
            Close sidebar
          </span>
        </span>
        <div className="comment-input">
          <label>
            <textarea
              className={isExpanded ? 'expanded' : ''}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
              name="commentText"
              maxLength={100}
              spellCheck="true"
              placeholder="write memo here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              // onFocus={(e) => e.currentTarget.parentElement?.focus()}
            ></textarea>
            <span className="addComment-btn relative group">
              <button className="" type="button" onMouseDown={handleSubmit}>
                <HiOutlineArrowSmDown className="text-lg" />
              </button>
              <span className="whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-xs text-white absolute -top-7 -left-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                Add
              </span>
            </span>
          </label>
        </div>
        <div className="past-comments">
          {memos.map((memo, id) => (
            <div key={id} className="single-comment hover:bg-gray-100/75">
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">
                  {memo.date.toDate().toLocaleString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
                <span className="relative group">
                  <button
                    className="delete-memo-button"
                    onClick={() => handleDeleteComment(memo)}
                  >
                    {' '}
                    <IconContext.Provider value={{ color: '#4b4a4a' }}>
                      <AiOutlineDelete className="close-icon" />
                    </IconContext.Provider>
                  </button>
                  <span className="whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-xs text-white absolute top-4 -left-5 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    Delete
                  </span>
                </span>
              </div>
              <div className="pt-1">{memo.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('comment-sidebar')! // nullを返す可能性があるのでうしろに!が必要
  );
};
