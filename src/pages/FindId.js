import { useEffect, useState } from "react";
import styled from "styled-components";
import KhApi from "../api/KhApi";
import mainLogo from "../images/logo.PNG"



const FindId = () => {

const Logo = styled.div`
margin-top: -100px;
margin-bottom: 80px;

`

const Box = styled.div`

background-color: cornsilk;
margin: 100px auto;
padding: 1rem;
height: 700px;
width: 400px;
display: flex;
text-align: center;
align-items: center;
box-sizing: border-box;

`;

const InputLogin = styled.input`
width: 300px;
height: 30px;
border-radius: 20px;
border: 0.1px solid white;
`;

const ButtonLogin = styled.button`
width: 150px;
height: 30px;
margin: 0 0 0 25px;
border-radius: 20px;
border: 0.1px solid cornflowerblue;
background-color: cornflowerblue;

`;
  
  const [findMember, setFindMember] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  

  const onChangeName = (e) => {
    setInputName(e.target.value);
  }

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
  }

  const onClickFind = ()=> {

    const memberData = async () => {
      setLoading(true);
      try {
        const response = await KhApi.findMember();
        setFindMember(response.data);
        const infoId = response.data.map(e => [e.id, e.pwd, e.name, e.email]);  // 아이디 비밀번호
        console.log(infoId);

        infoId.forEach(element => {
          console.log(element[2]);
          if(element[2] === inputName &&
                element[3] === inputEmail) {

            alert("ID : " + element[0])
          }
        });
      } catch(e) {
        console.log(e);
      }
      setLoading(false); 
    }
    memberData();
  
  }
  return (
  <Box>
    
    <div>
      <Logo >
        <img src={mainLogo} alt="logo"/>
      </Logo>
      <div>
        <InputLogin placeholder="이름" value={inputName} onChange={onChangeName} />
        <div>
          {/* span 태그의 class에 다른 props 넣어서 false일 때 메세지가 나오도록 수정해야함 */}
          {/* <span className={`message ${isId ? 'success' : 'error'}`}></span> */}
          {/* {inputId > 0 && {isId} ? null : <span>{idMessage}</span>}  */}
        </div>
        <br />
        <div>  
          <InputLogin placeholder="이메일" value={inputEmail} onChange={onChangeEmail} />
        </div>
        <br />
        <div>
          <ButtonLogin onClick={onClickFind}>Find</ButtonLogin>
        </div>
      </div>
    </div>
  </Box>
  );
}

  export default FindId;