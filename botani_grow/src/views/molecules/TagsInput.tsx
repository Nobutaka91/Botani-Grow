import React, { useState, KeyboardEvent } from 'react';

import './TagsInput.scss';

import { PlantInfo } from '../../types/plantInfo';

type TagProps = {
  tags: string[] | null;
  setTags: React.Dispatch<React.SetStateAction<string[] | null>>;
};

export const TagsInput: React.FC<TagProps> = ({ tags, setTags }) => {
  // const [tags, setTags] = useState<string[]>([]);
  const [exceedMaxTags, setExceedMaxTags] = useState(false);
  const max_tags = 10;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const value = e.currentTarget.value;
    if (!value.trim()) return;

    if ((tags || []).includes(value)) {
      // 重複タグチェック
      e.currentTarget.value = '';
      return;
    }

    // タグの最大数チェック
    if ((tags || []).length >= max_tags) {
      setExceedMaxTags(true);
      return;
    } else {
      setExceedMaxTags(false);
    }

    setTags([...(tags || []), value]);
    e.currentTarget.value = '';
  };

  const removeTag = (index: number) => {
    const newTags = (tags || []).filter((el, i) => i !== index);
    setTags(newTags);

    if (newTags.length < max_tags) {
      setExceedMaxTags(false);
    }
  };

  return (
    <>
      <div className="tags-input-container">
        {(tags || []).map((tag, index) => (
          <div className="tag-item text-xs" key={index}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => removeTag(index)}>
              &times;
            </span>
          </div>
        ))}

        <input
          onKeyDown={handleKeyDown}
          type="text"
          className="tags-input"
          placeholder="Type here..."
        />
        <div className="tags-counter flex">
          {exceedMaxTags && (
            <div className="error-message">*Exceeded maximum tags</div>
          )}
          <div className="countTag">{(tags || []).length} / 10</div>
        </div>
      </div>
    </>
  );
};
