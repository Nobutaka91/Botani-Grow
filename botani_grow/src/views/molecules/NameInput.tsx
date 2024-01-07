export {};

import React, { useState, memo } from 'react';

type NameInputProps = {
  initialName: string;
  onNameChange: (newName: string) => void;
};

const NameInput: React.FC<NameInputProps> = ({ initialName, onNameChange }) => {
  const [name, setName] = useState(initialName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // nameの変更を親コンポーネントであるEditModaalに伝える
    setName(event?.target.value);
    onNameChange(event?.target.value);
  };
  return (
    <div className="name-input flex">
      <input
        type="text"
        value={name}
        id="name"
        name="name"
        placeholder="フィカス・ウンベラータ"
        onChange={handleChange}
        // required
      />
    </div>
  );
};

export default React.memo(NameInput);

{
  /*
React.ChangeEvent<HTMLInputElement>

・入力フィールドの変更イベントに特化した型

React.ChangeEvent : Reactが提供する型で、HTML要素の内容が変更されたときに発生するイベントを表す

<HTMLInputElement> : React.ChangeEventに「このイベントはテキスト入力フィールド(<input>要素)から発生した」ということを示す

*/
}
