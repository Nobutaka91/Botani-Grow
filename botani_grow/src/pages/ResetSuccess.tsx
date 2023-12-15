import '../App.scss';
import './ResetSuccess.scss';

import logo from '../LoginAssets/leaf-logo.png';
import { AiOutlineSwapLeft } from 'react-icons/ai';

const ResetSuccess = () => {
  return (
    <>
      <div className="resetPassword-page flex">
        <div className="container flex">
          <div className="formDiv">
            <div className="headerDiv ">
              <img src={logo} alt="Logo" />
              <h4 className="pt-4">
                パスワードリセットに必要なメールを送信しました
              </h4>
            </div>
            <span className="return-loginPage-btn flex">
              <AiOutlineSwapLeft className="icon" />
              <a href="/" className="back">
                Login画面へ
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetSuccess;
